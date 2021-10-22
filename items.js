function load_file(filename)
{
    let xhr = new XMLHttpRequest();
    let result = null;
    xhr.open("GET", filename, false);
    xhr.send();
    if (xhr.readyState === 4 && xhr.status === 200)
    {
        return xhr.responseText;
    }
}

const item_array = [
    load_file("items/items.txt").split("\n"),
    load_file("items/weapons.txt").split("\n"),
    load_file("items/armor.txt").split("\n"),
    load_file("items/accs.txt").split("\n"),
    load_file("items/fishing.txt").split("\n"),
    load_file("items/vitals.txt").split("\n"),
    load_file("items/abils.txt").split("\n")
]

function load_item_select(select, data)
{
    for (let i = 0; i < data.length; i++)
    {
        for (let j = 0; j < select.length; j++)
            select[j].innerHTML += "<option value=\"" + i.toString()  + "\">" + data[i] +  "</option>\n";
    }    
}
