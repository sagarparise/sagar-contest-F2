let  undo = document.getElementById("undo");
let redo =  document.getElementById("redo");
let redoHistory = [];
function onUndo(){
    if(history.length >= 0)
    {
       redoHistory.push(history.pop());
     
        if(history.length== 0)
        {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        else
        {
            ctx.putImageData(history[history.length-1], 0, 0);
        }
    
       
    }

}
function onRedo(){
    if(redoHistory.length > 0) {
        history.push(redoHistory.pop())
        ctx.putImageData(history[history.length-1], 0, 0);
    }
    

}
undo.addEventListener("click", onUndo);
redo.addEventListener("click", onRedo);