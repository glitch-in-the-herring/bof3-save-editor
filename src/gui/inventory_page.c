#include "inventory_page.h"
#include "../db/database.h"

GtkTreeModel *inventory_page_models[5];

GtkTreeModel *create_model(char **source, int count)
{
    GtkTreeIter iter;
    GtkListStore *store;

    store = gtk_list_store_new(1, G_TYPE_STRING);

    for (int i = 0; i < count; i++)
    {
        gtk_list_store_append (store, &iter);
        gtk_list_store_set (store, &iter, 0, source[i], -1);        
    }

    return GTK_TREE_MODEL(store);
}

void create_inventory_grid(struct InventoryDataFields *inventory_data_fields)
{
    GtkWidget *combo_box;
    GtkWidget *entry;
    GtkCellRenderer *renderer;
    struct InventoryFields *inventory_fields = inventory_data_fields->inventory_fields;

    inventory_page_models[0] = create_model(item_db, 91);
    inventory_page_models[1] = create_model(weapon_db, 83);
    inventory_page_models[2] = create_model(armor_db, 68);
    inventory_page_models[3] = create_model(option_db, 52);
    inventory_page_models[4] = create_model(abil_db, 228);

    inventory_fields->item_model = inventory_page_models[0];
    inventory_fields->weapon_model = inventory_page_models[1];
    inventory_fields->armor_model = inventory_page_models[2];
    inventory_fields->option_model = inventory_page_models[3];
    inventory_fields->abil_model = inventory_page_models[4];

    for (int i = 0; i < 128; i++)
    {
        combo_box = gtk_combo_box_new();
        combo_box = GTK_WIDGET(g_object_ref(combo_box));
        inventory_fields->combo_boxes[i] = combo_box;

        gtk_grid_attach(GTK_GRID(inventory_fields->inventory_grid), combo_box, 0, i, 1, 1);
        gtk_widget_show(combo_box);

        entry = gtk_entry_new();
        entry = GTK_WIDGET(g_object_ref(entry));
        inventory_fields->entries[i] = entry;

        gtk_grid_attach(GTK_GRID(inventory_fields->inventory_grid), entry, 1, i, 1, 1); 
        gtk_widget_show(entry);

        combo_box = gtk_combo_box_new_with_model(inventory_fields->abil_model);

        renderer = gtk_cell_renderer_text_new();
        gtk_cell_layout_pack_start (GTK_CELL_LAYOUT(combo_box), renderer, TRUE);
        gtk_cell_layout_set_attributes(GTK_CELL_LAYOUT(combo_box), renderer, "text", 0, NULL);

        gtk_widget_set_halign(combo_box, GTK_ALIGN_START);

        inventory_fields->skill_note_combo_boxes[i] = combo_box;
        gtk_box_pack_start(GTK_BOX(inventory_fields->skill_notes_box), combo_box, FALSE, FALSE, 0);
        gtk_widget_show(combo_box);
    }

    for (int i = 0; i < 32; i++)
    {
        combo_box = gtk_combo_box_text_new();

        for (int j = 0; j < 16; j++)
            gtk_combo_box_text_append(GTK_COMBO_BOX_TEXT(combo_box), NULL, vital_db[j]);

        gtk_widget_set_halign(combo_box, GTK_ALIGN_START);

        inventory_fields->vital_combo_boxes[i] = combo_box;
        gtk_box_pack_start(GTK_BOX(inventory_fields->vital_box), combo_box, FALSE, FALSE, 0);
        gtk_widget_show(combo_box);
    }
}

void load_inventory_grid(struct SlotPageID **slot_page_ids, struct InventoryDataFields *inventory_data_fields, int order)
{
    static long unsigned combo_box_signal_ids[128];
    static long unsigned entry_signal_ids[128];
    static int signals_set = 0;
    GtkCellRenderer *renderer;

    struct InventoryFields *inventory_fields = inventory_data_fields->inventory_fields;

    if (signals_set)
    {
        for (int i = 0; i < 128; i++)
        {
            g_signal_handler_disconnect(inventory_fields->combo_boxes[i], combo_box_signal_ids[i]);
            g_signal_handler_disconnect(inventory_fields->entries[i], entry_signal_ids[i]);
        }
    }

    char buffer[8];

    for (int i = 0; i < 128; i++)
    {
        gtk_cell_layout_clear(GTK_CELL_LAYOUT(inventory_fields->combo_boxes[i]));
        gtk_combo_box_set_model(GTK_COMBO_BOX(inventory_fields->combo_boxes[i]), inventory_page_models[order]);

        renderer = gtk_cell_renderer_text_new();
        gtk_cell_layout_pack_start (GTK_CELL_LAYOUT(inventory_fields->combo_boxes[i]), renderer, TRUE);
        gtk_cell_layout_set_attributes(GTK_CELL_LAYOUT(inventory_fields->combo_boxes[i]), renderer, "text", 0, NULL);        

        gtk_combo_box_set_active(GTK_COMBO_BOX(inventory_fields->combo_boxes[i]), inventory_data_fields->inventory_data->item_ids[order][i]);
        sprintf(buffer, "%i", inventory_data_fields->inventory_data->item_counts[order][i]);
        gtk_entry_set_text(GTK_ENTRY(inventory_fields->entries[i]), buffer);

        combo_box_signal_ids[i] = g_signal_connect(inventory_fields->combo_boxes[i], "changed", G_CALLBACK(store_inventory_item), slot_page_ids[i]);
        entry_signal_ids[i] = g_signal_connect(inventory_fields->entries[i], "changed", G_CALLBACK(store_inventory_count), slot_page_ids[i]);  
    }

    inventory_data_fields->inv_id = order;
    signals_set = 1;
}

