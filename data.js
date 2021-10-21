function load_slot(byte_array, address)
{
    let slot = {};

    slot["addr"] = address;
    slot["chars"] = load_characters(byte_array.slice(address + 0x290, address + 0x7B0));

    return slot;
}

function load_characters(byte_array)
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

function store_character(char_e, char)
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
}

function store_parts(e, data)
{
    let index;
    let keys = Object.keys(e);

    keys = Object.keys(resist_e);
    for (let i = 0; i < keys.length; i++)
    {
        index = keys[i];
        data[i] = e[index].value;
    }
}
