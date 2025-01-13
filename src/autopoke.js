/**
    Auto-poke script for Facebook US
    
    For other versions, replace "Poke Back" by the label used in your version
*/

var deSuite = 0;
var noPokes = 0;

function poke() {
    console.log("Calling poke()..");

    /* Auto-poke part */
    let elt_links = document.getElementsByTagName("span");
    let deSuitePrev = deSuite;

    for (let i = 0; i < elt_links.length; i++) {
        let elt_link = elt_links[i];
        if (elt_link.innerHTML.includes("Balas Colek")) {
            deSuite++;
            let nbPokesDiv = document.getElementById("nb_pokes_div");
            nbPokesDiv.innerHTML = parseInt(nbPokesDiv.innerHTML) + 1;
            elt_link.click();
            console.log(`Poked: ${elt_link.innerHTML}`);
        }
    }

    /* Make it more real */
    if (deSuitePrev === deSuite) {
        noPokes++;
        console.log("No new pokes found.");
    } else {
        noPokes = 0;
        console.log("Pokes processed.");
    }

    let timeout = 1000; // Default delay

    if (deSuite === 0) {
        console.log("Calling poke().. (0) - No pokes, long delay.");
        timeout += Math.round(Math.random() * 126000); // 21% of 600000
    } else if (deSuitePrev === deSuite && noPokes > 5) {
        console.log("Calling poke().. (1) - No pokes for a while, resetting.");
        timeout += Math.round(Math.random() * 25200); // 21% of 120000
        deSuite = 0;
    } else if (deSuite <= 6) {
        console.log("Calling poke().. (2) - Few pokes, short delay.");
        timeout += Math.round(Math.random() * 6300); // 21% of 30000
    } else if (deSuite >= 50) {
        console.log("Calling poke().. (3) - Many pokes, longer delay.");
        timeout += Math.round(Math.random() * 25200); // 21% of 120000
    } else {
        console.log("Calling poke().. (4) - Normal operation.");
        timeout += 1000; // Minimal delay
    }

    console.log(`Next call in ${timeout}ms`);
    setTimeout(poke, timeout);
}

let nbPokesDiv = document.createElement("div");
nbPokesDiv.id = "nb_pokes_div";
nbPokesDiv.innerHTML = "0";
nbPokesDiv.style.position = "fixed";
nbPokesDiv.style.zIndex = "999";
nbPokesDiv.style.left = "3px";
nbPokesDiv.style.top = "42px";
nbPokesDiv.style.width = "25px";
nbPokesDiv.style.textAlign = "center";
nbPokesDiv.style.border = "1px #5555ff solid";
nbPokesDiv.style.color = "#5555ff";
nbPokesDiv.style.backgroundColor = "#ffffff";
nbPokesDiv.style.fontSize = "0.7em";
document.body.appendChild(nbPokesDiv);

console.log("Starting auto-poke script...");
poke();
