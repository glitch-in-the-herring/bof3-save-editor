#ifndef CHARACTER_PAGE
#define CHARACTER_PAGE

#include "../structs/character.h"

struct CharacterFields
{
    GtkWidget *character_combo_box;
    GtkWidget *name_entry;
    GtkWidget *level_entry;
    GtkWidget *exp_entry;    
    GtkWidget *current_hp_entry;
    GtkWidget *current_ap_entry;
    GtkWidget *current_max_hp_entry;
    GtkWidget *current_max_ap_entry;
    GtkWidget *true_max_hp_entry;
    GtkWidget *true_max_ap_entry;
    GtkWidget *base_pwr_entry;
    GtkWidget *base_def_entry;
    GtkWidget *base_agl_entry;
    GtkWidget *base_int_entry;
    GtkWidget *willpower_entry;
    GtkWidget *surprise_entry;
    GtkWidget *reprisal_entry;
    GtkWidget *critical_entry;
    GtkWidget *dodge_entry;
    GtkWidget *to_hit_entry;
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
void load_character_fields(GtkWidget *widget, gpointer data);

#endif
