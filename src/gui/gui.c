#include "gui.h"

void activate(GtkApplication *app, gpointer data)
{
    GtkWidget *app_window;
    GtkBuilder *builder;
    
    builder = gtk_builder_new_from_file("editor.ui");
        
    app_window = GTK_WIDGET(gtk_builder_get_object(builder, "app_window"));
    gtk_window_set_application(GTK_WINDOW(app_window), GTK_APPLICATION(app));
    
    gtk_widget_show(app_window);
}

