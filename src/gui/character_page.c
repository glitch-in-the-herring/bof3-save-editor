#include <stdint.h>
#include <string.h>
#include <gtk/gtk.h>
#include "character_page.h"


void assign_character_fields(struct CharacterFields *character_fields, GtkBuilder *builder)
{
    char *uint8_ids[16] = {"level_entry", "willpower_entry", "surprise_entry",
                       "reprisal_entry", "critical_entry",
                       "dodge_entry", "to_hit_entry", "fatigue_entry"};

    char *uint16_ids[25] = {"current_hp_entry", "current_ap_entry",
                            "current_max_hp_entry", "current_max_ap_entry",
                            "true_max_hp_entry", "true_max_ap_entry",
                            "base_pwr_entry", "base_def_entry",
                            "base_agl_entry", "base_int_entry"};

    char *resistances[20] = {"fire_combo_box", "ice_combo_box", "electric_combo_box",
                             "earth_combo_box", "wind_combo_box", "holy_combo_box",
                             "psionic_combo_box", "status_combo_box", "death_combo_box"};

    character_fields->character_combo_box = GTK_WIDGET(gtk_builder_get_object(builder, "character_combo_box"));
    character_fields->name_entry = GTK_WIDGET(gtk_builder_get_object(builder, "name_entry"));
    character_fields->exp_entry = GTK_WIDGET(gtk_builder_get_object(builder, "exp_entry"));

    for (int i = 0; i < 8; i++)
        character_fields->uint8_entries[i] = GTK_WIDGET(gtk_builder_get_object(builder, uint8_ids[i]));

    for (int i = 0; i < 10; i++)
        character_fields->uint16_entries[i] = GTK_WIDGET(gtk_builder_get_object(builder, uint16_ids[i]));    

    for (int i = 0; i < 9; i++)
        character_fields->resistance_combo_boxes[i] = GTK_WIDGET(gtk_builder_get_object(builder, resistances[i]));
}

void load_character_names(struct SlotPageID **slot_page_ids)
{
    static unsigned long signal_id = 0;

    if (signal_id != 0)
        g_signal_handler_disconnect(slot_page_ids[0]->slot_page->character_data_fields->character_fields->character_combo_box, signal_id);

    gtk_combo_box_text_remove_all(GTK_COMBO_BOX_TEXT(slot_page_ids[0]->slot_page->character_data_fields->character_fields->character_combo_box));

    for (int i = 0; i < 8; i++)
        gtk_combo_box_text_append(GTK_COMBO_BOX_TEXT(slot_page_ids[0]->slot_page->character_data_fields->character_fields->character_combo_box), NULL,
                                  slot_page_ids[0]->slot_page->character_data_fields->character_data[i]->name);

    gtk_combo_box_set_active(GTK_COMBO_BOX(slot_page_ids[0]->slot_page->character_data_fields->character_fields->character_combo_box), 0);
    signal_id = g_signal_connect(slot_page_ids[0]->slot_page->character_data_fields->character_fields->character_combo_box, "changed", G_CALLBACK(combo_box_load_character_fields), slot_page_ids);
}

void enable_character_fields(struct CharacterFields *character_fields)
{
    g_object_set(character_fields->character_combo_box, "sensitive", TRUE, NULL);
    g_object_set(character_fields->name_entry, "sensitive", TRUE, NULL);
    g_object_set(character_fields->exp_entry, "sensitive", TRUE, NULL);

    for (int i = 0; i < 8; i++)
        g_object_set(character_fields->uint8_entries[i], "sensitive", TRUE, NULL);

    for (int i = 0; i < 10; i++)
        g_object_set(character_fields->uint16_entries[i], "sensitive", TRUE, NULL);

    for (int i = 0; i < 9; i++)
        g_object_set(character_fields->resistance_combo_boxes[i], "sensitive", TRUE, NULL);
}

