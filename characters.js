function get_character_elements(form)
{
    const elements = Array.from(form.childNodes).filter(function(x) 
    {
        let string_id = String(x.id);
        return string_id.startsWith("character_") && string_id != "character_select";
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