void load_vital_box(struct SlotPageID **slot_page_ids, struct InventoryDataFields *inventory_data_fields)
{
    static long unsigned signal_ids[32];
    static int is_signal_set = 0;

    if (is_signal_set)
    {
        for (int i = 0; i < 32; i++)
            g_signal_handler_disconnect(inventory_data_fields->inventory_fields->vital_combo_boxes[i], signal_ids[i]);
    }

    for (int i = 0; i < 32; i++)
    {
        gtk_combo_box_set_active(GTK_COMBO_BOX(inventory_data_fields->inventory_fields->vital_combo_boxes[i]), inventory_data_fields->inventory_data->vital_item_ids[i]);
        signal_ids[i] = g_signal_connect(inventory_data_fields->inventory_fields->vital_combo_boxes[i], "changed", G_CALLBACK(store_vital_items), slot_page_ids[i]);
    }

    is_signal_set = 1;
}

void load_skill_notes(struct SlotPageID **slot_page_ids, struct InventoryDataFields *inventory_data_fields)
{
    static long unsigned signal_ids[128];
    static int is_signal_set = 0;

    if (is_signal_set)
    {
        for (int i = 0; i < 128; i++)
            g_signal_handler_disconnect(inventory_data_fields->inventory_fields->skill_note_combo_boxes[i], signal_ids[i]);
    }

    for (int i = 0; i < 128; i++)
    {
        gtk_combo_box_set_active(GTK_COMBO_BOX(inventory_data_fields->inventory_fields->skill_note_combo_boxes[i]), inventory_data_fields->inventory_data->skill_note_ids[i]);
        signal_ids[i] = g_signal_connect(inventory_data_fields->inventory_fields->skill_note_combo_boxes[i], "changed", G_CALLBACK(store_skill_notes), slot_page_ids[i]);
    }

    is_signal_set = 1;
}

void combo_box_load_inventory_grid(GtkWidget *widget, gpointer data)
{
    int order = gtk_combo_box_get_active(GTK_COMBO_BOX(widget));
    struct SlotPageID **slot_page_ids = data;
    struct InventoryDataFields *inventory_data_fields = slot_page_ids[0]->slot_page->inventory_data_fields;

    load_inventory_grid(slot_page_ids, inventory_data_fields, order);
}

void change_slot_load_inventory_grid(struct SlotPageID **slot_page_ids)
{
    slot_page_ids[0]->slot_page->inventory_data_fields->inventory_data = slot_page_ids[0]->slot_page->save_slots[slot_page_ids[0]->slot_page->position]->inventory_data;
    load_inventory_grid(slot_page_ids, slot_page_ids[0]->slot_page->inventory_data_fields, 0);
    load_vital_box(slot_page_ids, slot_page_ids[0]->slot_page->inventory_data_fields);
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

void base_store_vital_items(struct SlotPage *slot_page, int entry, uint8_t item)
{
    slot_page->inventory_data_fields->inventory_data->vital_item_ids[entry] = item;
}

void base_store_skill_notes(struct SlotPage *slot_page, int entry, uint8_t value)
{
    slot_page->inventory_data_fields->inventory_data->skill_note_ids[entry] = value;
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

void store_vital_items(GtkWidget *widget, gpointer data)
{
    struct SlotPageID *slot_page_id = data;
    uint8_t item = gtk_combo_box_get_active(GTK_COMBO_BOX(widget));
    base_store_vital_items(slot_page_id->slot_page, slot_page_id->entry_id, item);
}

void store_skill_notes(GtkWidget *widget, gpointer data)
{
    struct SlotPageID *slot_page_id = data;
    uint8_t value = gtk_combo_box_get_active(GTK_COMBO_BOX(widget));
    base_store_skill_notes(slot_page_id->slot_page, slot_page_id->entry_id, value);
}
