function load_file(filename)
{
    let output;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", filename, true);
    xhr.onload = function(e)
    {
        if (xhr.readyState === 4 && xhr.status === 200)
        {
            console.log("yeah");
            result = output.responseText;
            return output;
        }
    }
    xhr.send(null);
}