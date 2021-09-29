#include "save_slot.h"

void get_save_slot_name(unsigned char *memory_card, char *target, int start)
{
    for (int i = 0; i < 5; i++)
    {
        target[i] = memory_card[start + 0xEA0 + i];
    }

    target[5] = '\0';
}
