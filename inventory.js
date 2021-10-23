function get_inv_e()
{
    const inv_list = document.getElementById("inv_list");
    const vital_list = document.getElementById("vital_list");
    const skill_list = document.getElementById("skill_list");

    let output = {};
    output["inv"] = [];
    output["skill"] = [];
    let select;
    let tbox;
    let li;
    for (let i = 0; i < 128; i++)
    {
        output["inv"][i] = [];
        li = document.createElement("li");
        select = document.createElement("input");
        tbox = document.createElement("input");

        select.setAttribute("type", "number");
        select.setAttribute("min", "0");
        select.setAttribute("max", "92");
        select.setAttribute("disabled", "");
        select.classList.add("disabled");
        select.classList.add("narrow");

        tbox.setAttribute("type", "number");
        tbox.setAttribute("min", "0");
        tbox.setAttribute("max", "255");
        tbox.setAttribute("disabled", "");
        tbox.classList.add("disabled");
        tbox.classList.add("narrow");

        li.appendChild(select);
        li.appendChild(tbox);
        inv_list.appendChild(li);        
        output["inv"][i][0] = select;
        output["inv"][i][1] = tbox;

        li = document.createElement("li");
        select = document.createElement("input");

        select.setAttribute("type", "number");
        select.setAttribute("min", "0");
        select.setAttribute("max", "227");
        select.setAttribute("disabled", "");
        select.classList.add("disabled");
        select.classList.add("narrow");

        li.appendChild(select);
        skill_list.appendChild(li);
        output["skill"][i] = select;
    }

    output["vital"] = [];
    for (let i = 0; i < 32; i++)
    {
        li = document.createElement("li");
        select = document.createElement("input");

        select.setAttribute("type", "number");
        select.setAttribute("min", "0");
        select.setAttribute("max", "15");
        select.setAttribute("disabled", "");
        select.classList.add("disabled");
        select.classList.add("narrow");

        li.appendChild(select);
        vital_list.appendChild(li);
        output["vital"][i] = select;
    }

    output["zenny"] = document.getElementById("inv_zenny");
    output["inv_prev_button"] = document.getElementById("inv_prev_button");
    output["inv_next_button"] = document.getElementById("inv_next_button");
    output["inv_label"] = document.getElementById("inv_type_indicator");
    output["inv_info"] = document.getElementById("inv_info");
    output["vital_info"] = document.getElementById("vital_info");
    output["skill_info"] = document.getElementById("skill_info"); 

    return output;
}

function show_inv(inv_e, inv)
{
    let load_array;
    if (inv_e.cur.inv != 3)
        load_array = item_array[inv_e.cur.inv];
    else
        load_array = item_array[3].concat(item_array[4]);

    for (let i = 0; i < 128; i++)
    {
        inv_e.inv[i][0].value = inv[i][0];
        inv_e.inv[i][0].setAttribute("max", load_array.length - 1);
        inv_e.inv[i][1].value = inv[i][1];
    }

    inv_e.inv_info.textContent = "";
    let li;
    for (let i = 0; i < load_array.length; i++)
    {
        li = document.createElement("li");
        li.textContent = load_array[i];
        inv_e.inv_info.appendChild(li);
    }
}

function show_vital_and_skills(inv_e, inv)
{
    inv_e.zenny.value = inv.zenny;
    for (let i = 0; i < 32; i++)
        inv_e.vital[i].value = inv.vital[i];

    let li;
    for (let i = 0; i < 16; i++)
    {
        li = document.createElement("li");
        li.textContent = item_array[5][i];
        inv_e.vital_info.appendChild(li);
    }

    for (let i = 0; i < 128; i++)
        inv_e.skill[i].value = inv.skill[i];

    for (let i = 0; i < 228; i++)
    {
        li = document.createElement("li");
        li.textContent = item_array[6][i];
        inv_e.skill_info.appendChild(li);
    }    
}