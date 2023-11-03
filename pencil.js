const canvas=document.getElementById("canvas");
canvas.width=innerWidth;
canvas.height=innerHeight;
let colorVisible = document.getElementById("strokeVisible");
let bgVisible = document.getElementById("bgVisible");
let isMenu = document.querySelector("#top-icons > button");
let mnuBar = document.querySelector(".menu-bar");
const ctx=canvas.getContext("2d");


//  ------------ color menu ----------
let styleMenu = document.querySelector(".style-menu");
let colorMenu = document.querySelector(".color-menu");
function menuToggle()
{
  styleMenu.classList.toggle("active");
  colorMenu.classList.toggle("hide");
}

// --------------Menu-Bar------------
let canvasBg = {
  background:"white"
}
function setBgCanvas(element)
{
    bgValue = element.value;
   canvasBg[element.name]= bgValue;
   ctx.fillStyle = canvasBg.background;
   ctx.fillRect(0,0,canvas.width,canvas.height);
    bgVisible.value = bgValue;
}

function isMenuFun()
{
    isMenu.classList.toggle("active");
    mnuBar.classList.toggle("hide");
}
 isMenu.addEventListener("click",isMenuFun);

// -----------state---------

const formState={
    strokewidth:2,
   strokeStyle:"black",
   eraserWidth:20,
   opacity:10

}
const actions={
    pen:false,
    rectangle:false,
    circle:false,
    rhombous:false,
    line:false,
    text:false,
    arrow:false,
    eraser:false 
}
let strokeBtn = document.querySelectorAll(".strokeBtn");
function strokeBtnFun(element)
{
    
    for(let btns of strokeBtn)
    {
        if(btns.classList.contains("active"))
        {
            btns.classList.remove("active");
        }
       
    }
    element.classList.toggle("active");
}


 function onInput(element)     //inline called
 {

   newValue = element.value;
   element.style.cssText ="border :1px solid red";
    if(element.name==="strokewidth" || element.name==="eraserWidth" || element.name === "opacity")
    {
        formState[element.name]=parseInt(newValue);
    }
    else
    {
        formState[element.name]=newValue;
        colorVisible.value =newValue;
    }
    
 }

 let actionButtons=document.querySelectorAll("#mid-icons > .btn");

 function onActionClick(element)    //inline called
 {
   
    let actionName=element.id;
    for(let btns of actionButtons)
    {
        if(btns.classList.contains("active") && btns.id!==actionName)
        {
            btns.classList.remove("active");
        }
      
    }
    element.classList.toggle("active");
   

   for(let btns of actionButtons)
   {
    let isActive = btns.classList.contains("active");
    actions[btns.id]=isActive;
   }
     
// ------------text-enable---------

// variable to store mouse x and y positions
let mouseX = 0;
let mouseY = 0;
var startingX = 0;

  function writeText()
  {
    var text = "Hello, Canvas!";

  // Set the font properties
  ctx.font = "30px Arial";
  ctx.fillStyle = "black";

  // Write the text on the canvas
  ctx.fillText(text, 50, 100);

//    canvas.addEventListener("click", function(e){
//     // get position to write text
//     mouseX = e.pageX;
//    mouseY = e.pageY;
//    startingX = mouseX;
//    });

//    document.addEventListener("keydown", function(e){
//     console.log
//     ctx.font = "16px arial";
//     //write text to canvas
//     ctx.fillText(e.key, mouseX, mouseY);
//     //to move cursor forward
//     mouseX += ctx.measureText(e.key).width;
//    });

  }
   if(actions.text)
   {
   writeText();
  
   }

 }

//   ----------Zoom-in-out-------------
 
let scale = 1;
const scaleFactor = 0.1;
 function zoomIn(){
    
   if(scale>scaleFactor)
   {
    scale-= scaleFactor;
    zoom();
   }
// scale-= scaleFactor;
// zoom();
   
 }
 function zoomOut()
 {
    scale+=scaleFactor;
    zoom();
 }
 function zoom()
 {
   ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.save();
    ctx.scale(scale, scale);
    ctx.fillStyle="red";
    ctx.fillRect(10,10,50,50);
    ctx.restore();
   
 }
// zoom(); // Initial draw
