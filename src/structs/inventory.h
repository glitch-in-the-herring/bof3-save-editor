#ifndef INVENTORY
#define INVENTORY

#include <stdint.h>

/* item_ids/item_counts:
 * item     0
 * weapon   1
 * armor    2
 * option   3
 */

struct InventoryData
{
    uint8_t item_ids[4][128];
    uint8_t item_counts[4][128];
};

struct VitalItemsData
{
    uint8_t item_ids[32];
};

struct SkillNotesData
{
    uint8_t skill_ids[128];
};

struct InventoryData *get_inventory_data(unsigned char *memory_card, int start);

#endif
