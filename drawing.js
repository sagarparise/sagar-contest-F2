  
    let previousPosition = null ;
    let history = [];
    let historyIndex=-1;
   
function onMouseDown(e) {
  
    if(!(actions.rectangle ||actions.rhombous || actions.circle || actions.pen || actions.eraser || actions.line))
    {
        return;
    }
    previousPosition = {x:e.clientX , y:e.clientY};
    startIndex = history.length-1;
    ctx.beginPath();
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

}
function onMouseUp(){
    history.push(ctx.getImageData(0,0,canvas.width, canvas.height));
    historyIndex++;
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
    ctx.clearRect(currentPosition.x, currentPosition.y,formState.strokewidth,formState.strokewidth);
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
    history.push(ctx.getImageData(0,0, canvas.width, canvas.height));
    
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