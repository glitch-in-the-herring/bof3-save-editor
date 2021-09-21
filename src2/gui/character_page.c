#include <gtk/gtk.h>
#include "character_page.h"
#include "slot_switcher.h"

void assign_character_fields(struct CharacterFields *character_fields, GtkBuilder *builder)
{
    char *uint8_ids[16] = {"level_entry", "willpower_entry", "surprise_entry",
                       "reprisal_entry", "critical_entry",
                       "dodge_entry", "to_hit_entry"};

    char *uint16_ids[25] = {"current_hp_entry", "current_ap_entry",
                            "current_max_hp_entry", "current_max_ap_entry",
                            "true_max_hp_entry", "true_max_ap_entry",
                            "base_pwr_entry", "base_def_entry",
                            "base_agl_entry", "base_int_entry"};

    char *resistances[20] = {"fire_combo_box", "ice_combo_box", "electric_combo_box"
                             "earth_combo_box", "wind_combo_box", "holy_combo_box"
                             "psionic_combo_box", "status_combo_box", "death_combo_box"};

    character_fields->character_combo_box = GTK_WIDGET(gtk_builder_get_object(builder, "character_combo_box"));
    character_fields->name_entry = GTK_WIDGET(gtk_builder_get_object(builder, "name_entry"));
    character_fields->exp_entry = GTK_WIDGET(gtk_builder_get_object(builder, "exp_entry"));

    for (int i = 0; i < 7; i++)
        character_fields->uint8_entries[i] = GTK_WIDGET(gtk_builder_get_object(builder, uint8_ids[i]));

    for (int i = 0; i < 10; i++)
        character_fields->uint16_entries[i] = GTK_WIDGET(gtk_builder_get_object(builder, uint16_ids[i]));    

    for (int i = 0; i < 9; i++)
        character_fields->resistance_combo_boxes[i] = GTK_WIDGET(gtk_builder_get_object(builder, resistances[i]));
}

void load_character_names(struct CharacterDataFields *character_data_fields)
{
    unsigned long signal_id = g_signal_handler_find(character_data_fields->character_fields->character_combo_box, G_SIGNAL_MATCH_FUNC, 0, 0, NULL, combo_box_load_character_fields, NULL);
    g_signal_handler_disconnect(character_data_fields->character_fields->character_combo_box, signal_id);
    gtk_combo_box_text_remove_all(GTK_COMBO_BOX_TEXT(character_data_fields->character_fields->character_combo_box));

    for (int i = 0; i < 8; i++)
        gtk_combo_box_text_append(GTK_COMBO_BOX_TEXT(character_data_fields->character_fields->character_combo_box), NULL,
                                  character_data_fields->character_data[i]->name);

    gtk_combo_box_set_active(GTK_COMBO_BOX(character_data_fields->character_fields->character_combo_box), 0);
    g_signal_connect(character_data_fields->character_fields->character_combo_box, "changed", G_CALLBACK(combo_box_load_character_fields), character_data_fields);
}

void enable_character_fields(struct CharacterFields *character_fields)
{
    g_object_set(character_fields->character_combo_box, "sensitive", TRUE, NULL);
    g_object_set(character_fields->name_entry, "sensitive", TRUE, NULL);
    g_object_set(character_fields->exp_entry, "sensitive", TRUE, NULL);

    for (int i = 0; i < 7; i++)
        g_object_set(character_fields->uint8_entries[i], "sensitive", TRUE, NULL);

    for (int i = 0; i < 10; i++)
        g_object_set(character_fields->uint16_entries[i], "sensitive", TRUE, NULL);

    for (int i = 0; i < 9; i++)
        g_object_set(character_fields->resistance_combo_boxes[i], "sensitive", TRUE, NULL);
}

void load_character_fields(struct CharacterDataFields *character_data_fields, int order)
{
    char buffer[16];

    sprintf(buffer, "%s", character_data_fields->character_data[order]->name);
    gtk_editable_set_text(GTK_EDITABLE(character_data_fields->character_fields->name_entry), buffer);
    sprintf(buffer, "%u", character_data_fields->character_data[order]->exp);
    gtk_editable_set_text(GTK_EDITABLE(character_data_fields->character_fields->exp_entry), buffer);

    for (int i = 0; i < 7; i++)
    {
        sprintf(buffer, "%i", character_data_fields->character_data[order]->uint8_array[i]);
        gtk_editable_set_text(GTK_EDITABLE(character_data_fields->character_fields->uint8_entries[i]), buffer);
    }

    for (int i = 0; i < 10; i++)
    {
        sprintf(buffer, "%u", character_data_fields->character_data[order]->uint16_array[i]);
        gtk_editable_set_text(GTK_EDITABLE(character_data_fields->character_fields->uint16_entries[i]), buffer);
    }
}

void combo_box_load_character_fields(GtkWidget *widget, gpointer data)
{
    int order = gtk_combo_box_get_active(GTK_COMBO_BOX(widget));
    struct CharacterDataFields *character_data_fields = data;

    load_character_fields(character_data_fields, order);
}

void prev_slot_load_character_fields(GtkWidget *widget, gpointer data)
{
    struct SlotPage *slot_page = data;

    if (slot_page->position == slot_page->save_slot_count - 1)
        g_object_set(slot_page->next_button, "sensitive", TRUE, NULL);

    slot_page->position--;

    if (slot_page->position == 0)
        g_object_set(slot_page->prev_button, "sensitive", FALSE, NULL);

    slot_page->character_data_fields->character_data = slot_page->save_slots[slot_page->position]->character_data;

    load_character_names(slot_page->character_data_fields);
    load_character_fields(slot_page->character_data_fields, 0); 
}

void next_slot_load_character_fields(GtkWidget *widget, gpointer data)
{
    struct SlotPage *slot_page = data;
 
    if (slot_page->position == 0)
        g_object_set(slot_page->prev_button, "sensitive", TRUE, NULL);

    slot_page->position++;

    if (slot_page->position == slot_page->save_slot_count - 1)
        g_object_set(slot_page->next_button, "sensitive", FALSE, NULL);
    
    slot_page->character_data_fields->character_data = slot_page->save_slots[slot_page->position]->character_data;

    load_character_names(slot_page->character_data_fields);
    load_character_fields(slot_page->character_data_fields, 0);
}