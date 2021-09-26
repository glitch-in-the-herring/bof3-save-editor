#include "memcard_writer.h"

void save_character(GOutputStream *stream, struct SaveSlot *save_slot)
{
    int base_address = save_slot->address + 0x290;
    for (int i = 0; i < 8; i++)
    {
        g_seekable_seek(G_SEEKABLE(stream), base_address + 0x4A* i, G_SEEK_SET, NULL, NULL);
        g_output_stream_write(G_OUTPUT_STREAM(stream), save_slot->character_data[i]->name, 5, NULL, NULL);
    }
}

void save_card(GtkWidget *widget, gpointer data)
{
    struct CardStream *card_stream = data;
    struct SlotPage *slot_page = card_stream->slot_page;
    GOutputStream *output_stream = g_io_stream_get_output_stream(G_IO_STREAM(card_stream->file_stream));

    for (int i = 0; i < slot_page->save_slot_count; i++)
    {
        save_character(output_stream, slot_page->save_slots[i]);
    }
}