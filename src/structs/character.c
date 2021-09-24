#include <gtk/gtk.h>
#include "character.h"
#include "../utils/utils.h"

struct CharacterData *get_character_data(unsigned char *memory_card, int order, int start)
{
    if (order > 8)
        return NULL;
    
    int character_offset = start + 0x290 + 0xA4 * order;
    struct CharacterData *character_data = g_new(struct CharacterData, 1);
    
    for(int i = 0; i < 5; i++)
    {
        character_data->name[i] = memory_card[start + 0x290 + 0xA4 * order + i];

        if (character_data->name[i] == '\0')
            break;
    }

    character_data->name[5] = '\0';

    int uint8_offsets[8] = {6, 42, 52, 53, 54, 55, 56, 25};
    int uint16_offsets[10] = {20, 22, 28, 30, 60, 62, 64, 66, 68, 70};

    for (int i = 0; i < 8; i++)
    {
        character_data->uint8_array[i] = memory_card[character_offset + uint8_offsets[i]];
    }
    
    for (int i = 0; i < 10; i++)
    {
        character_data->uint16_array[i] = convert_little_endian(memory_card, character_offset + uint16_offsets[i], 2);        
    }

    character_data->exp = convert_little_endian(memory_card, start + 0x290 + 0xA4 * order + 8, 4);

    for (int i = 0; i < 9; i++)
    {
        character_data->resistances[i] =  memory_card[start + 0x290 + 0xA4 * order + 43 + i];
    }

    return character_data;
}
