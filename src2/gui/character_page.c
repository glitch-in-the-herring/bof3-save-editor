#include <gtk/gtk.h>
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

    //for (int i = 0; i < 9; i++)
    //    character_fields->resistance_combo_boxes[i] = GTK_WIDGET(gtk_builder_get_object(builder, resistances[i]));
}

void load_character_names(struct CharacterDataFields *character_data_fields)
{
    gtk_combo_box_text_remove_all(GTK_COMBO_BOX_TEXT(character_data_fields->character_fields->character_combo_box));
    for (int i = 0; i < 8; i++)
        gtk_combo_box_text_append(GTK_COMBO_BOX_TEXT(character_data_fields->character_fields->character_combo_box), NULL, 
                                  (character_data_fields->character_data[i])->name);
    gtk_combo_box_set_active(GTK_COMBO_BOX(character_data_fields->character_fields->character_combo_box), 0);
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
    g_object_set(character_fields->to_hit_entry, "sensitive", TRUE, NULL);

    //for (int i = 0; i < 9; i++)
    //    g_object_set(character_fields->resistance_combo_boxes[i], "sensitive", TRUE, NULL);
}

void load_character_fields(GtkWidget *widget, gpointer data)
{
    char buffer[16];
    struct CharacterDataFields *character_data_fields = data;
    int order = gtk_combo_box_get_active(GTK_COMBO_BOX(widget));

    sprintf(buffer, "%i", (character_data_fields->character_data[order])->level);
    gtk_editable_set_text(GTK_EDITABLE(character_data_fields->character_fields->level_entry), buffer);
    sprintf(buffer, "%u", (character_data_fields->character_data[order])->exp);
    gtk_editable_set_text(GTK_EDITABLE(character_data_fields->character_fields->exp_entry), buffer);
    sprintf(buffer, "%i", (character_data_fields->character_data[order])->current_hp);
    gtk_editable_set_text(GTK_EDITABLE(character_data_fields->character_fields->current_hp_entry), buffer);
    sprintf(buffer, "%i", (character_data_fields->character_data[order])->current_ap);
    gtk_editable_set_text(GTK_EDITABLE(character_data_fields->character_fields->current_ap_entry), buffer);
    sprintf(buffer, "%i", (character_data_fields->character_data[order])->current_max_hp)  ;  
    gtk_editable_set_text(GTK_EDITABLE(character_data_fields->character_fields->current_max_hp_entry), buffer);
    sprintf(buffer, "%i", (character_data_fields->character_data[order])->current_max_ap);
    gtk_editable_set_text(GTK_EDITABLE(character_data_fields->character_fields->current_max_ap_entry), buffer);
    sprintf(buffer, "%u", (character_data_fields->character_data[order])->true_max_hp);
    gtk_editable_set_text(GTK_EDITABLE(character_data_fields->character_fields->true_max_hp_entry), buffer);
    sprintf(buffer, "%i", (character_data_fields->character_data[order])->true_max_ap);
    gtk_editable_set_text(GTK_EDITABLE(character_data_fields->character_fields->true_max_ap_entry), buffer);
    sprintf(buffer, "%i", (character_data_fields->character_data[order])->base_pwr);
    gtk_editable_set_text(GTK_EDITABLE(character_data_fields->character_fields->base_pwr_entry), buffer);
    sprintf(buffer, "%i", (character_data_fields->character_data[order])->base_def);
    gtk_editable_set_text(GTK_EDITABLE(character_data_fields->character_fields->base_def_entry), buffer);
    sprintf(buffer, "%i", (character_data_fields->character_data[order])->base_agl);
    gtk_editable_set_text(GTK_EDITABLE(character_data_fields->character_fields->base_agl_entry), buffer);
    sprintf(buffer, "%i", (character_data_fields->character_data[order])->base_int);
    gtk_editable_set_text(GTK_EDITABLE(character_data_fields->character_fields->base_int_entry), buffer);
    sprintf(buffer, "%i", (character_data_fields->character_data[order])->willpower);
    gtk_editable_set_text(GTK_EDITABLE(character_data_fields->character_fields->willpower_entry), buffer);
    sprintf(buffer, "%i", (character_data_fields->character_data[order])->surprise);
    gtk_editable_set_text(GTK_EDITABLE(character_data_fields->character_fields->surprise_entry), buffer);
    sprintf(buffer, "%i", (character_data_fields->character_data[order])->reprisal);
    gtk_editable_set_text(GTK_EDITABLE(character_data_fields->character_fields->reprisal_entry), buffer);
    sprintf(buffer, "%i", (character_data_fields->character_data[order])->critical);
    gtk_editable_set_text(GTK_EDITABLE(character_data_fields->character_fields->critical_entry), buffer);
    sprintf(buffer, "%i", (character_data_fields->character_data[order])->dodge);
    gtk_editable_set_text(GTK_EDITABLE(character_data_fields->character_fields->dodge_entry), buffer);
    sprintf(buffer, "%i", (character_data_fields->character_data[order])->to_hit);
    gtk_editable_set_text(GTK_EDITABLE(character_data_fields->character_fields->to_hit_entry), buffer);
}
