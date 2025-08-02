const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container")

generateBtn.addEventListener("click", generatePalette)
// generatePalette is a method--generate it after

function generatePalette(){
    const colors = []
    
    // Generate 5 random colors (you have 5 color boxes in HTML)
    for(let i = 0; i < 5; i++){
        colors.push(generateRandomColor())
        //generateRandomColor is a method--to make
    }
    
    // get all color boxes and update them
    const colorBoxes = document.querySelectorAll(".color-box")
    
    colorBoxes.forEach((box, index) => {
        const color = colors[index]
        const colorDiv = box.querySelector(".color")
        const hexValue = box.querySelector(".hex-value")
        
        // update the background color and hex text
        colorDiv.style.backgroundColor = color
        hexValue.textContent = color
    })
}

function generateRandomColor(){
    const letters = "0123456789ABCDEF"
    let color = "#"

    for(let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random()*16)];
    }

    return color
}

// copy to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // success feedback
        alert("Color copied to clipboard: " + text)
    }).catch(err => {
        console.error('Failed to copy: ', err);
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert("Color copied to clipboard: " + text)
    });
}

// add click event listeners to copy buttons
document.addEventListener("DOMContentLoaded", function() {
    // add event listeners to copy buttons
    const copyButtons = document.querySelectorAll(".copy-btn")
    
    copyButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.stopPropagation() // prevent event bubbling
            const hexValue = button.parentElement.querySelector(".hex-value").textContent
            copyToClipboard(hexValue)
        })
    })
    
    //allow clicking on the color itself to copy
    const colorDivs = document.querySelectorAll(".color")
    colorDivs.forEach(colorDiv => {
        colorDiv.addEventListener("click", () => {
            const hexValue = colorDiv.querySelector(".hex-value").textContent
            copyToClipboard(hexValue)
        })
    })
})

//if you refreshes the page it generates another apllete
generatePalette();