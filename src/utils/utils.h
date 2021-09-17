#include <gtk/gtk.h>
#include "../data/character.h"

typedef struct
{
    int lvl;
}
CharacterData;

int validate_memory_card(unsigned char *memory_card);
int browse_toc(unsigned char *memory_card);
char *get_character_name(unsigned char *memory_card, int order, int start);

CharacterData *get_character_data(unsigned char *memory_card, int order, int start);
