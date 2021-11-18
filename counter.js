function get_counter_e()
{
    let counter_e = {};
    //counter_e["timer"] = document.getElementById("timer_timer");
    counter_e["celerity"] = document.getElementById("timer_celerity");
    counter_e["bonebreak"] = document.getElementById("timer_bonebreak");
    counter_e["battle_1"] = document.getElementById("battle_c_1");
    counter_e["battle_2"] = document.getElementById("battle_c_2");

    return counter_e;
}

function get_timer_status(counter_e)
{
    return [counter_e["celerity"].checked, counter_e["bonebreak"].checked];
}
