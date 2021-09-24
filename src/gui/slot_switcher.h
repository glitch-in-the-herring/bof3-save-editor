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
    GtkWidget *prev_button;
    GtkWidget *next_button;
};

/* slot_page_id index
 * 0 - 7    uint8 character entries
 * 8 - 17   uint16 character entries
 * 18       char* character name entry
 * 19       uint32 character exp entry      
 */

struct SlotPageID
{
    struct SlotPage *slot_page;
    int entry_id;
};

void prev_save_slot(GtkWidget *widget, gpointer data);
void next_save_slot(GtkWidget *widget, gpointer data);

#endif
