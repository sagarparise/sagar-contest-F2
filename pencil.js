const canvas=document.getElementById("canvas");
canvas.width=innerWidth;
canvas.height=innerHeight;
const ctx=canvas.getContext("2d");

//free hand drawing
//canvas.addEventListener("mousedown", onMouseDown)
let drawingColor = "red";
let previousPosition = null ;

function onMouseDown(e) {
    previousPosition = [ e.clientX , e.clientY];
    ctx.strokeStyle = drawingColor;
    ctx.lineWidth = 2; 
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp); 
}

function onMouseMove(e){ 
   
    let currentPosition = [ e.clientX , e.clientY ];
  
    ctx.beginPath();
    ctx.moveTo(...previousPosition);
    ctx.lineTo(...currentPosition);
    ctx.stroke();
    ctx.closePath();
    previousPosition = currentPosition ;
}

function onMouseUp(e){ 
    canvas.removeEventListener("mousemove", onMouseMove);
}


const pencil = document.getElementById("pen");
let isPencilActive = false ;


function onPencilClick() {
   let penAct= pencil.classList.toggle("active");
    isPencilActive = penAct;

    if(isPencilActive) {
        canvas.style.cursor="crosshair";
        canvas.addEventListener("mousedown", onMouseDown); 
    }
    else {
        canvas.style.cursor = "crosshair";
        canvas.removeEventListener("mousedown", onMouseDown)
    }
}

pencil.addEventListener("click", onPencilClick) ;