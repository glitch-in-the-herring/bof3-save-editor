#include "inventory.h"

struct InventoryData *get_inventory_data(unsigned char *memory_card, int start)
{
    struct InventoryData *inventory_data = g_new(struct InventoryData, 1);
    int id_base_address = start + 0x974;
    int count_base_address = start + 0xB74;

    for (int i = 0; i < 4; i++)
    {
        for (int j = 0; j < 128; j++)
        {
            inventory_data->item_ids[i][j] = memory_card[id_base_address + 128 * i + j];
            inventory_data->item_counts[i][j] = memory_card[count_base_address + 128 * i + j];
        }
    }

    return inventory_data;
}
