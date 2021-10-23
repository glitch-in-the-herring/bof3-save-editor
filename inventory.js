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
    }

    output["inv_prev_button"] = document.getElementById("inv_prev_button");
    output["inv_next_button"] = document.getElementById("inv_next_button");
    output["inv_label"] = document.getElementById("inv_type_indicator");
    output["inv_info"] = document.getElementById("inv_info");

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
        inv_e.inv[i][0].setAttribute("max", load_array.length);
        inv_e.inv[i][1].value = inv[i][1];
    }

    inv_e.inv_info.textContent = "";
    let li;
    for (let i = 0; i < load_array.length; i++)
    {
        li = document.createElement("li");
        li.innerHTML = load_array[i];
        inv_e.inv_info.appendChild(li);
    }
}
