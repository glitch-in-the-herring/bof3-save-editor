#ifndef MEMCARD
#define MEMCARD

int validate_memory_card(unsigned char *memory_card);
int browse_toc(unsigned char *memory_card);
int check_toc_entry(unsigned char *memory_card, int toc_address);

#endif
