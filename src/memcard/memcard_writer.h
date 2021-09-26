#ifndef MEMCARD_WRITER
#define MEMCARD_WRITER

#include <gtk/gtk.h>
#include "../gui/slot_switcher.h"

struct CardStream
{
    GOutputStream *output_stream;    
    struct SlotPage *slot_page;
};

void save_card(GtkWidget *widget, gpointer data);

#endif
