  
    let previousPosition = null ;
    let history = [];
    let historyIndex=-1;
   
   
function onMouseDown(e) {
  
    if(!(actions.rectangle ||actions.rhombous || actions.circle || actions.pen || actions.eraser || actions.line || actions.arrow))
    {
        return;
    }
    previousPosition = {x:e.clientX , y:e.clientY};
    startIndex = history.length-1;
    ctx.beginPath();
    ctx.globalAlpha = (formState.opacity) / 10;
    ctx.strokeStyle =  formState.strokeStyle;
    ctx.lineWidth = formState.strokewidth; 
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp); 
    
}
function onMouseMove(e){
    let currentPosition= {x:e.clientX,y:e.clientY};
    if(actions.rectangle)
    {
        drawRectangle(currentPosition);
    }
    else if(actions.rhombous)
    {
        drawRhombous(currentPosition);
    }
    else if(actions.circle)
    {
        
        drawCircle(currentPosition);
    }
    else if(actions.pen)
    {
        drawFreeHand(currentPosition);
    }
    else if(actions.eraser)
    {
        handleErase(currentPosition);
    }
    else if(actions.line)
    {
        drawLine(currentPosition);
    }
    else if(actions.arrow)
    {
        drawArrow(currentPosition);
    }
   
    

}
function onMouseUp(){
    history.push(ctx.getImageData(0,0,canvas.width, canvas.height));
    historyIndex++;
    // console.log(history,historyIndex);
    canvas.removeEventListener("mousemove", onMouseMove);
    canvas.removeEventListener("mouseup", onMouseUp);
}
canvas.addEventListener("mousedown", onMouseDown);


function drawFreeHand(currentPosition)
{

 ctx.moveTo(previousPosition.x, previousPosition.y);
 ctx.lineTo(currentPosition.x, currentPosition.y);
 ctx.lineCap="round";
 ctx.lineJoin="round";
 ctx.stroke();
 ctx.closePath();
 previousPosition = currentPosition ;
}


function handleErase(currentPosition)
{
    ctx.clearRect(currentPosition.x, currentPosition.y,formState.eraserWidth,formState.eraserWidth);
}


function drawCircle(currentPosition)
{
     if(startIndex !== -1)
     {
        ctx.putImageData(history[startIndex], 0, 0);
        
     }
     else
     {
     ctx.clearRect(0,0, canvas.width, canvas.height);
    
     }
    if(startIndex!==history.length-1)
    {
       history.pop();
    }
    ctx.beginPath();
    let radius = Math.sqrt(
        (currentPosition.x - previousPosition.x)**2 +
     (currentPosition.y - previousPosition.y)**2
     );
    ctx.arc(previousPosition.x, previousPosition.y, radius, 0, 2 * Math.PI, true);
    ctx.stroke();
    
}


function  drawRectangle(currentPosition)
{
    if(startIndex !== -1)
     {
        ctx.putImageData(history[startIndex], 0, 0);
     }
     else
     {
       ctx.clearRect(0,0, canvas.width, canvas.height);
     }
     ctx.beginPath();
     let width = currentPosition.x - previousPosition.x;
     let height = currentPosition.y - previousPosition.y;
     ctx.strokeRect(previousPosition.x, previousPosition.y, width, height);
    
}
function drawRhombous(currentPosition)
{
    
    if(startIndex !== -1)
     {
        ctx.putImageData(history[startIndex], 0, 0);
     }
     else
     {
        ctx.clearRect(0,0, canvas.width, canvas.height);
     }
        ctx.beginPath();
        ctx.beginPath();
        ctx.moveTo(previousPosition.x, (previousPosition.y + currentPosition.y) / 2);
        ctx.lineTo((previousPosition.x + currentPosition.x) / 2, currentPosition.y);
        ctx.lineTo(currentPosition.x, (previousPosition.y + currentPosition.y) / 2);
        ctx.lineTo((previousPosition.x + currentPosition.x) / 2, previousPosition.y);
        ctx.lineTo(previousPosition.x, (previousPosition.y + currentPosition.y) / 2);
        ctx.stroke();
        ctx.closePath();
    
}
function drawLine(currentPosition)
{
     
    if(startIndex !== -1)
     {
        ctx.putImageData(history[startIndex], 0, 0);
     }
     else
     {
        ctx.clearRect(0,0, canvas.width, canvas.height);
     }

   ctx.beginPath();
    ctx.moveTo(previousPosition.x, previousPosition.y);
    ctx.lineTo(currentPosition.x, currentPosition.y);
    ctx.lineCap="round";
    ctx.lineJoin="round";
    ctx.stroke();
   
    
}
function drawArrow(currentPosition)
{
      
    if(startIndex !== -1)
     {
        ctx.putImageData(history[startIndex], 0, 0);
     }
     else
     {
        ctx.clearRect(0,0, canvas.width, canvas.height);
     }
     var headLength = 15;
     var angle = Math.atan2(currentPosition.y - previousPosition.y, currentPosition.x - previousPosition.x);
     ctx.beginPath();
     ctx.moveTo(previousPosition.x,previousPosition.y);
     ctx.lineTo(currentPosition.x, currentPosition.y);
     ctx.lineTo(currentPosition.x - headLength * Math.cos(angle - Math.PI / 6), currentPosition.y- headLength * Math.sin(angle - Math.PI / 6));
     ctx.moveTo(currentPosition.x, currentPosition.y);
     ctx.lineTo(currentPosition.x - headLength * Math.cos(angle + Math.PI / 6), currentPosition.y- headLength * Math.sin(angle + Math.PI / 6));
     ctx.stroke();
}

// ----------file-select from FM--------
function fileManager() {
    let file = document.createElement("input");
    file.setAttribute("type", "file");
    file.click();
    file.onchange = function(e) {
      let img = new Image();
      let fileReader = new FileReader();
      fileReader.onload = function(event) {
        img.onload = function() {
            let xPos = Math.floor(Math.random() * (600-200)+200);
            let yPos =Math.floor(Math.random() * (600-100)+250);
          ctx.drawImage(img, xPos, yPos, 300,200);
          history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        };
        img.src = event.target.result;
      };
      fileReader.readAsDataURL(e.target.files[0]);//this.files[0]
    };
  }
