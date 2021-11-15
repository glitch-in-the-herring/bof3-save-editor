function get_counter_e()
{
    let counter_e = {};
    //counter_e["timer"] = document.getElementById("timer_timer");
    counter_e["celerity"] = document.getElementById("timer_celerity");
    counter_e["bonebreak"] = document.getElementById("timer_bonebreak");

    return counter_e;
}

function get_counter_status(counter_e)
{
    return [counter_e["celerity"].checked, counter_e["bonebreak"].checked];
}
