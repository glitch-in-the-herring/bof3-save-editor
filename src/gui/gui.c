#include "gui.h"

void activate(GtkApplication *app, gpointer data)
{
    GtkApplicationWindow *app_window;
    GtkBuilder *builder;
    
    builder = gtk_builder_new_from_file("editor.ui");
    
    app_window = GTK_APPLICATION_WINDOW(gtk_builder_get_object(builder, "app_window"));
    
    gtk_window_present(GTK_WINDOW(app_window));
}

