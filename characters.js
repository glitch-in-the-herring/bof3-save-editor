function get_character_elements()
{
    const ids = ["character_name", "character_lvl", "character_exp", "character_chp", "character_cap"];
    let output = {};

    for (let i = 0; i < ids.length; i++)
        output[ids[i]] = document.getElementById(ids[i]);

    return output;
}

function show_character_names(combo_box, characters)
{
    combo_box.textContent = "";
    for (let i = 0; i < 8; i++)
    {
        combo_box.innerHTML += "<option value=\"" + i.toString()  + "\">" + characters[i].name +  "</option>\n";
    }
}

function show_character(character, e)
{
    let index;
    let keys = Object.keys(e);
    for (let i = 0; i < keys.length; i++)
    {
        index = keys[i];
        e[index].value = character[index.split("_")[1]];
    }    
}
