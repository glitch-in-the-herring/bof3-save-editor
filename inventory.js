function get_inv_e()
{
    let output = {};
    const inv_list = document.getElementById("inv_list")
    output["inv"] = [];
    let select;
    let tbox;
    let li;
    for (let i = 0; i < 128; i++)
    {
        output["inv"][i] = [];
        li = document.createElement("li");
        select = document.createElement("select");
        tbox = document.createElement("input");
        select.classList.add("disabled");
        select.setAttribute("disabled", "");
        tbox.setAttribute("type", "number");
        tbox.setAttribute("min", "0");
        tbox.setAttribute("max", "255");
        tbox.classList.add("disabled");
        tbox.classList.add("narrow");
        tbox.setAttribute("disabled", "");
        load_item_select([select], item_array);
        li.appendChild(select);
        li.appendChild(tbox);
        inv_list.appendChild(li);        
        output["inv"][i][0] = select;
        output["inv"][i][1] = tbox;
    }

    output["inv_prev_button"] = document.getElementById("inv_prev_button");
    output["inv_next_button"] = document.getElementById("inv_next_button");
    output["inv_label"] = document.getElementById("inv_type_indicator");

    return output;
}

function show_inv(inv_e, inv)
{
    for (let i = 0; i < 128; i++)
        inv_e.inv[i][0].value = inv[i][0];
        inv_e.inv[i][1].value = inv[i][1];
}
