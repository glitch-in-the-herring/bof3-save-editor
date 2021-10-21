function get_char_e(form)
{
    let output = {};

    //stats
    const stat_e = Array.from(form.childNodes).filter(function(x) 
    {
        let string_id = String(x.id);
        return string_id.startsWith("character_") && !string_id.startsWith("character_res") && !string_id.startsWith("character_eqp");
    });

    let stat = {};
    for (let i = 0; i < stat_e.length; i++)
        stat[String(stat_e[i].id)] = stat_e[i];

    output["stat"] = stat;

    //resistances
    const res_e = Array.from(form.childNodes).filter(function(x) 
    {
        let string_id = String(x.id);
        return string_id.startsWith("character_res");
    });

    let res = [];
    for (let i = 0; i < res_e.length; i++)
        res[i] = res_e[i];

    output["res"] = res;   

    //equipment
    const eqp_e = Array.from(form.childNodes).filter(function(x) 
    {
        let string_id = String(x.id);
        return string_id.startsWith("character_eqp");
    });

    let eqp = [];
    for (let i = 0; i < eqp_e.length; i++)
        eqp[i] = eqp_e[i];

    output["eqp"] = eqp;

    //abilities
    let skill_list = document.getElementById("skill_list");
    let select;
    let li;
    let abil = [];

    for (let j = 0; j < 10; j++)
    {
        li = document.createElement("li");
        select = document.createElement("select");
        select.classList.add("disabled");
        select.setAttribute("disabled", "");
        load_item_select([select], abil_array);
        li.appendChild(select);
        skill_list.appendChild(li);
        abil[j] = select;
    }

    output["abil"] = abil;
    output["abil_label"] = document.getElementById("skill_type_indicator");
    output["cur_slot"] = 0;
    output["cur_char"] = 0;
    output["cur_abil"] = 0;

    return output;    
}

function show_character_names(select, chars)
{
    select.textContent = "";
    for (let i = 0; i < 8; i++)
    {
        select.innerHTML += "<option value=\"" + i.toString()  + "\">" + chars[i].name +  "</option>\n";
    }
}

function show_character(char_e, char)
{
    let index;
    let keys = Object.keys(char_e.stat);
    for (let i = 0; i < keys.length; i++)
    {
        index = keys[i];
        char_e.stat[index].value = char[index.split("_")[1]];
    }

    show_parts(char_e.res, char.res);
    show_parts(char_e.eqp, char.eqp);
    show_parts(char_e.abil, char.abil[0]);

    char_e.abil_label.value = "HEAL";
}

function show_parts(e, data)
{
    let index;
    let keys = Object.keys(e);
    for (let i = 0; i < keys.length; i++)
    {
        index = keys[i];
        e[index].value = data[i];
    }
}