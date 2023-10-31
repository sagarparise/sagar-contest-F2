const canvas=document.getElementById("canvas");
canvas.width=innerWidth;
canvas.height=innerHeight;
let colorVisible = document.getElementById("strokeVisible");
const ctx=canvas.getContext("2d");


//  ------------ color menu ----------
let menu = document.querySelector("#top-icons > button");
menu.addEventListener("click", menuToggle);
let colorMenu = document.querySelector(".color-menu");
function menuToggle()
{
  menu.classList.toggle("active");
    colorMenu.classList.toggle("hide");
}

// -----------state---------

const formState={
    strokewidth:3,
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
    eraser:false 
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
   console.log(actions);
 }

