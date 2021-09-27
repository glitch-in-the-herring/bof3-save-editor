#include "memcard_writer.h"

void save_character(GOutputStream *stream, struct SaveSlot *save_slot)
{
    int base_address = save_slot->address + 0x290;
    int uint8_offsets[8] = {6, 74, 84, 85, 86, 87, 88, 25};
    int uint16_offsets[10] = {20, 22, 28, 30, 60, 62, 64, 66, 68, 70};
    uint8_t *buffer;

    for (int i = 0; i < 8; i++)
    {
        g_seekable_seek(G_SEEKABLE(stream), base_address + 0xA4 * i, G_SEEK_SET, NULL, NULL);
        g_output_stream_write(G_OUTPUT_STREAM(stream), save_slot->character_data[i]->name, 5, NULL, NULL);

        for (int j = 0; j < 8; j++)
        {
            g_seekable_seek(G_SEEKABLE(stream), base_address + 0xA4 * i + uint8_offsets[j], G_SEEK_SET, NULL, NULL);
            g_output_stream_write(G_OUTPUT_STREAM(stream), save_slot->character_data[i]->uint8_array + j, 1, NULL, NULL);
        }

        buffer = to_uint32_little_endian(save_slot->character_data[i]->exp);
        g_seekable_seek(G_SEEKABLE(stream), base_address + 0xA4 * i + 8, G_SEEK_SET, NULL, NULL);
        g_output_stream_write(G_OUTPUT_STREAM(stream), buffer, 4, NULL, NULL);
        g_free(buffer);

        for (int j = 0; j < 10; j++)
        {
            buffer = to_uint16_little_endian(save_slot->character_data[i]->uint16_array[j]);
            g_seekable_seek(G_SEEKABLE(stream), base_address + 0xA4 * i + uint16_offsets[j], G_SEEK_SET, NULL, NULL);
            g_output_stream_write(G_OUTPUT_STREAM(stream), buffer, 2, NULL, NULL);
            g_free(buffer);
        }

        for (int j = 0; j < 9; j++)
        {
            g_seekable_seek(G_SEEKABLE(stream), base_address + 0xA4 * i + 75 + j, G_SEEK_SET, NULL, NULL);
            g_output_stream_write(G_OUTPUT_STREAM(stream), save_slot->character_data[i]->resistances + j, 1, NULL, NULL);
        }

        for (int j = 0; j < 6; j++)
        {
            g_seekable_seek(G_SEEKABLE(stream), base_address + 0xA4 * i + 14 + j, G_SEEK_SET, NULL, NULL);
            g_output_stream_write(G_OUTPUT_STREAM(stream), save_slot->character_data[i]->equipment + j, 1, NULL, NULL);
        }        
    }
}

void save_card(GtkWidget *widget, gpointer data)
{
    struct CardStream *card_stream = data;
    struct SlotPage *slot_page = card_stream->slot_page;
    GFileIOStream *file_stream = card_stream->file_stream;
    GOutputStream *output_stream = g_io_stream_get_output_stream(G_IO_STREAM(card_stream->file_stream));

    for (int i = 0; i < slot_page->save_slot_count; i++)
    {
        save_character(output_stream, slot_page->save_slots[i]);
        generate_checksum(file_stream, slot_page->save_slots[i]->address);
    }
}
