#include "gui.h"
#include "../utils/utils.h"

void launch_open_file_dialog(GtkButton *button, gpointer data)
{
    g_print("this wasteland\n");
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
    GtkWidget *character_combo_box;
    ToolButtons tool_buttons;
    
    builder = gtk_builder_new_from_file("editor.ui");
        
    app_window = GTK_WIDGET(gtk_builder_get_object(builder, "app_window"));
    gtk_window_set_application(GTK_WINDOW(app_window), GTK_APPLICATION(app));
    
    tool_buttons.open = GTK_WIDGET(gtk_builder_get_object(builder, "open_button"));
    g_signal_connect(tool_buttons.open, "clicked", G_CALLBACK(launch_open_file_dialog), NULL);
    
    character_combo_box = GTK_WIDGET(gtk_builder_get_object(builder, "character_combo_box"));
    
    g_object_unref(builder);
    
    gtk_widget_show(app_window);
    
    unsigned char *memory_card;
    gsize length;
    if (g_file_load_contents(files[0], NULL, (char **) &memory_card, &length, NULL, NULL))
    {
        if (validate_memory_card(memory_card))
        {
            char *character_name;
            
            for (int i = 0; i < 8; i++)
            {
                character_name = get_character_name(memory_card, i, 0x2000);
                gtk_combo_box_text_append(GTK_COMBO_BOX_TEXT(character_combo_box), NULL, character_name);
                g_free(character_name);
            }
            
            g_object_set(character_combo_box, "sensitive", TRUE, NULL);
            gtk_combo_box_set_active(GTK_COMBO_BOX(character_combo_box), 0);
        }
        g_free(memory_card);
    }
}

