#ifndef UTILS
#define UTILS

#include <stdint.h>
#include <gtk/gtk.h>

uint32_t from_little_endian(unsigned char *memory_card, int start, int length);
uint8_t *to_uint16_little_endian(uint16_t value);
uint8_t *to_uint32_little_endian(uint32_t value);

#endif
