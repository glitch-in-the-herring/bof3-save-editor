#include "utils.h"

uint32_t convert_little_endian(unsigned char *memory_card, int start, int length)
{
    uint32_t result = 0;

    for (int i = start + length - 1; i >= start; i--)
        result = memory_card[i] << 8 * i | result;

    return result;
}