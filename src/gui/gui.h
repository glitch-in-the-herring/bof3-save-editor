#include <gtk/gtk.h>

typedef struct
{
    GtkWidget *open;
    GtkWidget *save;
} 
ToolButtons;

void app_activate(GtkApplication *app, gpointer data);
void app_open(GtkApplication *app, GFile **files, gint n_files, gchar *hint, gpointer data);
void app_shutdown(GtkApplication *app, gpointer data);
void launch_open_file_dialog(GtkButton *button, gpointer data);
