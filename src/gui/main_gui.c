#include "main_gui.h"
#include "slot_switcher.h"
#include "character_page.h"
#include "../structs/save_slot.h"
#include "../structs/character.h"
#include "../memcard/memcard.h"

void app_activate(GtkApplication *app, gpointer data)
{
    GtkBuilder *builder;
    GtkWidget *app_window;

    builder = gtk_builder_new_from_file("editor.ui");
        
    app_window = GTK_WIDGET(gtk_builder_get_object(builder, "app_window"));
    gtk_window_set_application(GTK_WINDOW(app_window), GTK_APPLICATION(app));
    
    g_object_unref(builder);
    
    gtk_widget_show(app_window);
}

void app_open(GtkApplication *app, GFile **files, gint n_files, gchar *hint, gpointer data)
{
    GtkBuilder *builder;
    GtkWidget *app_window;

    static struct SaveSlot *save_slots[3];
    static struct SlotPage *slot_page;
    static struct SlotPageID **slot_page_ids;
    static struct CharacterFields *character_fields;
    static struct CharacterDataFields *character_data_fields;

    slot_page = g_new(struct SlotPage, 1);
    slot_page_ids = g_new(struct SlotPageID *, INPUT_COUNT);

    for (int i = 0; i < INPUT_COUNT; i++)
    {
        slot_page_ids[i] = g_new(struct SlotPageID, 1);
    }

    character_fields = g_new(struct CharacterFields, 1);
    character_data_fields = g_new(struct CharacterDataFields, 1);

    builder = gtk_builder_new_from_file("layout.ui");
        
    app_window = GTK_WIDGET(gtk_builder_get_object(builder, "app_window"));
    gtk_window_set_application(GTK_WINDOW(app_window), GTK_APPLICATION(app));

    slot_page->prev_button = GTK_WIDGET(gtk_builder_get_object(builder, "prev_button"));
    slot_page->next_button = GTK_WIDGET(gtk_builder_get_object(builder, "next_button"));

    for (int i = 0; i < INPUT_COUNT; i++)
    {
        slot_page_ids[i]->slot_page = slot_page;
    }

    assign_character_fields(character_fields, builder);

    g_object_unref(builder);
    
    unsigned char *memory_card;
    int address;
    int save_slot_count = 0;
    gsize length;

    if (g_file_load_contents(files[0], NULL, (char **) &memory_card, &length, NULL, NULL))
    {
        if (validate_memory_card(memory_card))
        {
            while ((address = browse_toc(memory_card)) != -1)
            {
                save_slots[save_slot_count] = g_new(struct SaveSlot, 1);
                save_slots[save_slot_count]->character_data = g_new(struct CharacterData*, 8);
                save_slots[save_slot_count]->address = address;

                for (int i = 0; i < 8; i++)
                {
                    save_slots[save_slot_count]->character_data[i] = get_character_data(memory_card, i, address);
                }

                save_slot_count++;
            }

            slot_page->save_slot_count = save_slot_count;
            slot_page->position = 0;
            slot_page->save_slots = save_slots;
            character_data_fields->character_fields = character_fields;
            character_data_fields->character_data = save_slots[0]->character_data;
            character_data_fields->character_id = 0;
            slot_page->character_data_fields = character_data_fields;
            load_character_names(slot_page_ids);
            enable_character_fields(character_fields);
            load_character_fields(slot_page_ids, character_data_fields, 0);

            if (save_slot_count > 1)
            {
                g_object_set(slot_page->next_button, "sensitive", TRUE, NULL);
            }
        }

        g_free(memory_card);
    }

    static struct FreeStruct *free_struct;
    free_struct = g_new(struct FreeStruct, 1);
    free_struct->save_slot_count = save_slot_count;
    free_struct->slot_page_ids = slot_page_ids;

    g_signal_connect(slot_page->prev_button, "clicked", G_CALLBACK(prev_save_slot), slot_page_ids);
    g_signal_connect(slot_page->next_button, "clicked", G_CALLBACK(next_save_slot), slot_page_ids);    
    g_signal_connect(app, "shutdown", G_CALLBACK(app_shutdown), free_struct);

    gtk_widget_show(app_window);
}

void app_shutdown(GtkApplication *app, gpointer data)
{
    struct FreeStruct *free_struct = data;

    for (int i = 0; i < free_struct->save_slot_count; i++)
    {
        for (int j = 0; j < 8; j++)
        {
            g_free(free_struct->slot_page_ids[0]->slot_page->save_slots[i]->character_data[j]);
        }

        g_free(free_struct->slot_page_ids[0]->slot_page->save_slots[i]->character_data);
        g_free(free_struct->slot_page_ids[0]->slot_page->save_slots[i]);
    }

    g_free(free_struct->slot_page_ids[0]->slot_page->character_data_fields->character_fields);
    g_free(free_struct->slot_page_ids[0]->slot_page->character_data_fields);

    for (int i = 0; i < INPUT_COUNT; i++)
    {
        g_free(free_struct->slot_page_ids[i]);
    }

    g_free(free_struct->slot_page_ids);
    g_free(free_struct);
}
