function get_inv_e()
{
    const inv_list = document.getElementById("inv_list");
    const vital_list = document.getElementById("vital_list");
    const skill_list = document.getElementById("skill_list");
    const gene_tbl = document.getElementById("gene_table");
    const masters_tbl = document.getElementById("masters_table");

    const genes = 
    [
        "flame", "frost", "thunder",
        "shadow", "radiance", "force",
        "defender", "eldritch", "miracle",
        "gross", "thorn", "reverse",
        "mutant", "question", "trance",
        "failure", "fusion", "infinity"
    ];

    const gene_names = 
    [
        "Flame", "Frost", "Thunder",
        "Shadow", "Radiance", "Force",
        "Defender", "Eldritch", "Miracle",
        "Gross", "Thorn", "Reverse",
        "Mutant", "???", "Trance",
        "Failure", "Fusion", "Infinity"
    ];

    const masters =
    [
        "Bunyan", "Mygas", "Yggdrasil", "D'lonzo",
        "Fahl", "Durandal", "Giotto", "Hondara",
        "Emitai", "Deis", "Hachio", "Bais",
        "Lang", "Lee", "Wynn", "Ladon", "Meryleep"
    ]

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

    output["genes"] = [];
    let name_d;
    let img;
    let label;
    for (let i = 0; i < 6; i++)
    {
        li = document.createElement("tr");
        tbox = document.createElement("tr");
        for (let j = 0; j < 3; j++)
        {            
            name_d = document.createElement("td");
            select = document.createElement("input");
            img = document.createElement("img");
            label = document.createElement("label");
            img.setAttribute("src", "img/genes/" + genes[3 * i + j] + ".gif");
            label.appendChild(img);
            
            select.setAttribute("disabled", "");
            select.setAttribute("type", "checkbox");
            select.setAttribute("value", "1");
            select.setAttribute("id", "gene_" + genes[3 * i + j]);
            label.setAttribute("for", "gene_" + genes[3 * i + j]);

            output["genes"].push(select);

            name_d.appendChild(label);
            name_d.appendChild(select);

            li.appendChild(name_d);

            name_d = document.createElement("td");
            label = document.createElement("label");
            label.textContent = gene_names[3 * i + j];
            label.setAttribute("for", "gene_" + genes[3 * i + j]);

            name_d.append(label);
            tbox.appendChild(name_d);
        }
        gene_tbl.appendChild(li);
        gene_tbl.appendChild(tbox);
    }

    output["masters"] = [];
    for (let i = 0; i < masters.length; i++)
    {
        select = document.createElement("input");
        label = document.createElement("label");
        select.setAttribute("disabled", "");
        select.setAttribute("type", "checkbox");
        select.setAttribute("value", "1");
        select.setAttribute("id", "master_" + masters[i]);
        label.setAttribute("for", "master_" + masters[i]);
        label.textContent = masters[i];
        masters_tbl.appendChild(select);
        masters_tbl.appendChild(label);
        masters_tbl.innerHTML += "<br/>";
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

    for (let i = 0; i < 128; i++)
        inv_e.skill[i].value = inv.skill[i];
}