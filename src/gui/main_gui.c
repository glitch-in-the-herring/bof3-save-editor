#include <stdio.h>

#include "main_gui.h"
#include "slot_switcher.h"
#include "character_page.h"
#include "inventory_page.h"
#include "dialog_window.h"
#include "file_opener.h"

#include "../structs/save_slot.h"
#include "../structs/character.h"
#include "../structs/inventory.h"
#include "../memcard/memcard.h"
#include "../memcard/memcard_writer.h"

void app_activate(GtkApplication *app, gpointer data)
{
    GtkBuilder *builder;
    GtkWidget *app_window;
    GtkWidget *status_bar;
    GtkWidget *inventory_grid;

    static struct SaveSlot *save_slots[3];
    static struct SlotPage *slot_page;
    static struct SlotPageID **slot_page_ids;
    static struct CharacterFields *character_fields;
    static struct CharacterDataFields *character_data_fields;
    static struct InventoryFields *inventory_fields;
    static struct InventoryDataFields *inventory_data_fields;
    static struct CardStream *card_stream;
    static struct Loadable *loadable;

    slot_page = g_new(struct SlotPage, 1);
    slot_page_ids = g_new(struct SlotPageID *, INPUT_ID);
    card_stream = g_new(struct CardStream, 1);
    loadable = g_new(struct Loadable, 1);
    character_fields = g_new(struct CharacterFields, 1);
    character_data_fields = g_new(struct CharacterDataFields, 1);
    inventory_fields = g_new(struct InventoryFields, 1);
    inventory_data_fields = g_new(struct InventoryDataFields, 1);

    for (int i = 0; i < INPUT_ID; i++)
    {
        slot_page_ids[i] = g_new(struct SlotPageID, 1);
        slot_page_ids[i]->entry_id = i;
        slot_page_ids[i]->slot_page = slot_page;
    }

    builder = gtk_builder_new_from_file("layout.ui");
        
    app_window = GTK_WIDGET(gtk_builder_get_object(builder, "app_window"));
    gtk_window_set_application(GTK_WINDOW(app_window), GTK_APPLICATION(app));

    inventory_grid = GTK_WIDGET(gtk_builder_get_object(builder, "inventory_grid"));
    status_bar = GTK_WIDGET(gtk_builder_get_object(builder, "status_bar"));

    slot_page->open_button = GTK_WIDGET(gtk_builder_get_object(builder, "open_button"));
    slot_page->save_button = GTK_WIDGET(gtk_builder_get_object(builder, "save_button"));
    slot_page->prev_button = GTK_WIDGET(gtk_builder_get_object(builder, "prev_button"));
    slot_page->next_button = GTK_WIDGET(gtk_builder_get_object(builder, "next_button"));
    slot_page->slot_name_entry = GTK_WIDGET(gtk_builder_get_object(builder, "slot_name_entry"));
    slot_page->status_bar = status_bar;

    loadable->not_sensitive = 1;
    loadable->parent = app_window;
    loadable->status_bar = status_bar;
    loadable->slot_page_ids = slot_page_ids;
    loadable->card_stream = card_stream;

    inventory_fields->inventory_grid = inventory_grid;
    inventory_data_fields->inventory_fields = inventory_fields;

    for (int i = 0; i < 3; i++)
    {
        save_slots[i] = g_new(struct SaveSlot, 1);
        save_slots[i]->character_data = NULL;
        save_slots[i]->inventory_data = NULL;
    }

    slot_page->position = 0;
    slot_page->character_data_fields = character_data_fields;
    slot_page->inventory_data_fields = inventory_data_fields;
    slot_page->save_slots = save_slots;
    character_data_fields->character_fields = character_fields;
    card_stream->app_window = app_window;
    card_stream->slot_page = slot_page;
    card_stream->file_stream = NULL;

    assign_character_fields(character_fields, builder);

    g_object_unref(builder);

    load_equipment_combo_boxes(character_fields);
    load_ability_combo_boxes(character_fields);    
    
    static struct FreeStruct *free_struct;
    free_struct = g_new(struct FreeStruct, 1);
    free_struct->save_slot_count = 0;
    free_struct->slot_page_ids = slot_page_ids;
    free_struct->card_stream = card_stream;
    free_struct->loadable = loadable;
    loadable->free_struct = free_struct;

    g_signal_connect(slot_page->open_button, "clicked", G_CALLBACK(file_opener), loadable);
    g_signal_connect(slot_page->save_button, "clicked", G_CALLBACK(save_card), card_stream);
    g_signal_connect(slot_page->prev_button, "clicked", G_CALLBACK(prev_save_slot), slot_page_ids);
    g_signal_connect(slot_page->next_button, "clicked", G_CALLBACK(next_save_slot), slot_page_ids);    
    g_signal_connect(app, "shutdown", G_CALLBACK(app_shutdown), free_struct);    

    gtk_widget_show(app_window);
}

