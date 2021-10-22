const upload_input = document.getElementById("upload_input");
const char_editor = document.getElementById("character_editor");
const prev_buttons = Array.from(document.getElementsByClassName("slot_prev_button"));
const next_buttons = Array.from(document.getElementsByClassName("slot_next_button"));
const slot_pos_labels = Array.from(document.getElementsByClassName("slot_position_indicator"));
const disabled_elements = document.getElementsByClassName("disabled");
const char_select = document.getElementById("character_select");
const abil_cat = ["Heal", "Assist", "Attack", "Skill"];
const inv_cat = ["Item", "Weapon", "Armor", "Option"];

let filename;
let addresses;
let byte_array;
let memcard_file;
let slots = [];
let cur = {
    "slot" : 0,
    "char" : 0,
    "abil" : 0,
    "inv" : 0
};
let char_e = get_char_e(char_editor);
let inv_e = get_inv_e();
char_e["cur"] = cur;
inv_e["cur"] = cur;

load_item_select([char_e.eqp[0]], weapon_array);
load_item_select([char_e.eqp[1], char_e.eqp[2], char_e.eqp[3]], armor_array);
load_item_select([char_e.eqp[4], char_e.eqp[5]], acc_array);

function on_file_open()
{
    const reader = new FileReader();
    memcard_file = this.files[0];
    filename = memcard_file.name;

    reader.onload = function(e)
    {
        byte_array = new Uint8Array(e.target.result);
        if (is_memcard(byte_array))
        {
            for (let i = 0; i < disabled_elements.length; i++)
                disabled_elements[i].removeAttribute("disabled");
        }
        else
        {
            alert("Not a valid memory card file!");
            upload_input.value = "";
            return;
        }

        if ((addresses = browse_toc(byte_array)).length == 0)
        {
            alert("No save file found!");
            upload_input.value = "";
            return;
        }

        for (let i = 0; i < addresses.length; i++)
            slots.push(load_slot(byte_array, addresses[i]));

        show_char_names(char_select, slots[0].chars);
        show_char(char_e, slots[0].chars[0]);
        show_inv(inv_e, slots[0].inv.inv[0]);

        inv_e.inv_label.textContent = "Item";
        inv_e.inv_next_button.removeAttribute("disabled");

        if (addresses.length > 1)
            next_buttons.forEach(x => x.removeAttribute("disabled"));

        slot_pos_labels.forEach(x => x.textContent = "Slot 1 / " + String(addresses.length));
        Array.from(document.getElementsByClassName("save_button")).forEach(function(x)
        {
            x.addEventListener("click", save_file, false);
            x.byte_array = byte_array;
            x.slots = slots;
            x.filename = filename;
            x.char_e = char_e;
        });
    }

    reader.readAsArrayBuffer(memcard_file);
}

function on_character_change()
{
    let index = Number(this.value);
    store_char(char_e, slots[char_e.cur.slot].chars[char_e.cur.char]);
    char_e.cur.char = index;
    show_char(char_e, slots[char_e.cur.slot].chars[index]);
}

function prev_slot(e)
{
    store_char(char_e, slots[char_e.cur.slot].chars[char_e.cur.char]);
    char_e.cur.char = 0;
    inv_e.cur.inv = 0;
    if (char_e.cur.slot == addresses.length - 1)
        next_buttons.forEach(x => x.removeAttribute("disabled"));

    char_e.cur.slot--; 

    if (char_e.cur.slot == 0)
        e.target.setAttribute("disabled", "");

    show_char_names(char_select, slots[char_e.cur.slot].chars);
    show_char(char_e, slots[char_e.cur.slot].chars[0]);
    show_inv(inv_e, slots[char_e.cur.slot].inv.inv[0]);
    slot_pos_labels.forEach(x => x.textContent = "Slot " + String(char_e.cur.slot + 1) + " / " + String(addresses.length));
}

function next_slot(e)
{
    store_char(char_e, slots[char_e.cur.slot].chars[char_e.cur.char]);
    char_e.cur.char = 0;
    inv_e.cur.inv = 0;
    if (char_e.cur.slot == 0)
        prev_buttons.forEach(x => x.removeAttribute("disabled"));

    char_e.cur.slot++;    
    
    if (char_e.cur.slot == addresses.length - 1)
        e.target.setAttribute("disabled", "");

    show_char_names(char_select, slots[char_e.cur.slot].chars);
    show_char(char_e, slots[char_e.cur.slot].chars[0]);
    show_inv(inv_e, slots[char_e.cur.slot].inv.inv[0]);
    slot_pos_labels.forEach(x => x.textContent = "Slot " + String(char_e.cur.slot + 1) + " / " + String(addresses.length));    
}

function prev_abil(e)
{
    store_char(char_e, slots[char_e.cur.slot].chars[char_e.cur.char]);    
    if (char_e.cur.abil == 3)
        char_e.abil_next_button.removeAttribute("disabled");

    char_e.cur.abil--;
    char_e.abil_label.textContent = abil_cat[char_e.cur.abil];

    if (char_e.cur.abil == 0)
        e.target.setAttribute("disabled", "");

    for (let i = 0; i < 10; i++)
        char_e.abil[i].value = slots[char_e.cur.slot].chars[char_e.cur.char].abil[char_e.cur.abil][i];
}

function next_abil(e)
{
    store_char(char_e, slots[char_e.cur.slot].chars[char_e.cur.char]);    
    if (char_e.cur.abil == 0)
        char_e.abil_prev_button.removeAttribute("disabled");

    char_e.cur.abil++;
    char_e.abil_label.textContent = abil_cat[char_e.cur.abil];    

    if (char_e.cur.abil == 3)
        e.target.setAttribute("disabled", "");

    for (let i = 0; i < 10; i++)
        char_e.abil[i].value = slots[char_e.cur.slot].chars[char_e.cur.char].abil[char_e.cur.abil][i];
}

function prev_inv(e)
{
    store_inv(inv_e, slots[inv_e.cur.slot].inv.inv[inv_e.cur.inv]);
    if (inv_e.cur.inv == 3)
        inv_e.inv_next_button.removeAttribute("disabled");

    inv_e.cur.inv--;
    inv_e.inv_label.textContent = inv_cat[inv_e.cur.inv];

    if (inv_e.cur.inv == 0)
        e.target.setAttribute("disabled", "");

    show_inv(inv_e, slots[inv_e.cur.slot].inv.inv[inv_e.cur.inv]);
}

function next_inv(e)
{
    store_inv(inv_e, slots[inv_e.cur.slot].inv.inv[inv_e.cur.inv]);
    if (inv_e.cur.inv == 0)
        inv_e.inv_prev_button.removeAttribute("disabled");

    inv_e.cur.inv++;
    inv_e.inv_label.textContent = inv_cat[inv_e.cur.inv];

    if (inv_e.cur.inv == 3)
        e.target.setAttribute("disabled", "");

    show_inv(inv_e, slots[inv_e.cur.slot].inv.inv[inv_e.cur.inv]);
}

upload_input.addEventListener("change", on_file_open, false);
char_select.addEventListener("change", on_character_change, false);
prev_buttons.forEach(x => x.addEventListener("click", prev_slot, false));
next_buttons.forEach(x => x.addEventListener("click", next_slot, false));
char_e.abil_prev_button.addEventListener("click", prev_abil, false);
char_e.abil_next_button.addEventListener("click", next_abil, false);
inv_e.inv_prev_button.addEventListener("click", prev_inv, false);
inv_e.inv_next_button.addEventListener("click", next_inv, false);
