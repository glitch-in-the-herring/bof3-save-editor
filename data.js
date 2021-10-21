function load_slot(byte_array, address)
{
    let slot = {};

    slot["address"] = address;
    slot["characters"] = load_characters(byte_array.slice(address + 0x290, address + 0x7B0));

    return slot;
}

function load_characters(byte_array)
{
    let character_array = []; 
    let character;
    let base_address;

    for (let i = 0; i < 8; i++)
    {
        character = {};
        base_address = 0xa4 * i;
        character["name"] = ascii_decoder(byte_array.slice(base_address, base_address + 5));
        character["lvl"] = String(byte_array[base_address + 6]);
        character["exp"] = String(from_little_endian(byte_array.slice(base_address + 8, base_address + 12)));
        character["chp"] = String(from_little_endian(byte_array.slice(base_address + 20, base_address + 22)));
        character["cap"] = String(from_little_endian(byte_array.slice(base_address + 22, base_address + 24)));
        character["cmhp"] = String(from_little_endian(byte_array.slice(base_address + 28, base_address + 30)));
        character["cmap"] = String(from_little_endian(byte_array.slice(base_address + 30, base_address + 32)));
        character["tmhp"] = String(from_little_endian(byte_array.slice(base_address + 60, base_address + 62)));
        character["tmap"] = String(from_little_endian(byte_array.slice(base_address + 62, base_address + 64)));
        character["pwr"] = String(from_little_endian(byte_array.slice(base_address + 64, base_address + 66)));
        character["def"] = String(from_little_endian(byte_array.slice(base_address + 66, base_address + 68)));
        character["agl"] = String(from_little_endian(byte_array.slice(base_address + 68, base_address + 70)));
        character["int"] = String(from_little_endian(byte_array.slice(base_address + 70, base_address + 72)));
        character["wpwr"] = String(byte_array[base_address + 74]);
        character["sprs"] = String(byte_array[base_address + 84]);
        character["rprs"] = String(byte_array[base_address + 85]);
        character["crit"] = String(byte_array[base_address + 86]);
        character["dodg"] = String(byte_array[base_address + 87]);
        character["hits"] = String(byte_array[base_address + 88]);
        character["fatg"] = String(byte_array[base_address + 25]);

        character["resistances"] = [];
        for (let j = 0; j < 9; j++)
            character.resistances[j] = String(byte_array[base_address + 75 + j]);

        character["equipment"] = [];
        for (let j = 0; j < 6; j++)
            character.equipment[j] = String(byte_array[base_address + 14 + j]);

        character_array.push(character);
    }

    return character_array;
}

function store_character(character, stats_e, resist_e)
{
    let index;
    let keys = Object.keys(stats_e);
    for (let i = 0; i < keys.length; i++)
    {
        index = keys[i];
        character[index.split("_")[1]] = stats_e[index].value;
    }

    keys = Object.keys(resist_e);
    for (let i = 0; i < keys.length; i++)
    {
        index = keys[i];
        character.resistances[i] = resist_e[index].value;
    }    
}
