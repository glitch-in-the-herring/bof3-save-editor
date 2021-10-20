function is_memcard(byte_array)
{
    if (byte_array[0] == 0x4D && byte_array[1] == 0x43)
        return true;

    return false;
}

function browse_toc(byte_array)
{
    let addresses = [];
    let current_address = 0x00;

    while (current_address <= 0x780)
    {
        current_address += 0x80;
        if (byte_array[current_address] != 0xA0 && check_toc_entry(byte_array, current_address))
        {
            addresses.push(0x2000 * (current_address / 0x80));
        }
    }

    return addresses;
}

function check_toc_entry(byte_array, current_address)
{
    const code_JP = "SLPS-00990BOF3";
    const code_US = "SLUS-00422BOF3";
    const code_EU = "SLES-01304BOF3";

    for (let i = 0; i < 0x0E; i++)
    {       
        if (byte_array[current_address + 0x0C + i] != code_JP[i].charCodeAt() &&
            byte_array[current_address + 0x0C + i] != code_US[i].charCodeAt() &&
            byte_array[current_address + 0x0C + i] != code_EU[i].charCodeAt())
            return false;
    }

    return true;
}