#ifndef SAVE_SLOT
#define SAVE_SLOT

#include "character.h"

struct SaveSlot
{
	int address;
	struct CharacterData **character_data;
}

#endif
