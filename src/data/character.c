#include "character.h"

char *get_character_name(unsigned char *memory_card, int order, int start)
{
    if (order > 8)
        return "";
    
    char *character_name = g_new(char, 6);
    
    for(int i = 0; i < 5; i++)
    {
        character_name[i] = memory_card[i + start + 0x290 + 0xA4 * order];
        if (character_name[i] == '\0')
            return character_name;            
    }
    
    character_name[5] = '\0';
    return character_name;
}

CharacterData *get_character_data(unsigned char *memory_card, int order, int start)
{
    if (order > 8)
        return NULL;
    
    CharacterData *character_data = g_new(CharacterData, 1);
    
    character_data->lvl = memory_card[start + 0x290 + 0xA4 * order + 6];
    
    return character_data;
}

