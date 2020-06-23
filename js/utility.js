
// Utility Function

drawRect = function(x, y, width, height, col="#c54646") {
	context.fillStyle = col;
	context.fillRect(x, y, width, height);
}

setKeyVals = function(left, up, right){
		keyLeft = left;
		keyUp = up;
		keyRight = right;
}

function cancelAllAnimationFrames(){
   var id = window.requestAnimationFrame(function(){});
   while(id--){
     window.cancelAnimationFrame(id);
   }
}

handleGame = function(){
	evolve = !evolve
	if (evolve){
		cancelAllAnimationFrames()
		startEvolve()
	} else {
		cancelAllAnimationFrames()
		startMyself()
	}
}
// Adding Listeners
keyDownHandler = function(event) {
	if (event.key == "Right" || event.key == "ArrowRight"){setKeyVals(left=false, up=false, right=true);}
	if (event.key == "up" || event.key == "ArrowUp"){setKeyVals(left=false, up=true, right=false);}
	if (event.key == "left" || event.key == "ArrowLeft"){setKeyVals(left=true, up=false, right=false);}
}

keyUpHandler = function(event) {
	if (event.key == "Right" || event.key == "ArrowRight"){setKeyVals(left=false, up=false, right=false);}
	if (event.key == "left" || event.key == "ArrowLeft"){setKeyVals(left=false, up=false, right=false);}
	if (event.key == "up" || event.key == "ArrowUp"){setKeyVals(left=false, up=false, right=false);}
}
				
document.addEventListener("keydown", this.keyDownHandler, false);
document.addEventListener("keyup", this.keyUpHandler, false);