#ifndef INVENTORY_PAGE
#define INVENTORY_PAGE

#include <gtk/gtk.h>
#include "../structs/inventory.h"
#include "slot_switcher.h"

struct InventoryFields
{
    GtkWidget *inventory_grid;
    GtkWidget *inv_id_combo_box;
    GtkWidget *combo_boxes[4][128];
    GtkWidget *entries[128];
};

struct InventoryDataFields
{
    int inv_id;    
    struct InventoryFields *inventory_fields;
    struct InventoryData *inventory_data;
};

void create_inventory_grid(struct InventoryDataFields *inventory_data_fields);
void load_inventory_grid(struct SlotPageID **slot_page_ids, struct InventoryDataFields *inventory_data_fields, int order);
void combo_box_load_inventory_grid(GtkWidget *widget, gpointer data);
void change_slot_load_inventory_grid(struct SlotPageID **slot_page_ids);

void base_store_inventory_item(struct SlotPage *slot_page, int entry, int inv_id, uint8_t item);
void base_store_inventory_count(struct SlotPage *slot_page, int entry, int inv_id, uint8_t count);
void store_inventory_item(GtkWidget *widget, gpointer data);
void store_inventory_count(GtkWidget *widget, gpointer data);

#endif
