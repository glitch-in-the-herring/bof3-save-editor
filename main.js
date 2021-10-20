const upload_input = document.getElementById("upload_input");
const character_select = document.getElementById("character_select");
const disabled_elements = document.getElementsByClassName("disabled");
const character_elements = get_character_elements(document.getElementById("character_editor"));

let filename;
let addresses;
let memcard_view;
let memcard_file;
let slots = [];
let active_slot = 0;
let active_character = 0;

function on_file_open()
{
    const reader = new FileReader();
    memcard_file = this.files[0];
    filename = memcard_file.name;

    reader.onload = function(e)
    {
        memcard_view = new Uint8Array(e.target.result);
        if (is_memcard(memcard_view))
        {
            for (let i = 0; i < disabled_elements.length; i++)
                disabled_elements[i].removeAttribute("disabled");
        }
        else
        {
            alert("Not a valid memory card file!");
            return;
        }

        if ((addresses = browse_toc(memcard_view)).length == 0)
        {
            alert("No save file found!");
            return;
        }

        for (let i = 0; i < addresses.length; i++)
            slots.push(load_slot(memcard_view, addresses[i]));

        show_character_names(character_select, slots[0].characters);
        show_character(slots[0].characters[0], character_elements);
    }

    reader.readAsArrayBuffer(memcard_file);
}

function on_character_change()
{
    let index = Number(this.value);
    store_character(slots[active_slot].characters[active_character], character_elements);
    active_character = index;
    show_character(slots[active_slot].characters[index], character_elements);
}

upload_input.addEventListener("change", on_file_open, false);
character_select.addEventListener("change", on_character_change, false);
