#ifndef CHARACTER_PAGE
#define CHARACTER_PAGE

#include <gtk/gtk.h>
#include <stdio.h>
#include "maingui.h"
#include "../data/character.h"

void assign_character_fields(struct CharacterFields *character_fields, GtkBuilder *builder);
void enable_character_fields(struct CharacterFields *character_fields);
void load_character_names(struct CharacterDataFields *character_data_fields);
void load_character_fields(struct CharacterDataFields *character_data_fields, int order);

#endif