function get_character_stats_e(form)
{
    const elements = Array.from(form.childNodes).filter(function(x) 
    {
        let string_id = String(x.id);
        return string_id.startsWith("character_") && !string_id.startsWith("character_res") && !string_id.startsWith("character_eqp");
    });
    let output = {};

    for (let i = 0; i < elements.length; i++)
        output[String(elements[i].id)] = elements[i];

    return output;
}

function get_character_resist_e(form)
{
    const elements = Array.from(form.childNodes).filter(function(x) 
    {
        let string_id = String(x.id);
        return string_id.startsWith("character_res");
    });
    let output = {};

    for (let i = 0; i < elements.length; i++)
        output[String(elements[i].id)] = elements[i];

    return output;
}

function get_character_eqp_e(form)
{
    const elements = Array.from(form.childNodes).filter(function(x) 
    {
        let string_id = String(x.id);
        return string_id.startsWith("character_eqp");
    });
    let output = {};

    for (let i = 0; i < elements.length; i++)
        output[String(elements[i].id)] = elements[i];

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

function show_character(character, stats_e, resist_e, eqp_e)
{
    let index;
    let keys = Object.keys(stats_e);
    for (let i = 0; i < keys.length; i++)
    {
        index = keys[i];
        stats_e[index].value = character[index.split("_")[1]];
    }

    keys = Object.keys(resist_e);
    for (let i = 0; i < keys.length; i++)
    {
        index = keys[i];
        resist_e[index].value = character.resistances[i];
    }

    keys = Object.keys(eqp_e);
    for (let i = 0; i < keys.length; i++)
    {
        index = keys[i];
        eqp_e[index].value = character.equipment[i];
    }    
}
