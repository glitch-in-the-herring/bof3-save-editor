#include <stdio.h>
#include "utils.h"

uint32_t convert_little_endian(unsigned char *memory_card, int start, int length)
{
    uint32_t result = 0;

    for (int i = length - 1; i >= 0; i--)
        result = memory_card[start + i] << 8 * i | result;

    return result;
}
