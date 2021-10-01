#include "inventory.h"

struct InventoryData *get_inventory_data(unsigned char *memory_card, int start)
{
    struct InventoryData *inventory_data = g_new(struct InventoryData, 1);
    int id_base_address = start + 0x974;
    int count_base_address = start + 0xB74;
    int vitals_base_address = start + 0xD74;

    for (int i = 0; i < 4; i++)
    {
        for (int j = 0; j < 128; j++)
        {
            inventory_data->item_ids[i][j] = memory_card[id_base_address + 128 * i + j];
            inventory_data->item_counts[i][j] = memory_card[count_base_address + 128 * i + j];
        }
    }

    for (int i = 0; i < 32; i++)
        inventory_data->vital_item_ids[i] = memory_card[vitals_base_address + i];    

    return inventory_data;
}
