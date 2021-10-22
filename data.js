function load_slot(byte_array, address)
{
    let slot = {};

    slot["addr"] = address;
    slot["chars"] = load_char(byte_array.slice(address + 0x290, address + 0x7B0));
    slot["inv"] = load_inv(byte_array.slice(address + 0x974, address + 0xe14));
    slot["inv"].zenny = String(from_little_endian(byte_array.slice(address + 0x878, address + 0x87c)));

    return slot;
}

function load_char(byte_array)
{
    let char_array = []; 
    let char;
    let base_address;

    for (let i = 0; i < 8; i++)
    {
        char = {};
        base_address = 0xa4 * i;
        char["name"] = ascii_decoder(byte_array.slice(base_address, base_address + 5));
        char["lvl"] = String(byte_array[base_address + 6]);
        char["exp"] = String(from_little_endian(byte_array.slice(base_address + 8, base_address + 12)));
        char["chp"] = String(from_little_endian(byte_array.slice(base_address + 20, base_address + 22)));
        char["cap"] = String(from_little_endian(byte_array.slice(base_address + 22, base_address + 24)));
        char["cmhp"] = String(from_little_endian(byte_array.slice(base_address + 28, base_address + 30)));
        char["cmap"] = String(from_little_endian(byte_array.slice(base_address + 30, base_address + 32)));
        char["tmhp"] = String(from_little_endian(byte_array.slice(base_address + 60, base_address + 62)));
        char["tmap"] = String(from_little_endian(byte_array.slice(base_address + 62, base_address + 64)));
        char["pwr"] = String(from_little_endian(byte_array.slice(base_address + 64, base_address + 66)));
        char["def"] = String(from_little_endian(byte_array.slice(base_address + 66, base_address + 68)));
        char["agl"] = String(from_little_endian(byte_array.slice(base_address + 68, base_address + 70)));
        char["int"] = String(from_little_endian(byte_array.slice(base_address + 70, base_address + 72)));
        char["wpwr"] = String(byte_array[base_address + 74]);
        char["sprs"] = String(byte_array[base_address + 84]);
        char["rprs"] = String(byte_array[base_address + 85]);
        char["crit"] = String(byte_array[base_address + 86]);
        char["dodg"] = String(byte_array[base_address + 87]);
        char["hits"] = String(byte_array[base_address + 88]);
        char["fatg"] = String(byte_array[base_address + 25]);

        char["res"] = [];
        for (let j = 0; j < 9; j++)
            char.res[j] = String(byte_array[base_address + 75 + j]);

        char["eqp"] = [];
        for (let j = 0; j < 6; j++)
            char.eqp[j] = String(byte_array[base_address + 14 + j]);

        char["abil"] = [];
        for (let j = 0; j < 4; j++)
        {
            char.abil[j] = [];
            for (let k = 0; k < 10; k++)
                char.abil[j][k] = String(byte_array[base_address + 92 + j * 10 + k]);
        }

        char_array.push(char);
    }

    return char_array;
}

function load_inv(byte_array)
{
    let inv = {};
    let id_base_addr;
    let n_base_addr;

    inv["inv"] = [];

    for (let i = 0; i < 4; i++)
    {
        id_base_addr = 128 * i;
        n_base_addr = 512 + id_base_addr
        inv.inv[i] = [];
        for (let j = 0; j < 128; j++)
        {
            inv.inv[i][j] = [];
            inv.inv[i][j][0] = String(byte_array[id_base_addr + j]);
            inv.inv[i][j][1] = String(byte_array[n_base_addr + j]);
        }
    }

    for (let i = 0; i < 32; i++)
        inv["vital"][i] = String(byte_array[1024 + j]);

    for (let i = 0; i < 128; i++)
        inv["skill"][i] = String(byte_array[1056 + j]);

    return inv;
}

function store_char(char_e, char)
{
    let index;
    let keys = Object.keys(char_e.stat);
    for (let i = 0; i < keys.length; i++)
    {
        index = keys[i];
        char[index.split("_")[1]] = char_e.stat[index].value;
    }

    store_parts(char_e.res, char.res);
    store_parts(char_e.eqp, char.eqp);
    store_parts(char_e.abil, char.abil[char_e.cur.abil]);   
}

function store_inv(inv_e, inv)
{
    for (let i = 0; i < inv_e.length; i++)
    {
        inv[i][0] = inv_e.inv[i][0].value;
        inv[i][1] = inv_e.inv[i][1].value;
    }
}

function store_parts(e, data)
{
    let index;
    let keys = Object.keys(e);

    for (let i = 0; i < keys.length; i++)
    {
        index = keys[i];
        data[i] = e[index].value;
    }
}
