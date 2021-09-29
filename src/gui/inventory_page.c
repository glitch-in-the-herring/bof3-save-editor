#include "inventory_page.h"
#include "../db/database.h"

void create_inventory_grid(struct InventoryFields *inventory_fields)
{
    GtkWidget *combo_box;
    for (int i = 0; i < 128; i++)
    {
        combo_box = gtk_button_new_with_label("deez nutss");
        inventory_fields->combo_boxes[i] = combo_box;
        gtk_grid_attach(GTK_GRID(inventory_fields->inventory_grid), combo_box, 0, i, 1, 1);
    }
}
