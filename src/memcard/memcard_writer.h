#ifndef MEMCARD_WRITER
#define MEMCARD_WRITER

#include <gtk/gtk.h>
#include "../gui/slot_switcher.h"
#include "../utils/utils.h"

struct CardStream
{
    GtkWidget *app_window;    
    GFileIOStream *file_stream;    
    struct SlotPage *slot_page;
};

void save_slot_name(GOutputStream *stream, struct SaveSlot *save_slot);
void save_inventory(GOutputStream *stream, struct SaveSlot *save_slot);
void save_character(GOutputStream *stream, struct SaveSlot *save_slot);
void save_card(GtkWidget *widget, gpointer data);

#endif
