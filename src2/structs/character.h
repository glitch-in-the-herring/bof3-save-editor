#ifndef CHARACTER_STRUCT
#define CHARACTER_STRUCT

#include <stdint.h>

struct CharacterData
{
    char name[6];
    uint8_t level;
    uint32_t exp;
    uint16_t current_hp;
    uint16_t current_ap;
    uint16_t current_max_hp;
    uint16_t current_max_ap;
    uint16_t true_max_hp;
    uint16_t true_max_ap;
    uint16_t base_pwr;
    uint16_t base_def;
    uint16_t base_agl;
    uint16_t base_int;
    uint8_t willpower;
    uint8_t surprise;
    uint8_t reprisal;
    uint8_t critical;
    uint8_t dodge;
    uint8_t to_hit;
    uint8_t resistances[9];
};

struct CharacterData *get_character_data(unsigned char *memory_card, int order, int start);

#endif
