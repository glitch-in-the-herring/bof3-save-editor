#include "inventory_page.h"
#include "../db/database.h"

void create_inventory_grid(struct InventoryDataFields *inventory_data_fields)
{
    GtkWidget *combo_box;
    GtkWidget *entry;
    struct InventoryFields *inventory_fields = inventory_data_fields->inventory_fields;

    for (int i = 0; i < 4; i++)
    {
        for (int j = 0; j < 128; j++)
        {
            combo_box = gtk_combo_box_text_new();
            combo_box = GTK_WIDGET(g_object_ref(combo_box));
            inventory_fields->combo_boxes[i][j] = combo_box;       
        }
    }

    for (int i = 0; i < 128; i++)
    {
        entry = gtk_entry_new();
        entry = GTK_WIDGET(g_object_ref(entry));
        inventory_fields->entries[i] = entry;

        for (int j = 0; j < 92; j++)
            gtk_combo_box_text_append(GTK_COMBO_BOX_TEXT(inventory_fields->combo_boxes[0][i]), NULL, item_db[j]);

        for (int j = 0; j < 83; j++)
            gtk_combo_box_text_append(GTK_COMBO_BOX_TEXT(inventory_fields->combo_boxes[1][i]), NULL, weapon_db[j]);

        for (int j = 0; j < 83; j++)
            gtk_combo_box_text_append(GTK_COMBO_BOX_TEXT(inventory_fields->combo_boxes[2][i]), NULL, armor_db[j]);

        for (int j = 0; j < 27; j++)
            gtk_combo_box_text_append(GTK_COMBO_BOX_TEXT(inventory_fields->combo_boxes[3][i]), NULL, acc_db[j]);

        for (int j = 0; j < 24; j++)
            gtk_combo_box_text_append(GTK_COMBO_BOX_TEXT(inventory_fields->combo_boxes[3][i]), NULL, option_db[j + 1]);

    }       
}

void load_inventory_grid(struct SlotPageID **slot_page_ids, struct InventoryDataFields *inventory_data_fields, int order)
{
    static combo_box_signal_ids[128];
    static entry_signal_ids[128];
    static is_signal_set = 0;

    if (is_signal_set)
    {
        for (int i = 0; i < 128; i++)
        {
            g_signal_handler_disconnect(inventory_fields->combo_boxes[order][i], combo_box_signal_ids[i]);
            g_signal_handler_disconnect(inventory_fields->entries[i], entry_signal_ids[i]);
        }
    }

    struct InventoryFields *inventory_fields = inventory_data_fields->inventory_fields;

    gtk_grid_remove_column(GTK_GRID(inventory_fields->inventory_grid), 0);
    gtk_grid_remove_column(GTK_GRID(inventory_fields->inventory_grid), 0);

    char buffer[8];

    for (int i = 0; i < 128; i++)
    {
        inventory_fields->combo_boxes[order][i] = GTK_WIDGET(g_object_ref(inventory_fields->combo_boxes[order][i]));
        inventory_fields->entries[i] = GTK_WIDGET(g_object_ref(inventory_fields->entries[i]));

        gtk_grid_attach(GTK_GRID(inventory_fields->inventory_grid), inventory_fields->combo_boxes[order][i], 0, i, 1, 1);
        gtk_grid_attach(GTK_GRID(inventory_fields->inventory_grid), inventory_fields->entries[i], 1, i, 1, 1);

        gtk_widget_show(inventory_fields->combo_boxes[order][i]);
        gtk_widget_show(inventory_fields->entries[i]);

        gtk_combo_box_set_active(GTK_COMBO_BOX(inventory_fields->combo_boxes[order][i]), inventory_data_fields->inventory_data->item_ids[order][i]);
        sprintf(buffer, "%i", inventory_data_fields->inventory_data->item_counts[order][i]);
        gtk_entry_set_text(GTK_ENTRY(inventory_fields->entries[i]), buffer);

        g_signal_connect(inventory_fields->combo_boxes[order][i], "changed", G_CALLBACK(store_inventory_item), slot_page_ids[i]);
    }

    inventory_data_fields->inv_id = order;
    is_signal_set = 1;
}

void combo_box_load_inventory_grid(GtkWidget *widget, gpointer data)
{
    int order = gtk_combo_box_get_active(GTK_COMBO_BOX(widget));
    struct InventoryDataFields *inventory_data_fields = data;

    load_inventory_grid(inventory_data_fields, order);
}

void change_slot_load_inventory_grid(struct SlotPageID **slot_page_ids)
{
    slot_page_ids[0]->slot_page->inventory_data_fields->inventory_data = slot_page_ids[0]->slot_page->save_slots[slot_page_ids[0]->slot_page->position]->inventory_data;
    load_inventory_grid(slot_page_ids[0]->slot_page->inventory_data_fields, 0);
    gtk_combo_box_set_active(GTK_COMBO_BOX(slot_page_ids[0]->slot_page->inventory_data_fields->inventory_fields->inv_id_combo_box), 0);
}

void base_store_inventory_item(struct SlotPage *slot_page, int entry, int inv_id, uint8_t item)
{
    slot_page->inventory_data_fields->inventory_data->item_ids[inv_id][entry] = item;
}

void base_store_inventory_count(struct SlotPage *slot_page, int entry, int inv_id, uint8_t count)
{
    slot_page->inventory_data_fields->inventory_data->item_counts[inv_id][entry] = count;
}

void store_inventory_item(GtkWidget *widget, gpointer data)
{
    struct SlotPageID *slot_page_id = data;
    int inv_id = slot_page_id->slot_page->inventory_data_fields->inv_id;
    uint8_t item = gtk_combo_box_get_active(GTK_COMBO_BOX(widget));
    base_store_inventory_item(slot_page_id->slot_page, slot_page_id->entry_id, inv_id, item);
}

void store_inventory_count(GtkWidget *widget, gpointer data)
{
    struct SlotPageID *slot_page_id = data;
    int inv_id = slot_page_id->slot_page->inventory_data_fields->inv_id;
    uint8_t count;
    sscanf(gtk_entry_get_text(GTK_ENTRY(widget)), "%hhu", &count);
    base_store_inventory_count(slot_page_id->slot_page, slot_page_id->entry_id, inv_id, count);
}
