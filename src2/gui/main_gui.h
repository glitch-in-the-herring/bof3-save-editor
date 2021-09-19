#ifndef MAIN_GUI
#define MAIN_GUI

#include <gtk/gtk.h>

void app_activate(GtkApplication *app, gpointer data);
void app_open(GtkApplication *app, GFile **files, gint n_files, gchar *hint, gpointer data);
void app_shutdown(GtkApplication *app, gpointer data);

#endif
