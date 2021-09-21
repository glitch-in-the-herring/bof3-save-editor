#include "character_page.h"

void assign_character_fields(struct CharacterFields *character_fields, GtkBuilder *builder)
{
    character_fields->character_combo_box = GTK_WIDGET(gtk_builder_get_object(builder, "character_combo_box"));
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
    character_fields->reprisal_entry = GTK_WIDGET(gtk_builder_get_object(builder, "reprisal_entry"));
    character_fields->critical_entry = GTK_WIDGET(gtk_builder_get_object(builder, "critical_entry"));
    character_fields->dodge_entry = GTK_WIDGET(gtk_builder_get_object(builder, "dodge_entry"));
    character_fields->to_hit_entry = GTK_WIDGET(gtk_builder_get_object(builder, "to_hit_entry"));

    char *resistances[20] = {"fire_combo_box", "ice_combo_box", "electric_combo_box"
                             "earth_combo_box", "wind_combo_box", "holy_combo_box"
                             "psionic_combo_box", "status_combo_box", "death_combo_box"};

    for (int i = 0; i < 9; i++)
        character_fields->resistance_combo_boxes[i] = GTK_WIDGET(gtk_builder_get_object(builder, resistances[i]));
}

void enable_character_fields(struct CharacterFields *character_fields)
{
    g_object_set(character_fields->character_combo_box, "sensitive", TRUE, NULL);
    g_object_set(character_fields->name_entry, "sensitive", TRUE, NULL);
    g_object_set(character_fields->level_entry, "sensitive", TRUE, NULL);
    g_object_set(character_fields->exp_entry, "sensitive", TRUE, NULL);
    g_object_set(character_fields->current_hp_entry, "sensitive", TRUE, NULL);
    g_object_set(character_fields->current_ap_entry, "sensitive", TRUE, NULL);
    g_object_set(character_fields->current_max_hp_entry, "sensitive", TRUE, NULL);
    g_object_set(character_fields->current_max_ap_entry, "sensitive", TRUE, NULL);
    g_object_set(character_fields->true_max_hp_entry, "sensitive", TRUE, NULL);
    g_object_set(character_fields->true_max_ap_entry, "sensitive", TRUE, NULL);
    g_object_set(character_fields->base_pwr_entry, "sensitive", TRUE, NULL);
    g_object_set(character_fields->base_def_entry, "sensitive", TRUE, NULL);
    g_object_set(character_fields->base_agl_entry, "sensitive", TRUE, NULL);
    g_object_set(character_fields->base_int_entry, "sensitive", TRUE, NULL);
    g_object_set(character_fields->willpower_entry, "sensitive", TRUE, NULL);
    g_object_set(character_fields->surprise_entry, "sensitive", TRUE, NULL);
    g_object_set(character_fields->reprisal_entry, "sensitive", TRUE, NULL);
    g_object_set(character_fields->critical_entry, "sensitive", TRUE, NULL);
    g_object_set(character_fields->dodge_entry, "sensitive", TRUE, NULL);

    for (int i = 0; i < 9; i++)
        g_object_set(character_fields->resistance_combo_boxes[i], "sensitive", TRUE, NULL);        
}

void load_character_names(struct CharacterDataFields *character_data_fields)
{
    for (int i = 0; i < 8; i++)
        gtk_combo_box_text_append(GTK_COMBO_BOX_TEXT(character_data_fields->character_fields->character_combo_box), NULL, 
                                  (character_data_fields->character_data[i])->name);
}

void load_character_fields(struct CharacterDataFields *character_data_fields, int order)
{
    char buffer[16];
    gtk_entry_set_text(GTK_ENTRY(character_data_fields->character_fields->level_entry),
                       sprintf(buffer, "%i", (character_data_fields->character_data[order])->level));
    gtk_entry_set_text(GTK_ENTRY(character_data_fields->character_fields->exp_entry),
                       sprintf(buffer, "%u", (character_data_fields->character_data[order])->exp));
    gtk_entry_set_text(GTK_ENTRY(character_data_fields->character_fields->current_hp_entry),
                       sprintf(buffer, "%i", (character_data_fields->character_data[order])->current_hp));
    gtk_entry_set_text(GTK_ENTRY(character_data_fields->character_fields->current_ap_entry),
                       sprintf(buffer, "%i", (character_data_fields->character_data[order])->current_ap));
    gtk_entry_set_text(GTK_ENTRY(character_data_fields->character_fields->current_max_hp_entry),
                           sprintf(buffer, "%i", (character_data_fields->character_data[order])->current_max_hp));
    gtk_entry_set_text(GTK_ENTRY(character_data_fields->character_fields->current_max_ap_entry),
                       sprintf(buffer, "%i", (character_data_fields->character_data[order])->current_max_ap));
    gtk_entry_set_text(GTK_ENTRY(character_data_fields->character_fields->true_max_hp_entry),
                       sprintf(buffer, "%u", (character_data_fields->character_data[order])->true_max_hp));
    gtk_entry_set_text(GTK_ENTRY(character_data_fields->character_fields->true_max_ap_entry),
                       sprintf(buffer, "%i", (character_data_fields->character_data[order])->true_max_ap));
    gtk_entry_set_text(GTK_ENTRY(character_data_fields->character_fields->base_pwr_entry),
                       sprintf(buffer, "%i", (character_data_fields->character_data[order])->base_pwr));
    gtk_entry_set_text(GTK_ENTRY(character_data_fields->character_fields->base_def_entry),
                           sprintf(buffer, "%i", (character_data_fields->character_data[order])->base_def));
}
