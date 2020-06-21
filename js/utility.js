
// Utility Function

drawRect = function(x, y, width, height, col="#c54646") {
	context.fillStyle = col;
	context.fillRect(x, y, width, height);
}
// Adding Listeners
keyDownHandler = function(event) {
	if (event.key == "Right" || event.key == "ArrowRight"){
		keyRight = true;
		keyLeft = false;
		keyUp = false;
	}
	else if (event.key == "left" || event.key == "ArrowLeft"){
		keyLeft = true;
		keyRight = false;
		keyUp = false;
	}
	else if (event.key == "up" || event.key == "ArrowUp"){
		keyUp = true;
		keyRight = false;
		keyLeft = false;
	}
}

keyUpHandler = function(event) {
	if (event.key == "Right" || event.key == "ArrowRight"){
		keyRight = false;
	}
	else if (event.key == "left" || event.key == "ArrowLeft"){
		keyLeft = false;
	}
	else if (event.key == "up" || event.key == "ArrowUp"){
		keyUp = false;
	}
}
				
document.addEventListener("keydown", this.keyDownHandler, false);
document.addEventListener("keyup", this.keyUpHandler, false);