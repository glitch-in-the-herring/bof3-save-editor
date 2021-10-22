function get_inv_e()
{
    let output = {};

    const inv_list = document.getElementById("inv_list");
    
    output["inv"] = []
    let select;
    let tbox;
    let li;

    for (let i = 0; i < 128; i++)
    {
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
        load_item_select(select, item_array);
        li.appendChild(select);        
        output["inv"][i][0] = select;
        output["inv"][i][1] = tbox;
    }
}