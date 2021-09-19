#include <gtk/gtk.h>
#include "character.h"
#include "../utils/utils.h"

struct CharacterData *get_character_data(unsigned char *memory_card, int order, int start)
{
    if (order > 8)
        return NULL;
    
    struct CharacterData *character_data = g_new(struct CharacterData, 1);
    
    for(int i = 0; i < 5; i++)
    {
        character_data->name[i] = memory_card[start + 0x290 + 0xA4 * order + i];

        if (character_data->name[i] == '\0')
            break;            
    }
    character_data->name[5] = '\0';

    character_data->level = memory_card[start + 0x290 + 0xA4 * order + 6];
    character_data->exp = convert_little_endian(memory_card, start + 0x290 + 0xA4 * order + 8, 4);
    character_data->current_hp = convert_little_endian(memory_card, start + 0x290 + 0xA4 * order + 20, 2);
    character_data->current_ap = convert_little_endian(memory_card, start + 0x290 + 0xA4 * order + 22, 2);
    character_data->current_max_hp = convert_little_endian(memory_card, start + 0x290 + 0xA4 * order + 28, 2);
    character_data->current_max_ap = convert_little_endian(memory_card, start + 0x290 + 0xA4 * order + 30, 2);
    character_data->true_max_hp = convert_little_endian(memory_card, start + 0x290 + 0xA4 * order + 60, 2);
    character_data->true_max_ap = convert_little_endian(memory_card, start + 0x290 + 0xA4 * order + 62, 2);
    character_data->base_pwr = convert_little_endian(memory_card, start + 0x290 + 0xA4 * order + 64, 2);
    character_data->base_def = convert_little_endian(memory_card, start + 0x290 + 0xA4 * order + 66, 2);
    character_data->base_agl = convert_little_endian(memory_card, start + 0x290 + 0xA4 * order + 68, 2);
    character_data->base_int = convert_little_endian(memory_card, start + 0x290 + 0xA4 * order + 70, 2);
    character_data->willpower = memory_card[start + 0x290 + 0xA4 * order + 42];
    character_data->surprise = memory_card[start + 0x290 + 0xA4 * order + 52];
    character_data->reprisal = memory_card[start + 0x290 + 0xA4 * order + 53];
    character_data->critical = memory_card[start + 0x290 + 0xA4 * order + 54];
    character_data->dodge = memory_card[start + 0x290 + 0xA4 * order + 55];
    character_data->to_hit = memory_card[start + 0x290 + 0xA4 * order + 56];

    for (int i = 0; i < 9; i++)
    {
        character_data->resistances[i] =  memory_card[start + 0x290 + 0xA4 * order + 43 + i];
    }

    return character_data;
}
