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

const weapon_array = load_file("items/weapons.txt").split("\n");
const armor_array = load_file("items/armor.txt").split("\n");
const acc_array = load_file("items/accs.txt").split("\n");
const item_array = load_file("items/items.txt").split("\n");
const fishing_array = load_file("items/fishing.txt").split("\n");
const abil_array = load_file("items/abils.txt").split("\n");
const vitals_array = load_file("items/vitals.txt").split("\n");

const character_eqp_weapon = document.getElementById("character_eqp_weapon");

for (let i = 0; i < weapon_array.length; i++)
{
    combo_box.innerHTML += "<option value=\"" + i.toString()  + "\">" + weapon_array[i] +  "</option>\n";
}