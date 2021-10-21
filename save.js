function save_file(e)
{
    store_character(e.target.char_e, e.target.slots[e.target.char_e.cur_slot].chars[e.target.char_e.cur_char]);
    for (let i = 0; i < e.target.slots.length; i++)
    {
        save_character_data(e.target.byte_array, e.target.slots[i]);
    }

    let output_file = new File([e.target.byte_array], e.target.filename);
    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(output_file);
    link.download = e.target.filename;
    link.click();
}

function save_character_data(byte_array, slot)
{
    let buffer;
    let base_address;
    for (let i = 0; i < 8; i++)
    {
        base_address = slot.address + 0x290 + 0xa4 * i;
        buffer = ascii_encoder(slot.chars[i].name);
        for (let j = 0; j < 5; j++)
            byte_array[base_address + j] = buffer[j];

        byte_array[base_address + 6] = byte_safety(slot.chars[i].lvl, 1);
        buffer = to_little_endian(slot.chars[i].exp, 4);
        for (let j = 0; j < 4; j++)
            byte_array[base_address + 8 + j] = buffer[j];

        buffer = to_little_endian(slot.chars[i].chp, 2);
        buffer = buffer.concat(to_little_endian(slot.chars[i].cap, 2));
        for (let j = 0; j < 4; j++)
            byte_array[base_address + 20 + j] = buffer[j];

        buffer = to_little_endian(slot.chars[i].cmhp, 2);
        buffer = buffer.concat(to_little_endian(slot.chars[i].cmap, 2));
        for (let j = 0; j < 4; j++)
            byte_array[base_address + 28 + j] = buffer[j];

        buffer = to_little_endian(slot.chars[i].tmhp, 2);
        buffer =buffer.concat(to_little_endian(slot.chars[i].tmap, 2));
        for (let j = 0; j < 4; j++)
            byte_array[base_address + 60 + j] = buffer[j];

        buffer = to_little_endian(slot.chars[i].pwr, 2);
        buffer = buffer.concat(to_little_endian(slot.chars[i].def, 2));
        buffer = buffer.concat(to_little_endian(slot.chars[i].agl, 2));
        buffer = buffer.concat(to_little_endian(slot.chars[i].int, 2));
        for (let j = 0; j < 8; j++)
            byte_array[base_address + 64 + j] = buffer[j];

        byte_array[base_address + 74] = byte_safety(slot.chars[i].wpwr);
        byte_array[base_address + 25] = byte_safety(slot.chars[i].fatg);

        buffer = [slot.chars[i].sprs, slot.chars[i].rprs, slot.chars[i].crit, slot.chars[i].dodg, slot.chars[i].hits];

        for (let j = 0; j < 5; j++)
            byte_array[base_address + 84 + j] = byte_safety(buffer[i]);

        for (let j = 0; j < 9; j++)
            byte_array[base_address + 75 + j] = byte_safety(slot.chars[i].res[j]);

        for (let j = 0; j < 6; j++)
            byte_array[base_address + 14 + j] = byte_safety(slot.chars[i].eqp[j]);

        for (let j = 0; j < 4; j++)
        {
            for (let k = 0; k < 10; k++)
                byte_array[base_address + 92 + j * 10 + k] = byte_safety(slot.chars[i].abil[j][k]); 
        }
    }
}