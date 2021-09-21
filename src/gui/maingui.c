#include "maingui.h"
#include "character_page.h"
#include "../memcard/memcard.h"
#include "../data/character.h"

void launch_open_file_dialog(GtkButton *button, gpointer data)
{
    g_print("this wasteland\n");
}

void app_activate(GtkApplication *app, gpointer data)
{
    GtkBuilder *builder;
    GtkWidget *app_window;
    struct ToolButtons tool_buttons;
    
    builder = gtk_builder_new_from_file("editor.ui");
        
    app_window = GTK_WIDGET(gtk_builder_get_object(builder, "app_window"));
    gtk_window_set_application(GTK_WINDOW(app_window), GTK_APPLICATION(app));
    
    tool_buttons.open = GTK_WIDGET(gtk_builder_get_object(builder, "open_button"));
    g_signal_connect(tool_buttons.open, "clicked", G_CALLBACK(launch_open_file_dialog), NULL);
    
    g_object_unref(builder);
    
    gtk_widget_show(app_window);
}

void app_open(GtkApplication *app, GFile **files, gint n_files, gchar *hint, gpointer data)
{
    GtkBuilder *builder;
    GtkWidget *app_window;

    static struct ToolButtons tool_buttons;
    static struct CharacterFields *character_fields;    
    character_fields = g_new(struct CharacterFields, 1);
    
    builder = gtk_builder_new_from_file("editor.ui");
        
    app_window = GTK_WIDGET(gtk_builder_get_object(builder, "app_window"));
    gtk_window_set_application(GTK_WINDOW(app_window), GTK_APPLICATION(app));
    
    tool_buttons.open = GTK_WIDGET(gtk_builder_get_object(builder, "open_button"));
    g_signal_connect(tool_buttons.open, "clicked", G_CALLBACK(launch_open_file_dialog), NULL);
    
    assign_character_fields(character_fields, builder);
    
    g_object_unref(builder);
    
    unsigned char *memory_card;
    gsize length;

    int save_slot_count = 0;
    int save_slot_address;

    static struct SaveSlot *save_slots[3];
    static struct CharacterDataFields *character_data_fields;
    character_data_fields = g_new(struct CharacterDataFields, 1);
    character_data_fields->character_fields = character_fields;
    
    if (g_file_load_contents(files[0], NULL, (char **) &memory_card, &length, NULL, NULL))
    {
        if (validate_memory_card(memory_card))
        {
            while ((save_slot_address = browse_toc(memory_card)) != -1)
            {
                save_slots[save_slot_count] = g_new(struct SaveSlot, 1);
                save_slots[save_slot_count]->address = save_slot_address;
                save_slot_count++;
            }

            for (int i = 0; i < save_slot_count; i++)
            {
                save_slots[i]->character_data = g_new(struct CharacterData*, 8);

                for (int j = 0; j < 8; j++)
                {
                    save_slots[i]->character_data[j] = get_character_data(memory_card, i, 0x2000);                    
                }
            }

            character_data_fields->character_data = save_slots[0]->character_data;

            load_character_names(character_data_fields);
            load_character_fields(character_data_fields, 0);
            enable_character_fields(character_fields);
        }
        g_free(memory_card);
    }

    static struct FreeStruct *free_struct;
    free_struct = g_new(struct FreeStruct, 1);
    free_struct->save_slot_count = save_slot_count;
    free_struct->save_slots = save_slots;
    free_struct->character_fields = character_fields;

    g_signal_connect(character_fields->character_combo_box, "changed", G_CALLBACK(load_character_fields), character_data_fields);
    g_signal_connect(app, "shutdown", G_CALLBACK(app_shutdown), free_struct);

    gtk_widget_show(app_window);
}

void app_shutdown(GtkApplication *app, gpointer data)
{
    struct FreeStruct *free_struct = free_struct;

    for (int i = 0; i < free_struct->save_slot_count; i++)
    {
        for (int j = 0; j < 8; j++)
        {
            g_free(free_struct->save_slots[i]->character_data[j]);
        }

        g_free(free_struct->save_slots[i]->character_data);
    }

    g_free(free_struct->character_fields);
    g_free(free_struct);
}
