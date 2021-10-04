#ifndef INVENTORY_PAGE
#define INVENTORY_PAGE

#include <gtk/gtk.h>
#include "../structs/inventory.h"
#include "slot_switcher.h"

struct InventoryFields
{
    GtkWidget *inventory_grid;
    GtkWidget *vital_box;
    GtkWidget *skill_notes_box;
    GtkWidget *inv_id_combo_box;
    GtkWidget *combo_boxes[128];
    GtkWidget *entries[128];
    GtkTreeModel *item_model;
    GtkTreeModel *weapon_model;
    GtkTreeModel *armor_model;
    GtkTreeModel *option_model;
    GtkTreeModel *abil_model;    
    GtkWidget *vital_combo_boxes[32];
    GtkWidget *skill_note_combo_boxes[128];
};

struct InventoryDataFields
{
    int inv_id;    
    struct InventoryFields *inventory_fields;
    struct InventoryData *inventory_data;
};

void create_inventory_grid(struct InventoryDataFields *inventory_data_fields);
void load_inventory_grid(struct SlotPageID **slot_page_ids, struct InventoryDataFields *inventory_data_fields, int order);
void load_vital_box(struct SlotPageID **slot_page_ids, struct InventoryDataFields *inventory_data_fields);
void load_skill_notes(struct SlotPageID **slot_page_ids, struct InventoryDataFields *inventory_data_fields);
void combo_box_load_inventory_grid(GtkWidget *widget, gpointer data);
void change_slot_load_inventory_grid(struct SlotPageID **slot_page_ids);

void base_store_inventory_item(struct SlotPage *slot_page, int entry, int inv_id, uint8_t item);
void base_store_inventory_count(struct SlotPage *slot_page, int entry, int inv_id, uint8_t count);
void base_store_vital_items(struct SlotPage *slot_page, int entry, uint8_t item);
void base_store_skill_notes(struct SlotPage *slot_page, int entry, uint8_t value);
void store_inventory_item(GtkWidget *widget, gpointer data);
void store_inventory_count(GtkWidget *widget, gpointer data);
void store_vital_items(GtkWidget *widget, gpointer data);
void store_skill_notes(GtkWidget *widget, gpointer data);

#endif
