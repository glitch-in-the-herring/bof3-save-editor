#include "dialog_window.h"

void assert_error(GtkWindow *parent, const char *error_message)
{
    GtkWidget *error_dialog;
    error_dialog = gtk_message_dialog_new(parent, GTK_DIALOG_DESTROY_WITH_PARENT | GTK_DIALOG_MODAL, GTK_MESSAGE_ERROR, GTK_BUTTONS_CLOSE, "%s", error_message);
    g_signal_connect(error_dialog, "response", G_CALLBACK(gtk_widget_destroy), NULL);
    gtk_widget_show(error_dialog);
}

GtkWidget *assert_message(GtkWindow *parent, const char *message)
{
    GtkWidget *message_dialog;
    message_dialog = gtk_message_dialog_new(parent, GTK_DIALOG_DESTROY_WITH_PARENT | GTK_DIALOG_MODAL, GTK_MESSAGE_INFO, GTK_BUTTONS_NONE, "%s", message);
    return message_dialog;
}

GtkWidget *assert_loading(GtkWindow *parent, GtkWidget **loading_bar, double steps, const char *message)
{
    GtkWidget *loading_dialog;
    loading_dialog = gtk_message_dialog_new(parent, GTK_DIALOG_DESTROY_WITH_PARENT | GTK_DIALOG_MODAL, GTK_MESSAGE_INFO, GTK_BUTTONS_NONE, "%s", message);
    GtkWidget *content_box = gtk_dialog_get_content_area(GTK_DIALOG(loading_dialog));
    GtkWidget *progress_bar = gtk_progress_bar_new();
    gtk_progress_bar_set_pulse_step(GTK_PROGRESS_BAR(progress_bar), steps);
    gtk_box_pack_start(GTK_BOX(content_box), progress_bar, FALSE, FALSE, 0);
    return loading_dialog;
}