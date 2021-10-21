const upload_input = document.getElementById("upload_input");
const editor = document.getElementById("character_editor");
const prev_buttons = Array.from(document.getElementsByClassName("slot_prev_button"));
const next_buttons = Array.from(document.getElementsByClassName("slot_next_button"));
const slot_pos_labels = Array.from(document.getElementsByClassName("slot_position_indicator"));
const disabled_elements = document.getElementsByClassName("disabled");
const char_select = document.getElementById("character_select");
const char_e = get_char_e(editor);

let filename;
let addresses;
let byte_array;
let memcard_file;
let slots = [];

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

        show_character_names(char_select, slots[0].chars);
        show_character(char_e, slots[0].chars[0]);

        if (addresses.length > 1)
        {
            next_buttons.forEach(x => x.removeAttribute("disabled"));
        }

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
    store_character(char_e, slots[char_e.cur_slot].chars[char_e.cur_char]);
    char_e.cur_char = index;
    show_character(char_e, slots[char_e.cur_slot].chars[index]);
}

function prev_slot(e)
{
    store_character(slots[char_e.cur_slot].chars[char_e.cur_char], char_e);
    char_e.cur_char = 0;
    if (char_e.cur_slot == addresses.length - 1)
    {
        next_buttons.forEach(x => x.removeAttribute("disabled"));
    }

    char_e.cur_slot--; 

    if (char_e.cur_slot == 0)
    {
        e.target.setAttribute("disabled", "");
    }

    show_character_names(char_select, slots[char_e.cur_slot].chars);
    show_character(char_e, slots[char_e.cur_slot].chars[0]);
    slot_pos_labels.forEach(x => x.textContent = "Slot " + String(char_e.cur_slot + 1) + " / " + String(addresses.length));
}

function next_slot(e)
{
    store_character(char_e, slots[char_e.cur_slot].chars[char_e.cur_char]);
    char_e.cur_char = 0;    
    if (char_e.cur_slot == 0)
    {
        prev_buttons.forEach(x => x.removeAttribute("disabled"));
    }

    char_e.cur_slot++;    
    
    if (char_e.cur_slot == addresses.length - 1)
    {
        e.target.setAttribute("disabled", "");
    }

    show_character_names(char_select, slots[char_e.cur_slot].chars);
    show_character(char_e, slots[char_e.cur_slot].characters[0]);
    slot_pos_labels.forEach(x => x.textContent = "Slot " + String(char_e.cur_slot + 1) + " / " + String(addresses.length));    
}

upload_input.addEventListener("change", on_file_open, false);
char_select.addEventListener("change", on_character_change, false);
prev_buttons.forEach(x => x.addEventListener("click", prev_slot, false));
next_buttons.forEach(x => x.addEventListener("click", next_slot, false));
