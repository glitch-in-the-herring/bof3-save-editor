#include "utils.h"

uint32_t from_little_endian(unsigned char *memory_card, int start, int length)
{
    uint32_t result = 0;

    for (int i = length - 1; i >= 0; i--)
        result = memory_card[start + i] << i * 8 | result;

    return result;
}

uint8_t *to_uint16_little_endian(uint16_t value)
{
    uint8_t *result = g_new(uint8_t, 2);

    for (int i = 0; i < 2; i++)
    {
        result[i] = (value & (0xff << i * 8)) >> i * 8;
    }

    return result;
}

uint8_t *to_uint32_little_endian(uint32_t value)
{
    uint8_t *result = g_new(uint8_t, 4);

    for (int i = 0; i < 4; i++)
    {
        result[i] = (value & (0xff << i * 8)) >> i * 8;
    }

    return result;
}

void generate_checksum(GFileIOStream *file_stream, int start)
{
    uint16_t sum = 0;
    uint16_t buffer;
    uint8_t *checksum = to_uint16_little_endian(0x0000);
    GInputStream *input_stream = g_io_stream_get_input_stream(G_IO_STREAM(file_stream));
    GOutputStream *output_stream = g_io_stream_get_output_stream(G_IO_STREAM(file_stream));

    g_seekable_seek(G_SEEKABLE(output_stream), start + 0x270, G_SEEK_SET, NULL, NULL);
    g_output_stream_write(G_OUTPUT_STREAM(output_stream), checksum, 2, NULL, NULL);
    g_free(checksum);

    for (int i = 0; i < 0x1e00; i++)
    {
        g_seekable_seek(G_SEEKABLE(input_stream), start + 0x200 + i, G_SEEK_SET, NULL, NULL);
        g_input_stream_read(G_INPUT_STREAM(input_stream), &buffer, 1, NULL, NULL);
        sum += buffer;
    }

    checksum = to_uint16_little_endian(sum);
    g_seekable_seek(G_SEEKABLE(output_stream), start + 0x270, G_SEEK_SET, NULL, NULL);
    g_output_stream_write(G_OUTPUT_STREAM(output_stream), checksum, 2, NULL, NULL);
    g_free(checksum);
}
