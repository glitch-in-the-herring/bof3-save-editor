#ifndef INVENTORY_PAGE
#define INVENTORY_PAGE

#include <gtk/gtk.h>
#include "../structs/inventory.h"
#include "slot_switcher.h"

struct InventoryFields
{
    GtkWidget *inventory_grid;
    GtkWidget *combo_boxes[128];
    GtkWidget *entries[128];
};

struct InventoryDataFields
{
    struct InventoryFields *inventory_fields;
    struct InventoryData *inventory_data;
};

void create_inventory_grid(struct InventoryFields *inventory_fields);

#endif
