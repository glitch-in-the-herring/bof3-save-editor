#include "utils.h"

uint32_t from_little_endian(unsigned char *memory_card, int start, int length)
{
    uint32_t result = 0;

    for (int i = length - 1; i >= 0; i--)
        result = memory_card[start + i] << i * 8 | result;

    return result;
}

uint8_t *to_uint16_little_endian(uint16_t value)
{
    uint8 *result = g_new(uint8_t, 2);

    for (int i = 0; i < 2; i++)
    {
        result[i] = (value & (0xff << i * 8)) >> i * 8;
    }

    return result;
}

uint8_t *to_uint32_little_endian(uint32_t value)
{
    uint8 *result = g_new(uint8_t, 4);

    for (int i = 0; i < 4; i++)
    {
        result[i] = (value & (0xff << i * 8)) >> i * 8;
    }

    return result;
}
