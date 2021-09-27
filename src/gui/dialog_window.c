#include "dialog_window.h"

void assert_error(GtkWindow *parent, const char *error_message)
{
    GtkWidget *error_dialog;
    error_dialog = GTK_WIDGET(gtk_message_dialog_new(parent, GTK_DIALOG_DESTROY_WITH_PARENT | GTK_DIALOG_MODAL, GTK_MESSAGE_ERROR, GTK_BUTTONS_CLOSE, "%s", error_message));
    g_signal_connect(error_dialog, "response", G_CALLBACK(gtk_window_destroy), NULL);
    gtk_widget_show(error_dialog);
}
