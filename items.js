function load_file(filename)
{
    let xhr = new XMLHttpRequest();
    let result = null;
    xhr.open("GET", filename, false);
    xhr.send();
    if (xhr.readyState === 4 && xhr.status === 200)
    {
        return xhr.responseText;
    }
}

const item_array = [
    load_file("items/items.txt").split("\n"),
    load_file("items/weapons.txt").split("\n"),
    load_file("items/armor.txt").split("\n"),
    load_file("items/accs.txt").split("\n"),
    load_file("items/fishing.txt").split("\n"),
    load_file("items/vitals.txt").split("\n"),
    load_file("items/abils.txt").split("\n")
]

function load_item_select(select, data)
{
    for (let i = 0; i < data.length; i++)
    {
        for (let j = 0; j < select.length; j++)
            select[j].innerHTML += "<option value=\"" + i.toString()  + "\">" + data[i] +  "</option>\n";
    }    
}

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
];

const master_modifiers = 
[
    [2, -2, 2, 1, 0, -3],
    [0, 1, -1, -1, 0, 2],
    [-1, 1, -2, 1, 0, 2], // Yggdrasil, how does he affect the weak vs flame thing?
    [-1, -2, 1, 0, 1, 0],
    [4, 0, 1, 3, -3, -3],
    [0, 0, 0, 0, 0, 0],
    [4, 3, -1, -1, -1, -1],
    [0, 1, -2, 0, 0, 1],
    [0, 4, -2, -2, 0, 4],
    [-3, 3, 1, -3, 1, 3],
    [2, -2, 2, 1, -1, -1],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0],
    [-6, -6, 2, 2, 1, 2],
    [-1, 0, -1, -1, 2, 0]
]

const fishes =
[
    "Jellyfish", "Piranha", "Puffer", "Trout",
    "RainbowTrout", "Red Catfish", "Bass", "MartianSquid",
    "Black Bass", "Barandy", "Man-o'-War", "Flying Fish",
    "Blowfish", "Sea Bream", "Sea Bass", "Black Porgy",
    "Octopus", "Angler", "Devilfish", "Spearfish",
    "Whale", "Mackerel", "Manillo"
];
