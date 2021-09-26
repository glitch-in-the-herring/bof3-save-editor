#ifndef SLOT_SWITCHER
#define SLOT_SWITCHER

#include <gtk/gtk.h>
#include "../structs/save_slot.h"

struct SlotPage
{
    int save_slot_count;
    int position;
    struct SaveSlot **save_slots;
    struct CharacterDataFields *character_data_fields;
    GtkWidget *save_button;
    GtkWidget *prev_button;
    GtkWidget *next_button;
    GtkWidget *status_bar;
};

struct SlotPageID
{
    struct SlotPage *slot_page;
    int entry_id;
};

void prev_save_slot(GtkWidget *widget, gpointer data);
void next_save_slot(GtkWidget *widget, gpointer data);

#endif
