#include "memcard_writer.h"
#include "../gui/dialog_window.h"

void save_slot_name(GOutputStream *stream, struct SaveSlot *save_slot)
{
    g_seekable_seek(G_SEEKABLE(stream), save_slot->address + 0xEA0, G_SEEK_SET, NULL, NULL);
    g_output_stream_write(G_OUTPUT_STREAM(stream), save_slot->name, 5, NULL, NULL);
}

void save_character(GOutputStream *stream, struct SaveSlot *save_slot)
{
    int base_address;
    int uint8_offsets[8] = {6, 74, 84, 85, 86, 87, 88, 25};
    int uint16_offsets[10] = {20, 22, 28, 30, 60, 62, 64, 66, 68, 70};
    uint8_t *buffer;

    for (int i = 0; i < 8; i++)
    {
        base_address = save_slot->address + 0x290 + 0xA4 * i;
        g_seekable_seek(G_SEEKABLE(stream), base_address, G_SEEK_SET, NULL, NULL);
        g_output_stream_write(G_OUTPUT_STREAM(stream), save_slot->character_data[i]->name, 5, NULL, NULL);

        for (int j = 0; j < 8; j++)
        {
            g_seekable_seek(G_SEEKABLE(stream), base_address + uint8_offsets[j], G_SEEK_SET, NULL, NULL);
            g_output_stream_write(G_OUTPUT_STREAM(stream), save_slot->character_data[i]->uint8_array + j, 1, NULL, NULL);
        }

        buffer = to_uint32_little_endian(save_slot->character_data[i]->exp);
        g_seekable_seek(G_SEEKABLE(stream), base_address + 8, G_SEEK_SET, NULL, NULL);
        g_output_stream_write(G_OUTPUT_STREAM(stream), buffer, 4, NULL, NULL);
        g_free(buffer);

        for (int j = 0; j < 10; j++)
        {
            buffer = to_uint16_little_endian(save_slot->character_data[i]->uint16_array[j]);
            g_seekable_seek(G_SEEKABLE(stream), base_address + uint16_offsets[j], G_SEEK_SET, NULL, NULL);
            g_output_stream_write(G_OUTPUT_STREAM(stream), buffer, 2, NULL, NULL);
            g_free(buffer);
        }

        for (int j = 0; j < 9; j++)
        {
            g_seekable_seek(G_SEEKABLE(stream), base_address + 75 + j, G_SEEK_SET, NULL, NULL);
            g_output_stream_write(G_OUTPUT_STREAM(stream), save_slot->character_data[i]->resistances + j, 1, NULL, NULL);
        }

        for (int j = 0; j < 6; j++)
        {
            g_seekable_seek(G_SEEKABLE(stream), base_address + 14 + j, G_SEEK_SET, NULL, NULL);
            g_output_stream_write(G_OUTPUT_STREAM(stream), save_slot->character_data[i]->equipment + j, 1, NULL, NULL);
        }

        for (int j = 0; j < 4; j++)
        {
            for (int k = 0; k < 10; k++)
            {
                g_seekable_seek(G_SEEKABLE(stream), base_address + 92 + j * 10 + k, G_SEEK_SET, NULL, NULL);
                g_output_stream_write(G_OUTPUT_STREAM(stream), save_slot->character_data[i]->abilities[j] + k, 1, NULL, NULL);
            }
        }        
    }
}

void save_inventory(GOutputStream *stream, struct SaveSlot *save_slot)
{
    int id_base_address = save_slot->address + 0x974;
    int count_base_address = save_slot->address + 0xB74;

    for (int i = 0; i < 4; i++)
    {
        for (int j = 0; j < 128; j++)
        {
            g_seekable_seek(G_SEEKABLE(stream), id_base_address + 128 * i + j, G_SEEK_SET, NULL, NULL);
            g_output_stream_write(G_OUTPUT_STREAM(stream), save_slot->inventory_data->item_ids[i] + j, 1, NULL, NULL);
            g_seekable_seek(G_SEEKABLE(stream), count_base_address + 128 * i + j, G_SEEK_SET, NULL, NULL);
            g_output_stream_write(G_OUTPUT_STREAM(stream), save_slot->inventory_data->item_counts[i] + j, 1, NULL, NULL);
        }
    }
}

void save_card(GtkWidget *widget, gpointer data)
{
    struct CardStream *card_stream = data;
    struct SlotPage *slot_page = card_stream->slot_page;
    GtkWidget *message_dialog = assert_message(GTK_WINDOW(card_stream->app_window), "Saving...");
    GFileIOStream *file_stream = card_stream->file_stream;
    GOutputStream *output_stream = g_io_stream_get_output_stream(G_IO_STREAM(card_stream->file_stream));

    gtk_widget_show(message_dialog);

    for (int i = 0; i < slot_page->save_slot_count; i++)
    {
        save_slot_name(output_stream, slot_page->save_slots[i]);
        save_character(output_stream, slot_page->save_slots[i]);
        save_inventory(output_stream, slot_page->save_slots[i]);
        generate_checksum(file_stream, slot_page->save_slots[i]->address);
    }

    gtk_widget_destroy(message_dialog);
}
