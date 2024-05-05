//Declaration
const colors = document.querySelectorAll(".color"),
saveButton = document.querySelector(".download"),
clearButton = document.querySelector(".clear"),
canvas = document.querySelector("canvas"),
ctx = canvas.getContext("2d");

let boldInput = document.querySelector(".bold"),
inputColor = document.querySelector(".choosen-color"),
outputWidth = document.querySelector(".bold-value");

//Default state
let currentColor = "",
width = 5,
drawing = false,
prevX = null,
prevY = null;

//Set pen size
ctx.lineWidth = width


function clearCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function saveCanvas() {
    const link = document.createElement("a");
    let data = canvas.toDataURL("imag/png");
    link.download = "canvas";
    link.href = data;
    link.click();
}
//Event listeners


// pick up a color
colors.forEach((item) =>{
    item.addEventListener("click" , () =>{
        // get a color
        currentColor = item.getAttribute("color");
    })
})
// color
inputColor.addEventListener("input" , (e) =>{
    currentColor = e.target.value;
})
// pen size
boldInput.addEventListener("input" , (e) =>{
    width = e.target.value;
    ctx.lineWidth = width;
    outputWidth.textContent = width;
})

// mouse events

addEventListener("mousemove" , (e) =>{
// if is drawing true , draw
let mouseX = e.clientX - canvas.offsetLeft;
let mouseY = e.clientY - canvas.offsetTop;
if(drawing) {
    ctx.strokeStyle = currentColor;
    ctx.beginPath();
    ctx.moveTo(prevX,prevY);
    ctx.lineTo(mouseX,mouseY);
    ctx.stroke();
    prevX = mouseX;
    prevY = mouseY;
}
})

addEventListener("mousedown" , (e) =>{
  drawing = true;
  prevX = e.clientX - canvas.offsetLeft;
  prevY = e.clientY - canvas.offsetTop;
})
addEventListener("mouseup" , (e) =>{
    drawing = false;
})

saveButton.addEventListener("click" , saveCanvas);
clearButton.addEventListener("click" , clearCanvas);

function setWindowSize() {
    canvas.width = innerWidth // widnow.innerWidht
    canvas.height = innerHeight;
}

onload = setWindowSize();