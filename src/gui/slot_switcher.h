#ifndef SLOT_SWITCHER
#define SLOT_SWITCHER

#include <stdio.h>
#include <string.h>
#include <gtk/gtk.h>
#include "../structs/save_slot.h"

struct SlotPage
{
    int save_slot_count;
    int position;
    struct SaveSlot **save_slots;
    struct CharacterDataFields *character_data_fields;
    struct InventoryDataFields *inventory_data_fields;
    GtkWidget *open_button;
    GtkWidget *save_button;
    GtkWidget *prev_button;
    GtkWidget *next_button;
    GtkWidget *slot_name_entry;
    GtkWidget *status_bar;
};

struct SlotPageID
{
    struct SlotPage *slot_page;
    int entry_id;
};

void prev_save_slot(GtkWidget *widget, gpointer data);
void next_save_slot(GtkWidget *widget, gpointer data);
void load_slot_name(struct SlotPage *slot_page, int order);
void store_slot_name(GtkWidget *widget, gpointer data);

#endif
