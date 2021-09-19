#include "main_gui.h"
#include "character_page.h"
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
    static struct CharacterData *character_data[8];
    static struct CharacterFields *character_fields;
    static struct CharacterDataFields *character_data_fields;

    character_fields = g_new(struct CharacterFields, 1);
    character_data_fields = g_new(struct CharacterDataFields, 1);

    builder = gtk_builder_new_from_file("editor.ui");
        
    app_window = GTK_WIDGET(gtk_builder_get_object(builder, "app_window"));
    gtk_window_set_application(GTK_WINDOW(app_window), GTK_APPLICATION(app));

    assign_character_fields(character_fields, builder);

    g_object_unref(builder);
    
    unsigned char *memory_card;
    gsize length;

    if (g_file_load_contents(files[0], NULL, (char **) &memory_card, &length, NULL, NULL))
    {
        if (validate_memory_card(memory_card))
        {
            for (int i = 0; i < 8; i++)
            {
                character_data[i] = get_character_data(memory_card, i, 0x2000);
            }

            character_data_fields->character_fields = character_fields;
            character_data_fields->character_data = character_data;
            load_character_names(character_data_fields);
            enable_character_fields(character_fields);
            load_character_fields(character_fields->character_combo_box, character_data_fields);
        }

        g_free(memory_card);
    }    

    g_signal_connect(character_fields->character_combo_box, "changed", G_CALLBACK(load_character_fields), character_data_fields);
    g_signal_connect(app, "shutdown", G_CALLBACK(app_shutdown), character_data_fields);

    gtk_widget_show(app_window);
}

void app_shutdown(GtkApplication *app, gpointer data)
{
    struct CharacterDataFields *character_data_fields = data;
    g_free(character_data_fields->character_fields);
    for (int i = 0; i < 8; i++)
        g_free(character_data_fields->character_data[i]);

    g_free(character_data_fields);
}
