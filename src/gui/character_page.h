#ifndef CHARACTER_PAGE
#define CHARACTER_PAGE

#include <stdint.h>
#include "../structs/character.h"
#include "slot_switcher.h"

/* uint8 entries array:
 * level_entry              0
 * willpower_entry          1
 * surprise_entry           2
 * reprisal_entry           3
 * critical_entry           4
 * dodge_entry              5
 * to_hit_entry             6
 */

/* uint16 entries array:
 * current_hp_entry         0
 * current_ap_entry         1
 * current_max_hp_entry     2
 * current_max_ap_entry     3
 * true_max_hp_entry        4
 * true_max_ap_entry        5
 * base_pwr_entry           6
 * base_def_entry           7
 * base_agl_entry           8
 * base_int_entry           9
 */

struct CharacterFields
{
    GtkWidget *character_combo_box;
    GtkWidget *name_entry;
    GtkWidget *exp_entry;
    GtkWidget *uint8_entries[8];
    GtkWidget *uint16_entries[10];
    GtkWidget *resistance_combo_boxes[9];
    GtkWidget *equipment_combo_boxes[6];
};

struct CharacterDataFields
{
    struct CharacterData **character_data;
    struct CharacterFields *character_fields;
    int character_id;
};

void assign_character_fields(struct CharacterFields *character_fields, GtkBuilder *builder);
void load_character_names(struct SlotPageID **slot_page_ids);
void enable_character_fields(struct CharacterFields *character_fields);
void load_character_fields(struct SlotPageID **slot_page_ids, struct CharacterDataFields *character_data_fields, int order);
void load_equipment_combo_boxes(struct CharacterFields *character_fields);

void base_store_name_character_entry(struct SlotPage *slot_page, const char *value);
void base_store_exp_character_entry(struct SlotPage *slot_page, uint32_t value);
void base_store_uint8_character_entry(struct SlotPage *slot_page, int entry, uint8_t value);
void base_store_uint16_character_entry(struct SlotPage *slot_page, int entry, uint16_t value);
void base_store_character_resistance(struct SlotPage *slot_page, int entry, uint8_t value);
void base_store_character_equipment(struct SlotPage *slot_page, int entry, uint8_t value);

void combo_box_load_character_fields(GtkWidget *widget, gpointer data);
void prev_slot_load_character_fields(struct SlotPageID **slot_page_ids);
void next_slot_load_character_fields(struct SlotPageID **slot_page_ids);

void store_name_character_entry(GtkWidget *widget, gpointer data);
void store_exp_character_entry(GtkWidget *widget, gpointer data);
void store_uint8_character_entry(GtkWidget *widget, gpointer data);
void store_uint16_character_entry(GtkWidget *widget, gpointer data);
void store_character_resistance(GtkWidget *widget, gpointer data);
void store_character_equipment(GtkWidget *widget, gpointer data);

#endif
