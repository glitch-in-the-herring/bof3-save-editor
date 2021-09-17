#include <gtk/gtk.h>

int validate_memory_card(unsigned char *memory_card);
int browse_toc(unsigned char *memory_card);
char *get_character_name(unsigned char *memory_card, int order, int start);
