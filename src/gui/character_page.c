#include "character_page.h"

void assign_character_fields(struct CharacterFields *character_fields, GtkBuilder *builder)
{
    character_fields->name_entry = GTK_WIDGET(gtk_builder_get_object(builder, "name_entry"));
    character_fields->level_entry = GTK_WIDGET(gtk_builder_get_object(builder, "level_entry"));
    character_fields->exp_entry = GTK_WIDGET(gtk_builder_get_object(builder, "exp_entry"));
    character_fields->current_hp_entry = GTK_WIDGET(gtk_builder_get_object(builder, "current_hp_entry"));
    character_fields->current_ap_entry = GTK_WIDGET(gtk_builder_get_object(builder, "current_ap_entry"));
    character_fields->current_max_hp_entry = GTK_WIDGET(gtk_builder_get_object(builder, "current_max_hp_entry"));
    character_fields->current_max_ap_entry = GTK_WIDGET(gtk_builder_get_object(builder, "current_max_ap_entry"));
    character_fields->true_max_hp_entry = GTK_WIDGET(gtk_builder_get_object(builder, "true_max_hp_entry"));
    character_fields->true_max_ap_entry = GTK_WIDGET(gtk_builder_get_object(builder, "true_max_ap_entry"));
    character_fields->base_pwr_entry = GTK_WIDGET(gtk_builder_get_object(builder, "base_pwr_entry"));
    character_fields->base_def_entry = GTK_WIDGET(gtk_builder_get_object(builder, "base_def_entry"));
    character_fields->base_agl_entry = GTK_WIDGET(gtk_builder_get_object(builder, "base_agl_entry"));
    character_fields->base_int_entry = GTK_WIDGET(gtk_builder_get_object(builder, "base_int_entry"));
    character_fields->willpower_entry = GTK_WIDGET(gtk_builder_get_object(builder, "willpower_entry"));
    character_fields->surprise_entry = GTK_WIDGET(gtk_builder_get_object(builder, "surprise_entry"));
    character_fields->critical_entry = GTK_WIDGET(gtk_builder_get_object(builder, "critical_entry"));
    character_fields->dodge_entry = GTK_WIDGET(gtk_builder_get_object(builder, "dodge_entry"));

    char *resistances[20] = {"fire_combo_box", "ice_combo_box", "electric_combo_box"
                             "earth_combo_box", "wind_combo_box", "holy_combo_box"
                             "psionic_combo_box", "status_combo_box", "death_combo_box"};

    for (int i = 0; i < 9; i++)
        character_fields->resistance_combo_boxes[i] = GTK_WIDGET(gtk_builder_get_object(builder, resistances[i]));
}