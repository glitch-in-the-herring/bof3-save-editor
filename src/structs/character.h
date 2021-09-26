#ifndef CHARACTER_STRUCT
#define CHARACTER_STRUCT

#include <stdint.h>

/* uint8 array:
 * level        0
 * willpower    1
 * surprise     2
 * reprisal     3
 * critical     4
 * dodge        5
 * to_hit       6
 * fatigue      7 
 */

/* uint16 array:
 * current_hp       0
 * current_ap       1
 * current_max_hp   2
 * current_max_ap   3
 * true_max_hp      4
 * true_max_ap      5
 * base_pwr         6
 * base_def         7
 * base_agl         8
 * base_int         9
 */

struct CharacterData
{
    char name[6];
    uint8_t uint8_array[8];
    uint16_t uint16_array[10];
    uint32_t exp;
    uint8_t resistances[9];
};

struct CharacterData *get_character_data(unsigned char *memory_card, int order, int start);

#endif
