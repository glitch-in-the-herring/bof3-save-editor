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

        character_array.push(character);
    }

    return character_array;
}

function store_character(character, e)
{
    let index;
    let keys = Object.keys(e);
    for (let i = 0; i < keys.length; i++)
    {
        index = keys[i];
        character[index.split("_")[1]] = e[index].value;
    }
}
