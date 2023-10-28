const canvas=document.getElementById("canvas");
canvas.width=innerWidth;
canvas.height=innerHeight;
const ctx=canvas.getContext("2d");

// -------------pencil-section--------------


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
   strokeStyle:"black"

}
const actions={
    pen:false,
    rectangle:false,
    circle:false,
    rhombous:false,
    eraser:false
}

 function onInput(element)
 {
   newValue = element.value;
    if(element.name==="strokewidth")
    {
        formState[element.name]=parseInt(newValue);
    }
    else
    {
        formState[element.name]=newValue;
    }
    console.log(formState);
 }
 let actionButtons=document.querySelectorAll("#mid-icons > .btn");
 function onActionClick(element)
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
   
 }

 