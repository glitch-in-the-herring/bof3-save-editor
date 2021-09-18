#include <stdio.h>
#include "maingui.h"
#include "../utils/utils.h"
#include "../data/character.h"

void launch_open_file_dialog(GtkButton *button, gpointer data)
{
    g_print("this wasteland\n");
}

void change_character_data(GtkWidget *combo_box, gpointer data)
{
    ChangeCharacterArg *args = data;
    int combo_box_index = gtk_combo_box_get_active(GTK_COMBO_BOX(combo_box));
    char character_lvl[3];
    sprintf(character_lvl, "%i", (args->character_data)[combo_box_index]->lvl);
    gtk_editable_set_text(GTK_EDITABLE(args->level_entry), character_lvl);
}

void app_activate(GtkApplication *app, gpointer data)
{
    GtkBuilder *builder;
    GtkWidget *app_window;
    GtkWidget *character_combo_box;
    ToolButtons tool_buttons;
    
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
    character_fields = g_new(CharacterFields, 1);
    
    builder = gtk_builder_new_from_file("editor.ui");
        
    app_window = GTK_WIDGET(gtk_builder_get_object(builder, "app_window"));
    gtk_window_set_application(GTK_WINDOW(app_window), GTK_APPLICATION(app));
    
    tool_buttons.open = GTK_WIDGET(gtk_builder_get_object(builder, "open_button"));
    g_signal_connect(tool_buttons.open, "clicked", G_CALLBACK(launch_open_file_dialog), NULL);
    
    assign_character_fields(character_fields, builder);
    
    g_object_unref(builder);
    
    unsigned char *memory_card;
    gsize length;
    static struct CharacterData *character_data[8];
    static struct CharacterDataFields character_data_fields;
    
    if (g_file_load_contents(files[0], NULL, (char **) &memory_card, &length, NULL, NULL))
    {
        if (validate_memory_card(memory_card))
        {
            char *character_name;
            char character_lvl[3];
            for (int i = 0; i < 8; i++)
            {
                character_name = get_character_name(memory_card, i, 0x2000);
                character_data[i] = get_character_data(memory_card, i, 0x2000);
                gtk_combo_box_text_append(GTK_COMBO_BOX_TEXT(character_combo_box), NULL, character_name);
                g_free(character_name);
            }
            g_object_set(character_combo_box, "sensitive", TRUE, NULL);
            g_object_set(level_entry, "sensitive", TRUE, NULL);
            sprintf(character_lvl, "%i", character_data[0]->lvl);
            gtk_editable_set_text(GTK_EDITABLE(level_entry), character_lvl);
            gtk_combo_box_set_active(GTK_COMBO_BOX(character_combo_box), 0);
        }
        g_free(memory_card);
    }

    static struct FreeStructs *free_structs;
    free_structs = g_new(struct FreeStructs, 1);
    free_structs->character_fields = character_fields;
    free_structs->character_data = 
    
    g_signal_connect(character_combo_box, "changed", G_CALLBACK(change_character_data), &change_character_arg);
    g_signal_connect(app, "shutdown", G_CALLBACK(app_shutdown), free_structs);

    gtk_widget_show(app_window);
}

void app_shutdown(GtkApplication *app, gpointer data)
{
    
}
