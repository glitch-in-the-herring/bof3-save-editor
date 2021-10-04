#ifndef DIALOG_WINDOW
#define DIALOG_WINDOW

#include <gtk/gtk.h>

void assert_error(GtkWindow *parent, const char *error_message);
GtkWidget *assert_message(GtkWindow *parent, const char *error_message);
GtkWidget *assert_loading(GtkWindow *parent, GtkWidget **loading_bar, double steps, const char *message);

#endif
