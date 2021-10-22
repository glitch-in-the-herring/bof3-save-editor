async function load_file(filename)
{
    let promise = new Promise(function(resolve)
    {
        let xhr = new XMLHttpRequest();
        let result;
        xhr.open("GET", filename, false);
        xhr.onload = function()
        {
            if (xhr.readyState === 4 && xhr.status === 200)
            {
                resolve(xhr.responseText);
            }
        }
        xhr.send();
    });
}

const [weapon_array, armor_array, acc_array, item_array, fishing_array, abil_array, vitals_array] = await Promise.all([
    load_file("items/weapons.txt").split("\n")
    load_file("items/armor.txt").split("\n"),
    load_file("items/accs.txt").split("\n")
    load_file("items/items.txt").split("\n"),
    load_file("items/fishing.txt").split("\n"),
    load_file("items/abils.txt").split("\n"),
    load_file("items/vitals.txt").split("\n")
]);

function load_item_select(select, data)
{
    for (let i = 0; i < data.length; i++)
    {
        for (let j = 0; j < select.length; j++)
            select[j].innerHTML += "<option value=\"" + i.toString()  + "\">" + data[i] +  "</option>\n";
    }    
}