void load_character_fields(struct SlotPageID **slot_page_ids, struct CharacterDataFields *character_data_fields, int order)
{
    char buffer[16];
    static unsigned long uint8_signal_ids[8];
    static unsigned long uint16_signal_ids[10];
    static unsigned long other_signals[2];
    static int is_signal_set = 0;

    if (is_signal_set != 0)
    {
        for (int i = 0; i < 8; i++)
        {
            g_signal_handler_disconnect(character_data_fields->character_fields->uint8_entries[i], uint8_signal_ids[i]);
        }

        for (int i = 0; i < 10; i++)
        {
            g_signal_handler_disconnect(character_data_fields->character_fields->uint16_entries[i], uint16_signal_ids[i]);
        }

        g_signal_handler_disconnect(character_data_fields->character_fields->name_entry, other_signals[0]);
        g_signal_handler_disconnect(character_data_fields->character_fields->exp_entry, other_signals[1]);
    }

    slot_page_ids[18]->entry_id = 18;
    sprintf(buffer, "%s", character_data_fields->character_data[order]->name);
    gtk_editable_set_text(GTK_EDITABLE(character_data_fields->character_fields->name_entry), buffer);
    other_signals[0] = g_signal_connect(character_data_fields->character_fields->name_entry, "changed", G_CALLBACK(store_name_character_entry), slot_page_ids[18]);

    slot_page_ids[19]->entry_id = 19;
    sprintf(buffer, "%u", character_data_fields->character_data[order]->exp);
    gtk_editable_set_text(GTK_EDITABLE(character_data_fields->character_fields->exp_entry), buffer);
    other_signals[1] = g_signal_connect(character_data_fields->character_fields->exp_entry, "changed", G_CALLBACK(store_exp_character_entry), slot_page_ids[19]);

    for (int i = 0; i < 8; i++)
    {
        slot_page_ids[i]->entry_id = i;
        sprintf(buffer, "%i", character_data_fields->character_data[order]->uint8_array[i]);
        gtk_editable_set_text(GTK_EDITABLE(character_data_fields->character_fields->uint8_entries[i]), buffer);
        uint8_signal_ids[i] = g_signal_connect(character_data_fields->character_fields->uint8_entries[i], "changed", G_CALLBACK(store_uint8_character_entry), slot_page_ids[i]);
    }

    for (int i = 0; i < 10; i++)
    {
        slot_page_ids[i + 8]->entry_id = i + 8;        
        sprintf(buffer, "%u", character_data_fields->character_data[order]->uint16_array[i]);
        gtk_editable_set_text(GTK_EDITABLE(character_data_fields->character_fields->uint16_entries[i]), buffer);
        uint16_signal_ids[i] = g_signal_connect(character_data_fields->character_fields->uint16_entries[i], "changed", G_CALLBACK(store_uint8_character_entry), slot_page_ids[i]);        
    }

    is_signal_set = 1;
    character_data_fields->character_id = order;
}

void base_store_uint8_character_entry(struct SlotPage *slot_page, int entry, uint8_t value)
{
    slot_page->character_data_fields->character_data[slot_page->character_data_fields->character_id]->uint8_array[entry] = value;
}

void base_store_uint16_character_entry(struct SlotPage *slot_page, int entry, uint16_t value)
{
    slot_page->character_data_fields->character_data[slot_page->character_data_fields->character_id]->uint16_array[entry] = value;
}

void base_store_name_character_entry(struct SlotPage *slot_page, const char *value)
{
    strcpy(slot_page->character_data_fields->character_data[slot_page->character_data_fields->character_id]->name, value);
}

void base_store_exp_character_entry(struct SlotPage *slot_page, uint32_t value)
{
    slot_page->character_data_fields->character_data[slot_page->character_data_fields->character_id]->exp = value;
}

void combo_box_load_character_fields(GtkWidget *widget, gpointer data)
{
    int order = gtk_combo_box_get_active(GTK_COMBO_BOX(widget));
    struct SlotPageID **slot_page_ids = data;

    load_character_fields(slot_page_ids, slot_page_ids[0]->slot_page->character_data_fields, order);
}

void prev_slot_load_character_fields(struct SlotPageID **slot_page_ids)
{
    slot_page_ids[0]->slot_page->character_data_fields->character_data = slot_page_ids[0]->slot_page->save_slots[slot_page_ids[0]->slot_page->position]->character_data;

    load_character_names(slot_page_ids);
    load_character_fields(slot_page_ids, slot_page_ids[0]->slot_page->character_data_fields, 0);
}

void next_slot_load_character_fields(struct SlotPageID **slot_page_ids)
{   
    slot_page_ids[0]->slot_page->character_data_fields->character_data = slot_page_ids[0]->slot_page->save_slots[slot_page_ids[0]->slot_page->position]->character_data;

    load_character_names(slot_page_ids);
    load_character_fields(slot_page_ids, slot_page_ids[0]->slot_page->character_data_fields, 0);
}

void store_uint8_character_entry(GtkWidget *widget, gpointer data)
{
    uint8_t value;
    struct SlotPageID *slot_page_id = data;
    sscanf(gtk_editable_get_text(GTK_EDITABLE(widget)), "%hhu", &value);
    base_store_uint8_character_entry(slot_page_id->slot_page, slot_page_id->entry_id, value);
}

void store_uint16_character_entry(GtkWidget *widget, gpointer data)
{
    uint16_t value;
    struct SlotPageID *slot_page_id = data;
    sscanf(gtk_editable_get_text(GTK_EDITABLE(widget)), "%hu", &value);
    base_store_uint16_character_entry(slot_page_id->slot_page, slot_page_id->entry_id, value);
}

void store_name_character_entry(GtkWidget *widget, gpointer data)
{
    struct SlotPageID *slot_page_id = data;
    base_store_name_character_entry(slot_page_id->slot_page, gtk_editable_get_text(GTK_EDITABLE(widget)));
}

void store_exp_character_entry(GtkWidget *widget, gpointer data)
{
    uint32_t value;
    struct SlotPageID *slot_page_id = data;
    sscanf(gtk_editable_get_text(GTK_EDITABLE(widget)), "%u", &value);
    base_store_exp_character_entry(slot_page_id->slot_page, value);
}
