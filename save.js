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
        for (let j = 0; j < 5; j++)
            byte_array[base_address + j] = buffer[j];

        byte_array[base_address + 6] = byte_safety(slot.characters[i].lvl, 1);
        buffer = to_little_endian(slot.characters[i].exp, 4);
        for (let j = 0; j < 4; j++)
            byte_array[base_address + 8 + j] = buffer[j];

        buffer = to_little_endian(slot.characters[i].chp, 2);
        buffer = buffer.concat(to_little_endian(slot.characters[i].cap, 2));
        for (let j = 0; j < 4; j++)
            byte_array[base_address + 20 + j] = buffer[j];

        buffer = to_little_endian(slot.characters[i].cmhp, 2);
        buffer = buffer.concat(to_little_endian(slot.characters[i].cmap, 2));
        for (let j = 0; j < 4; j++)
            byte_array[base_address + 28 + j] = buffer[j];

        buffer = to_little_endian(slot.characters[i].tmhp, 2);
        buffer =buffer.concat(to_little_endian(slot.characters[i].tmap, 2));
        for (let j = 0; j < 4; j++)
            byte_array[base_address + 60 + j] = buffer[j];

        buffer = to_little_endian(slot.characters[i].pwr, 2);
        buffer = buffer.concat(to_little_endian(slot.characters[i].def, 2));
        buffer = buffer.concat(to_little_endian(slot.characters[i].agl, 2));
        buffer = buffer.concat(to_little_endian(slot.characters[i].int, 2));
        for (let j = 0; j < 8; j++)
            byte_array[base_address + 64 + j] = buffer[j];

        byte_array[base_address + 74] = byte_safety(slot.characters[i].wpwr);
        byte_array[base_address + 25] = byte_safety(slot.characters[i].fatg);

        buffer = [slot.characters[i].sprs, slot.characters[i].rprs, slot.characters[i].crit, slot.characters[i].dodg, slot.characters[i].hits];

        for (let j = 0; j < 5; j++)
            byte_array[base_address + 84 + j] = byte_safety(buffer[i]);

        for (let j = 0; j < 9; j++)
            byte_array[base_address + 75 + j] = byte_safety(slot.characters[i].resistances[j]);
    }
}