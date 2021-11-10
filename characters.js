function get_char_e()
{
    let output = {};

    //stats
    const stat_e = Array.from(document.getElementById("character_stats").childNodes).filter(function(x) 
    {
        let string_id = String(x.id);
        return string_id.startsWith("character_") && !string_id.startsWith("character_res") && !string_id.startsWith("character_eqp");
    });

    let stat = {};
    for (let i = 0; i < stat_e.length; i++)
        stat[String(stat_e[i].id)] = stat_e[i];

    output["stat"] = stat;

    //resistances
    const res_e = Array.from(document.getElementById("character_res").childNodes).filter(function(x) 
    {
        let string_id = String(x.id);
        return string_id.startsWith("character_res");
    });

    output["res"] = res_e;   

    //equipment
    const eqp_e = Array.from(document.getElementById("character_eqp").childNodes).filter(function(x) 
    {
        let string_id = String(x.id);
        return string_id.startsWith("character_eqp");
    });

    output["eqp"] = eqp_e;

    cont sg_e = Array.from(document.getElementById("character_sg").childNodes).filter(function(x) 
    {
        let string_id = String(x.id);
        return string_id.startsWith("character_sg");
    });

    let sg = {};
    for (let i = 0; i < sg_e.length; i++)
        stat[String(sg_e[i].id)] = sg_e[i];

    output["sg"] = sq;

    //abilities
    let abil_list = document.getElementById("abil_list");
    let select;
    let li;
    let abil = [];

    for (let j = 0; j < 10; j++)
    {
        li = document.createElement("li");
        select = document.createElement("select");
        select.classList.add("disabled");
        select.setAttribute("disabled", "");
        load_item_select([select], item_array[6]);
        li.appendChild(select);
        abil_list.appendChild(li);
        abil[j] = select;
    }

    output["abil"] = abil;
    output["abil_label"] = document.getElementById("abil_type_indicator");
    output["abil_prev_button"] = document.getElementById("abil_prev_button");
    output["abil_next_button"] = document.getElementById("abil_next_button");
    let masters_e = document.getElementById("character_sg_master");
    masters_e.setAttribute("disabled", "");
    masters_e.classList.add("disabled");
    output["master"] = masters_e;
    output["masters_opt"] = [];

    for (let j = 0; j < 17; j++)
    {
        select = document.createElement("option");
        select.textContent = masters[j];
        select.setAttribute("value", j);
        select.setAttribute("disabled", "");
        masters_e.appendChild(select);
        output["masters_opt"].push(select);
    }

    select = document.createElement("option");
    select.textContent = "--";
    select.setAttribute("value", 255);
    masters_e.appendChild(select);

    return output;    
}

function get_party_e()
{
    let output = {};
    let editor = document.getElementById("party_editor");
    output["in"] = [];
    output["out"] = [];
    for (let i = 0; i < 3; i++)
    {
        output["in"][i] = document.getElementById("party_in_" + String(i + 1));
        output["out"][i] = document.getElementById("party_out_" + String(i + 1));
    }

    return output;
}

function get_party_list(chars)
{
    let party_list = [];

    for (let i = 0; i < 2; i++)
    {
        party_list[i] = "Child " + chars[i].name;
        party_list[i + 7] = "Adult " + chars[i].name;
    }

    for (let i = 2; i < 7; i++)
        party_list[i] = chars[i].name;

    return party_list;
}

function show_char_names(select, chars)
{
    select.textContent = "";
    for (let i = 0; i < 8; i++)
        select.innerHTML += "<option value=\"" + i.toString()  + "\">" + chars[i].name +  "</option>\n";
}

function show_char(char_e, char)
{
    let index;
    let keys = Object.keys(char_e.stat);
    for (let i = 0; i < keys.length; i++)
    {
        index = keys[i];
        char_e.stat[index].value = char[index.split("_")[1]];
    }

    keys = Object.keys(char_e.sg);
    for (let i = 0; i < keys.length; i++)
    {
        index = keys[i];
        char_e.sg[index].value = char.sg[index.split("_")[2]];
    }

    show_parts(char_e.res, char.res);
    show_parts(char_e.eqp, char.eqp);
    show_parts(char_e.abil, char.abil[0]);

    char_e.cur.abil = 0;
    char_e.abil_prev_button.setAttribute("disabled", "");
    char_e.abil_next_button.removeAttribute("disabled");
    char_e.abil_label.innerHTML = "Heal";
    char_e.master.value = char.master;
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

function show_party(party_e, slot)
{
    party_list = get_party_list(slot.chars);

    for (let i = 0; i < 3; i++)
    {
        party_e["in"][i].innerHTML = "";
        party_e["out"][i].innerHTML = "";
    }

    load_item_select(party_e["in"].concat(party_e["out"]), party_list);

    for (let i = 0; i < 3; i++)
    {
        party_e["in"][i].innerHTML += "<option value=\"255\">--</option>";
        party_e["out"][i].innerHTML += "<option value=\"255\">--</option>";        
        party_e["in"][i].value = slot.party.in[i];
        party_e["out"][i].value = slot.party.out[i];      
    }
}
