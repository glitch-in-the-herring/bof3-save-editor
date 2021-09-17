#include "utils.h"

int validate_memory_card(unsigned char *memory_card)
{
    if (memory_card[0] == 0x4D && memory_card[1] == 0x43)
        return 1;
        
    return 0;
}

int browse_toc(unsigned char *memory_card)
{
    static int toc_address = 0x00;
    toc_address += 0x80;
    
    if (toc_address > 0x780)
        return -1;
    
    if (memory_card[toc_address] != 0xA0)
        return 0x2000 * (toc_address / 0x80);
    
    return browse_toc(memory_card);
}

char *get_character_name(unsigned char *memory_card, int order, int start)
{
    if (order > 8)
        return "";
    
    char *character_name = g_new(char, 6);
    
    for(int i = 0; i < 5; i++)
    {
        character_name[i] = memory_card[i + start + 0x290 + 0xA4 * order];
        if (character_name[i] == '\0')
            return character_name;            
    }
    
    character_name[5] = '\0';
    return character_name;
}
