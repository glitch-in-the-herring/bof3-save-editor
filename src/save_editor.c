#include <gtk/gtk.h>
#include "./gui/main_gui.h"

int main (int argc, char **argv)
{
    GtkApplication *app;
    int status;
    
    app = gtk_application_new("com.github.glitch-in-the-herring.bof3editor", G_APPLICATION_HANDLES_OPEN);
    g_signal_connect(app, "activate", G_CALLBACK(app_activate), NULL);
    g_signal_connect(app, "open", G_CALLBACK(app_open), NULL);

    status = g_application_run(G_APPLICATION(app), argc, argv);
    g_object_unref(app);
    
    return status;
}
