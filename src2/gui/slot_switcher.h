#ifndef SLOT_SWITCHER
#define SLOT_SWITCHER

#include <gtk/gtk.h>
#include "character_page.h"
#include "../structs/save_slot.h"

struct SlotPage
{
    int save_slot_count;
    int position;
    struct SaveSlot **save_slots;
    struct CharacterDataFields *character_data_fields;
    GtkWidget *prev_button;
    GtkWidget *next_button;
};

/*void prev_save_slot(GtkWidget *widget, gpointer data);
void next_save_slot(GtkWidget *widget, gpointer data);*/

#endif
