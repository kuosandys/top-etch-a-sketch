"use strict";

// Select container element //
const container = document.querySelector("#container");

// Declare variables outside functions //
let square;
let allSquares;

// Select buttons: new pad, colour, shade //
const newPad = document.querySelector("#newPad");
const colour = document.querySelector("#colour");
const shade = document.querySelector("#shade");

//Initialize counter for shade function //
let shadeCounter = {};

function createPad(sketchpadSize=16) {
// Create a sketchpad of size sketchpadSize * sketchpadSize (default 16) //

    for (let i=0;i<sketchpadSize**2;i++) {
        square = document.createElement("div");
        square.setAttribute("class", "square");
        square.setAttribute("id", "div" + i);

        // event listener for mouse enter //
        square.addEventListener("mouseenter", (e) => {
            e.target.classList.add("drawn");
        });

        // add each square child to parent container //
        container.appendChild(square);
    };
    // create an array from all the square elements //
    allSquares = Array.from(document.querySelectorAll(".square"));
    // change css variable --sketchpadSize //
    document.documentElement.style.setProperty("--sketchpadSize", sketchpadSize);
};

function createNewPad(e) {
// Clear sketchpad and create a new one//
    // Remove all squares from container element //
    let lastSquare = container.lastElementChild;
    while (lastSquare) {
        container.removeChild(lastSquare);
        lastSquare = container.lastElementChild;
    };

    // Get new sketchpad size from user //
    let newSketchpadSize 
    // = prompt("How many squares per side would you like?", "");
    // if (newSketchpadSize == null) {
    //     newSketchpadSize = 16;
    // };
    while (true) {
        newSketchpadSize = prompt("How many squares per side would you like?", "");
        if (newSketchpadSize == null) {
            newSketchpadSize = 16;
            break;
        } else if (newSketchpadSize < 1 || newSketchpadSize % 1 != 0 || newSketchpadSize.isNaN == false) {
            alert("The number of squares must be a whole number more than 0!");
            continue;
        } else if (newSketchpadSize > 100) {
            confirm("This could take awhile to load. Are you sure you want to continue?")?
            newSketchpadSize : newSketchpadSize = 16;
            break;
        } else {
            break;
        }
    };

    // Create new sketchpad //
    createPad(newSketchpadSize);

    // Reset clicked buttons //
    shade.classList.remove("clickedButton");
    colour.classList.remove("clickedButton");
    shadeOff = true;
    colourOff = true;
};


function addShade(e) {
// Shade each square, darkening shade with each mouse over //
    // Remove existing classes //
    e.target.classList.remove("drawn");
    e.target.classList.remove("pen");

    // Get shadeCounter value to calculate shadeIndex //
    let squareFocus = e.target["id"];
    let shadeIndex = 0.25 * shadeCounter[squareFocus];
    e.target.style.backgroundColor = `rgba(255, 170, 166, ${shadeIndex})`;
    e.target.style.border = "none";
    shadeCounter[squareFocus]++; // Increment shadeCounter value for squareFocus//
};

function randomColour(e) {
// Colours each square with a random colour //
    // Remove existing classes //
    e.target.classList.remove("drawn");

    // Generate random values for rgb //
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    e.target.style.border = "none";
};

// Create initial sketchpad //
createPad();

// Add event listener for New Pad button //
newPad.addEventListener("click", createNewPad);

// Add event listener for Shade button //
let shadeOff = true;
shade.addEventListener("click", (e) => {
    // Switch colour off //
    e.target.classList.toggle("clickedButton");
    colour.classList.remove("clickedButton");
    colourOff = true;
    if (shadeOff) {
    // Switch On //
        allSquares.forEach((i) => {
            // Sets shadeCounter value to 1 for each square //
            shadeCounter[i["id"]] = 1;
            i.removeEventListener("mouseenter", randomColour);
            i.addEventListener("mouseenter", addShade);
            shadeOff = false;
        });
    } else {
    // Switch Off //
        allSquares.forEach((i) => {
            i.removeEventListener("mouseenter", addShade);
            i.addEventListener("mouseenter", (e) => {
                e.target.classList.add("drawn");
            })
            shadeOff = true;
        });
    };
});


// Add event listener for Colour button //
let colourOff = true;
colour.addEventListener("click", (e) => {
    // Switch shade off //
    e.target.classList.toggle("clickedButton");
    shade.classList.remove("clickedButton");
    shadeOff = true;
    if (colourOff) {
    // Switch On //
        allSquares.forEach((i) => {
            i.removeEventListener("mouseenter", addShade);
            // Add event listener for each square, calls function randomColour //
            i.addEventListener("mouseenter", randomColour);
            colourOff = false;
        });
    } else {
    // Switch off //
        allSquares.forEach((i) => {
            i.removeEventListener("mouseenter", randomColour);
            i.addEventListener("mouseenter", (e) => {
                e.target.classList.add("drawn");
            })
            colourOff = true;
        });
    };
});