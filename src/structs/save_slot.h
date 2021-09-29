#ifndef SAVE_SLOT
#define SAVE_SLOT

#include "character.h"
#include "inventory.h"

struct SaveSlot
{
    int address;
    char name[6];
    struct CharacterData **character_data;
    struct InventoryData *inventory_data;
};

void get_save_slot_name(unsigned char *memory_card, char *target, int start);

#endif