void app_open(GtkApplication *app, GFile **files, gint n_files, gchar *hint, gpointer data)
{
    GtkBuilder *builder;
    GtkWidget *app_window;
    GtkWidget *status_bar;
    GtkWidget *inventory_grid; 

    static struct SaveSlot *save_slots[3];
    static struct SlotPage *slot_page;
    static struct SlotPageID **slot_page_ids;
    static struct CharacterFields *character_fields;
    static struct CharacterDataFields *character_data_fields;
    static struct InventoryFields *inventory_fields;
    static struct InventoryDataFields *inventory_data_fields;
    static struct CardStream *card_stream;
    static struct Loadable *loadable;

    slot_page = g_new(struct SlotPage, 1);
    slot_page_ids = g_new(struct SlotPageID *, INPUT_ID);
    card_stream = g_new(struct CardStream, 1);
    loadable = g_new(struct Loadable, 1);
    character_fields = g_new(struct CharacterFields, 1);
    character_data_fields = g_new(struct CharacterDataFields, 1);
    inventory_fields = g_new(struct InventoryFields, 1);
    inventory_data_fields = g_new(struct InventoryDataFields, 1);

    for (int i = 0; i < INPUT_ID; i++)
    {
        slot_page_ids[i] = g_new(struct SlotPageID, 1);
        slot_page_ids[i]->entry_id = i;
        slot_page_ids[i]->slot_page = slot_page;
    }

    builder = gtk_builder_new_from_file("layout.ui");
        
    app_window = GTK_WIDGET(gtk_builder_get_object(builder, "app_window"));
    gtk_window_set_application(GTK_WINDOW(app_window), GTK_APPLICATION(app));

    inventory_grid = GTK_WIDGET(gtk_builder_get_object(builder, "inventory_grid"));
    status_bar = GTK_WIDGET(gtk_builder_get_object(builder, "status_bar"));

    slot_page->open_button = GTK_WIDGET(gtk_builder_get_object(builder, "open_button"));
    slot_page->save_button = GTK_WIDGET(gtk_builder_get_object(builder, "save_button"));
    slot_page->prev_button = GTK_WIDGET(gtk_builder_get_object(builder, "prev_button"));
    slot_page->next_button = GTK_WIDGET(gtk_builder_get_object(builder, "next_button"));
    slot_page->slot_name_entry = GTK_WIDGET(gtk_builder_get_object(builder, "slot_name_entry"));
    slot_page->status_bar = status_bar;

    loadable->not_sensitive = 1;
    loadable->parent = app_window;
    loadable->status_bar = status_bar;
    loadable->slot_page_ids = slot_page_ids;
    loadable->card_stream = card_stream;

    inventory_fields->inventory_grid = inventory_grid;
    inventory_data_fields->inventory_fields = inventory_fields;

    for (int i = 0; i < 3; i++)
    {
        save_slots[i] = g_new(struct SaveSlot, 1);
        save_slots[i]->character_data = NULL;
        save_slots[i]->inventory_data = NULL;
    }

    slot_page->position = 0;
    slot_page->character_data_fields = character_data_fields;
    slot_page->inventory_data_fields = inventory_data_fields;
    slot_page->save_slots = save_slots;
    character_data_fields->character_fields = character_fields;
    card_stream->app_window = app_window;
    card_stream->slot_page = slot_page;
    card_stream->file_stream = NULL;

    assign_character_fields(character_fields, builder);

    g_object_unref(builder);
    
    unsigned char *memory_card;
    char *filename;
    int address;
    int save_slot_count = 0;
    GFileIOStream *file_stream;

    load_equipment_combo_boxes(character_fields);
    load_ability_combo_boxes(character_fields);

    if (g_file_load_contents(files[0], NULL, (char **) &memory_card, NULL, NULL, NULL))
    {
        if (validate_memory_card(memory_card))
        {
            while ((address = browse_toc(memory_card)) != -1)
            {
                save_slots[save_slot_count]->character_data = g_new(struct CharacterData*, 8);
                save_slots[save_slot_count]->address = address;

                get_save_slot_name(memory_card, save_slots[save_slot_count]->name, address);
                
                for (int i = 0; i < 8; i++)
                    save_slots[save_slot_count]->character_data[i] = get_character_data(memory_card, i, address);

                save_slots[save_slot_count]->inventory_data = get_inventory_data(memory_card, address);

                save_slot_count++;
            }

            if (save_slot_count > 0)
            {
                char buffer[128];
                filename = g_file_get_basename(files[0]);
                slot_page->save_slot_count = save_slot_count;
                character_data_fields->character_data = save_slots[0]->character_data;
                character_data_fields->character_id = 0;
                load_slot_name(slot_page, 0);
                load_character_names(slot_page_ids);
                load_character_fields(slot_page_ids, character_data_fields, 0);
                create_inventory_grid(inventory_fields);
                enable_character_fields(character_fields);
                loadable->not_sensitive = 0;

                g_snprintf(buffer, 128, "Slot %i of %i", slot_page->position + 1, save_slot_count);
                gtk_statusbar_push(GTK_STATUSBAR(status_bar), 1, buffer);

                g_snprintf(buffer, 128, "Breath of Fire III Save Editor - %s", filename);
                gtk_window_set_title(GTK_WINDOW(app_window), buffer);
                g_free(filename);

                g_object_set(slot_page->save_button, "sensitive", TRUE, NULL);
                g_object_set(slot_page->slot_name_entry, "sensitive", TRUE, NULL);

                if (save_slot_count > 1)
                    g_object_set(slot_page->next_button, "sensitive", TRUE, NULL);

                file_stream = g_file_open_readwrite(G_FILE(files[0]), NULL, NULL);
                card_stream->file_stream = file_stream;
            }
            else
            {
                assert_error(GTK_WINDOW(app_window), "No Breath of Fire III Save File Found");
            }
        }
        else
            assert_error(GTK_WINDOW(app_window), "Invalid Memory Card");

        g_free(memory_card);
    }
    else
    {
        if ((filename = g_file_get_path(files[0])) != NULL)
        {
            assert_error(GTK_WINDOW(app_window), "File Does Not Exist");
            g_free(filename);
        }
        else
            assert_error(GTK_WINDOW(app_window), "Unknown Error");
    }

    static struct FreeStruct *free_struct;
    free_struct = g_new(struct FreeStruct, 1);
    free_struct->save_slot_count = save_slot_count;
    free_struct->slot_page_ids = slot_page_ids;
    free_struct->card_stream = card_stream;
    free_struct->loadable = loadable;
    loadable->free_struct = free_struct;

    g_signal_connect(slot_page->open_button, "clicked", G_CALLBACK(file_opener), loadable);
    g_signal_connect(slot_page->save_button, "clicked", G_CALLBACK(save_card), card_stream);
    g_signal_connect(slot_page->prev_button, "clicked", G_CALLBACK(prev_save_slot), slot_page_ids);
    g_signal_connect(slot_page->next_button, "clicked", G_CALLBACK(next_save_slot), slot_page_ids);    
    g_signal_connect(app, "shutdown", G_CALLBACK(app_shutdown), free_struct);

    gtk_widget_show(app_window);
}

