function save_file(byte_array, slots, filename)
{
    for (let i = 0; i < slots.length; i++)
    {
        save_character_data(byte_array, slots[i]);
    }

    let output_file = new File([byte_array], filename);
    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(output_file);
    link.download = filename;
    link.click();
}

function save_character_data(byte_array, slot)
{
    let buffer;
    let base_address;
    for (let i = 0; i < 8; i++)
    {
        base_address = slot.address + 0x290 + 0xa4 * i;
        buffer = ascii_encoder(slot.characters[i].name);
        console.log(buffer);
        for (let j = 0; j < 5; j++)
            byte_array[base_address + j] = buffer[j];

        byte_array[base_address + 6] = byte_safety(Number(slot.characters[i].lvl), 1);
        buffer = to_little_endian(slot.characters[i].exp, 4);

        for (let j = 0; j < 4; j++)
            byte_array[base_address + 8 + j] = buffer[j];
    }
}