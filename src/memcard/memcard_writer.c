#include "writer.h"

void save_character(GOutputStream *stream, SaveSlot *save_slot)
{
    int base_address = save_slot->address + 0x290;
    for (int i = 0; i < 8; i++)
    {
        g_seekable_seek(G_SEEKABLE(stream), base_address + 0x4A* i, G_SEEK_SET);
        g_output_stream_write(G_OUTPUT_STREAM(GOutputStream), save_slot->character_data[i]->name, 5, NULL, NULL);
    }
}

void save_card(GtkWidget *widget, gpointer data)
{
    struct CardStream *card_stream = data;
    struct SlotPage *slot_page = card_stream->slot_page;

    for (int i = 0; i < slot_page->save_slot_count; i++)
    {
        save_character(card_stream->output_stream, slot_page->save_slots[i]);
    }
}