#include <gtk/gtk.h>
#include "character.h"
#include "../utils/utils.h"

struct CharacterData *get_character_data(unsigned char *memory_card, int order, int start)
{
    if (order > 8)
        return NULL;
    
    int base_address = start + 0x290 + 0xA4 * order;
    struct CharacterData *character_data = g_new(struct CharacterData, 1);
    
    for(int i = 0; i < 5; i++)
    {
        character_data->name[i] = memory_card[start + 0x290 + 0xA4 * order + i];
    }

    character_data->name[5] = '\0';

    int uint8_offsets[8] = {6, 74, 84, 85, 86, 87, 88, 25};
    int uint16_offsets[10] = {20, 22, 28, 30, 60, 62, 64, 66, 68, 70};

    for (int i = 0; i < 8; i++)
        character_data->uint8_array[i] = memory_card[base_address + uint8_offsets[i]];
    
    for (int i = 0; i < 10; i++)
        character_data->uint16_array[i] = from_little_endian(memory_card, base_address + uint16_offsets[i], 2);

    character_data->exp = from_little_endian(memory_card, base_address + 8, 4);

    for (int i = 0; i < 9; i++)
        character_data->resistances[i] =  memory_card[base_address + 75 + i];

    for (int i = 0; i < 6; i++)
        character_data->equipment[i] =  memory_card[base_address + 14 + i];

    for (int i = 0; i < 4; i++)
    {
        for (int j = 0; j < 10; j++)
        {
            character_data->abilities[i][j] = memory_card[base_address + 92 + i * 10 + j];
        }
    }

    return character_data;
}
