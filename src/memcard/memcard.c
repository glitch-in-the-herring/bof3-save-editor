#include <stdio.h>
#include "memcard.h"

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
    {
        toc_address = 0x00;
        return -1;
    }
    
    if (memory_card[toc_address] != 0xA0 && check_toc_entry(memory_card, toc_address))
        return 0x2000 * (toc_address / 0x80);

    return browse_toc(memory_card);
}

int check_toc_entry(unsigned char *memory_card, int toc_address)
{
    unsigned char code_JP[] = "SLPS-00990BOF3";
    unsigned char code_US[] = "SLUS-00422BOF3";
    unsigned char code_EU[] = "SLES-01304BOF3";

    for (int i = 0; i < 0x0E; i++)
    {
        if ((memory_card[toc_address + 0x0C + i] != code_JP[i] && 
             memory_card[toc_address + 0x0C+ i] != code_US[i]) && 
             memory_card[toc_address + 0x0C +i] != code_EU[i])
            return 0;
    }

    return 1;
}
