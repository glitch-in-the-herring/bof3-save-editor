#ifndef MEMCARD
#define MEMCARD

#include <gtk/gtk.h>

int validate_memory_card(unsigned char *memory_card);
int browse_toc(unsigned char *memory_card);

#endif