void app_shutdown(GtkApplication *app, gpointer data)
{
    struct FreeStruct *free_struct = data;
    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 8; j++)
        {           
            if (free_struct->slot_page_ids[0]->slot_page->save_slots[i]->character_data != NULL)
                g_free(free_struct->slot_page_ids[0]->slot_page->save_slots[i]->character_data[j]);
        }

        if (free_struct->slot_page_ids[0]->slot_page->save_slots[i]->character_data != NULL)
            g_free(free_struct->slot_page_ids[0]->slot_page->save_slots[i]->character_data);

        if (free_struct->slot_page_ids[0]->slot_page->save_slots[i]->inventory_data != NULL)
            g_free(free_struct->slot_page_ids[0]->slot_page->save_slots[i]->inventory_data);

        g_free(free_struct->slot_page_ids[0]->slot_page->save_slots[i]);
    }

    g_free(free_struct->slot_page_ids[0]->slot_page->character_data_fields->character_fields);
    g_free(free_struct->slot_page_ids[0]->slot_page->character_data_fields);

    g_free(free_struct->slot_page_ids[0]->slot_page->inventory_data_fields->inventory_fields);
    g_free(free_struct->slot_page_ids[0]->slot_page->inventory_data_fields);

    for (int i = 0; i < INPUT_ID; i++)
        g_free(free_struct->slot_page_ids[i]);

    if (free_struct->card_stream->file_stream != NULL)
        g_io_stream_close(G_IO_STREAM(free_struct->card_stream->file_stream), NULL, NULL); 

    g_free(free_struct->card_stream);
    g_free(free_struct->loadable);
    g_free(free_struct->slot_page_ids);
    g_free(free_struct);
}
