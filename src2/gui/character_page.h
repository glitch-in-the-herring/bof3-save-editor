#ifndef CHARACTER_PAGE
#define CHARACTER_PAGE

#include "../structs/character.h"

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
    GtkWidget *uint8_entries[7];
    GtkWidget *uint16_entries[10];
    GtkWidget *resistance_combo_boxes[9];
};

struct CharacterDataFields
{
    struct CharacterData **character_data;
    struct CharacterFields *character_fields;
};

void assign_character_fields(struct CharacterFields *character_fields, GtkBuilder *builder);
void load_character_names(struct CharacterDataFields *character_data_fields);
void enable_character_fields(struct CharacterFields *character_fields);
void load_character_fields(struct CharacterDataFields *character_data_fields, int order);
void combo_box_load_character_fields(GtkWidget *widget, gpointer data);
void prev_slot_load_character_fields(GtkWidget *widget, gpointer data);
void next_slot_load_character_fields(GtkWidget *widget, gpointer data);

#endif
