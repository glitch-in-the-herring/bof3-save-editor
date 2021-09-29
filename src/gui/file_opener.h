#ifndef FILE_OPENER
#define FILE_OPENER

#include <gtk/gtk.h>

struct Loadable
{
    int not_sensitive;
    GtkWidget *parent;
    GtkWidget *status_bar;
    struct SlotPageID **slot_page_ids;
    struct CardStream *card_stream;
    struct FreeStruct *free_struct;
};

void file_opener(GtkWidget *widget, gpointer data);

#endif
