function ascii_decoder(byte_array)
{
    let output = "";
    for (let i = 0; i < byte_array.length; i++)
    {
        if (byte_array[i] == 0x00)
            break;

        output += String.fromCharCode(byte_array[i]);
    }
    return output;
}

function ascii_encoder(s)
{
    let output = [];

    for (let i = 0; i < 5; i++)
    {
        if (i < s.length)
            output.push(s[i].charCodeAt());
        else
            output.push(0x00);
    }

    return output;
}

function from_little_endian(byte_array)
{
    let output = 0;
    for (let i = byte_array.length - 1; i >= 0; i--)
        output |= byte_array[i] << i * 8;

    return output;
}

function to_little_endian_s(n, bytes)
{
    let output = [];
    let k = byte_safety_s(n, bytes);
    let l;

    if (k < 0)
        l = 2 ** (8 * bytes) + k;
    else
        l = k;

    for (let i = 0; i < bytes; i++)
        output.push((l & (0xff << i * 8)) >> i * 8);

    return output;
}

function to_little_endian_u(n, bytes)
{
    let output = [];
    let k = byte_safety(n, bytes);
    
    for (let i = 0; i < bytes; i++)
        output.push((k & (0xff << i * 8)) >> i * 8);

    return output;
}

function byte_safety_s(n, bytes)
{
    if (n < -(2 ** (8 * bytes - 1)))
        return -(2 ** (8 * bytes - 1));
    else if (n > 2 ** (8 * bytes - 1) - 1)
        return 2 ** (8 * bytes - 1) - 1;

    return n;
}

function byte_safety_u(n, bytes)
{
    if (n < 0)
        return 0;
    else if (n > 2 ** (bytes * 8) - 1)
        return 2 ** (bytes * 8) - 1;

    return n;
}

function logical_not(n, bytes) {
    if (n > 2 ** (bytes * 8) - 1)
        return 0;
    else if (n < 0)
        return 0;

    let result = 0;
    let mask;
    for (let i = 0; i < bytes * 8; i++)
    {
        mask = n & (0b1 << i);

        if (!mask)
        {
            result = result | (0b1 << i);
        }
    }

    return result;
}