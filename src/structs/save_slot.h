#ifndef SAVE_SLOT
#define SAVE_SLOT

#include "character.h"

struct SaveSlot
{
    int address;
    //char name[6];
    struct CharacterData **character_data;
    //struct InventoryData **inventory_data;
};

#endif
