function save_file(e)
{
    store_char(e.target.char_e, e.target.slots[e.target.cur.slot].chars[e.target.cur.char]);
    store_inv(e.target.inv_e, e.target.slots[e.target.cur.slot].inv.inv[e.target.cur.inv]);
    store_vital_and_skills(e.target.inv_e, e.target.slots[e.target.cur.slot].inv);
    store_party(e.target.party_e, e.target.slots[e.target.cur.slot].party);
    for (let i = 0; i < e.target.slots.length; i++)
    {
        save_char(e.target.byte_array, e.target.slots[i]);
        save_inv(e.target.byte_array, e.target.slots[i]);
        save_fish(e.target.byte_array, e.target.slots[i]);
        save_party(e.target.byte_array, e.target.slots[i]);
        save_counter(e.target.byte_array, e.target.slots[i], e.target.counter_e);
        checksum(e.target.byte_array, e.target.slots[i].addr);
    }

    let output_file = new File([e.target.byte_array], e.target.filename);
    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(output_file);
    link.download = e.target.filename;
    link.click();
}

function checksum(byte_array, addr)
{
    let sum = 0;
    let buffer;
    byte_array[addr + 0x270] = 0;
    byte_array[addr + 0x271] = 0;

    for (let i = 0; i < 0x1e00; i++)
        sum += byte_array[addr + 0x200 + i];

    buffer = to_little_endian_u(sum, 4);
    byte_array[addr + 0x270] = buffer[0];
    byte_array[addr + 0x271] = buffer[1];
}

function save_char(byte_array, slot)
{
    let buffer;
    let base_addr;
    for (let i = 0; i < 8; i++)
    {
        base_addr = slot.addr + 0x290 + 0xa4 * i;
        buffer = ascii_encoder(slot.chars[i].name);
        for (let j = 0; j < 5; j++)
            byte_array[base_addr + j] = buffer[j];

        byte_array[base_addr + 6] = byte_safety_u(slot.chars[i].lvl, 1);
        buffer = to_little_endian_u(slot.chars[i].exp, 4);
        for (let j = 0; j < 4; j++)
            byte_array[base_addr + 8 + j] = buffer[j];

        buffer = to_little_endian_u(slot.chars[i].chp, 2);
        buffer = buffer.concat(to_little_endian_u(slot.chars[i].cap, 2));
        for (let j = 0; j < 4; j++)
            byte_array[base_addr + 20 + j] = buffer[j];

        buffer = to_little_endian_u(slot.chars[i].cmhp, 2);
        buffer = buffer.concat(to_little_endian_u(slot.chars[i].cmap, 2));
        for (let j = 0; j < 4; j++)
            byte_array[base_addr + 28 + j] = buffer[j];

        buffer = to_little_endian_u(slot.chars[i].tmhp, 2);
        buffer =buffer.concat(to_little_endian_u(slot.chars[i].tmap, 2));
        for (let j = 0; j < 4; j++)
            byte_array[base_addr + 60 + j] = buffer[j];

        buffer = to_little_endian_u(slot.chars[i].pwr, 2);
        buffer = buffer.concat(to_little_endian_u(slot.chars[i].def, 2));
        buffer = buffer.concat(to_little_endian_u(slot.chars[i].agl, 2));
        buffer = buffer.concat(to_little_endian_u(slot.chars[i].int, 2));
        for (let j = 0; j < 8; j++)
            byte_array[base_addr + 64 + j] = buffer[j];

        byte_array[base_addr + 74] = byte_safety_u(slot.chars[i].wpwr, 1);
        byte_array[base_addr + 25] = byte_safety_u(slot.chars[i].fatg, 1);
        byte_array[base_addr + 27] = byte_safety_u(slot.chars[i].master, 1);

        buffer = [slot.chars[i].sprs, slot.chars[i].rprs, slot.chars[i].crit, slot.chars[i].dodg, slot.chars[i].hits];

        for (let j = 0; j < 5; j++)
            byte_array[base_addr + 84 + j] = byte_safety_u(buffer[j], 1);

        for (let j = 0; j < 9; j++)
            byte_array[base_addr + 75 + j] = byte_safety_u(slot.chars[i].res[j], 1);

        for (let j = 0; j < 6; j++)
            byte_array[base_addr + 14 + j] = byte_safety_u(slot.chars[i].eqp[j], 1);

        for (let j = 0; j < 4; j++)
        {
            for (let k = 0; k < 10; k++)
                byte_array[base_addr + 92 + j * 10 + k] = byte_safety_u(slot.chars[i].abil[j][k], 1); 
        }

        byte_array[base_addr + 132] = slot.chars[i].sg["lvl"];

        let key = ["hp", "ap", "pwr", "def", "agl", "int"];
        for (let j = 0; j < key.length; j++)
        {
            byte_array[base_addr + 133 + j] = byte_safety_s(slot.chars[i].sg[key[j]], 1);
        }
    }
}

function save_fish(byte_array, slot)
{
    let base_addr = slot.addr + 2316;
    for (let i = 0; i < 23; i++)
        byte_array[base_addr + i] = byte_safety_u(slot.inv.fishes[i], 1);
}

function save_inv(byte_array, slot)
{
    let base_addr = slot.addr + 0x974;
    let id_base_addr;
    let n_base_addr;
    let buffer;

    for (let i = 0; i < 4; i++)
    {
        id_base_addr = base_addr + 128 * i;
        n_base_addr = 512 + id_base_addr;
        for (let j = 0; j < 128; j++)
        {
            byte_array[id_base_addr + j] = byte_safety_u(slot.inv.inv[i][j][0], 1);
            byte_array[n_base_addr + j] = byte_safety_u(slot.inv.inv[i][j][1], 1);
        }
    }

    for (let i = 0; i < 32; i++)
        byte_array[base_addr + 1024 + i] = byte_safety_u(slot.inv.vital[i], 1);

    for (let i = 0; i < 128; i++)
        byte_array[base_addr + 1056 + i] = byte_safety_u(slot.inv.skill[i], 1);

    buffer = to_little_endian_u(slot.inv.zenny, 4);
    for (let i = 0; i < 4; i++)
        byte_array[slot.addr + 0x878 + i] = buffer[i];

    for (let i = 0; i < 3; i++)
        byte_array[slot.addr + 0xe70 + i] = slot.inv.genes[i];

    for (let i = 0; i < 3; i++)
    {
        byte_array[slot.addr + 0xe74 + i] = slot.inv.masters[i];
        byte_array[slot.addr + 0xe77 + i] = slot.inv.masters[i];
    }
}

function save_party(byte_array, slot)
{
    let base_addr = slot.addr + 0x882;
    for (let i = 0; i < 3; i++)
    {
        byte_array[base_addr + i] = byte_safety_u(slot.party.out[i], 1);
        byte_array[base_addr + i + 3] = byte_safety_u(slot.party.in[i], 1);
    }
}

function save_counter(byte_array, slot, counter_e)
{
    if (get_timer_status(counter_e)[0])
    {
        for (let i = 0; i < 4; i++)
        {
            byte_array[slot.addr + 0xe7c + i] = 0;
        }
    }

    if (get_timer_status(counter_e)[1])
    {
        for (let i = 0; i < 4; i++)
        {
            byte_array[slot.addr + 0xe80 + i] = 0;
        }
    }
}
