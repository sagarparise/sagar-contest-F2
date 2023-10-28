  
    let previousPosition = null ;
   
function onMouseDown(e) {
  
    if(!(actions.rectangle ||actions.rhombous || actions.circle || actions.pen || actions.eraser))
    {
        return;
    }
    previousPosition = [ e.clientX , e.clientY];
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
        
    }
    else if(actions.rhombous)
    {

    }
    else if(actions.circle)
    {

    }
    else if(actions.pen)
    {
        drawFreeHand(currentPosition);
    }
    else if(actions.eraser)
    {
        handleErase(currentPosition);
    }
    else
    {

    }

}
function onMouseUp(){
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