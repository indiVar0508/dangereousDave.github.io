const canvas = document.getElementById("my_canvas");
const context = canvas.getContext("2d");

// Initializong Object
player = new Player(start_x=50, start_y=canvas.height - 70, 
					jump=30, 
					step=5, height=50, width=25);
blocks = new Blocks(canvas.width, canvas.height)
reward = new Reward();
gravity = 10;
score = 0;
gameOver = false;

// Adding Listeners
keyDownHandler = function(event) {
	if (event.key == "Right" || event.key == "ArrowRight"){
		player.moveRight = true;
		player.moveLeft = false;
		player.moveUp = false;
	}
	else if (event.key == "left" || event.key == "ArrowLeft"){
		player.moveLeft = true;
		player.moveRight = false;
		player.moveUp = false;
	}
	else if (event.key == "up" || event.key == "ArrowUp"){
		player.moveUp = true;
		player.moveRight = false;
		player.moveLeft = false;
	}
}

keyUpHandler = function(event) {
	if (event.key == "Right" || event.key == "ArrowRight"){
		player.moveRight = false;
	}
	else if (event.key == "left" || event.key == "ArrowLeft"){
		player.moveLeft = false;
	}
	else if (event.key == "up" || event.key == "ArrowUp"){
		player.moveUp = false;
	}
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

playerToFallOnBlock = function(block, player) {
	if (((player.x > block[0] && player.x < block[0] + block[2]) || 
		(player.x + player.width> block[0] && player.x + player.width < block[0] + block[2])) &&
		((player.y + player.height> block[1]) && (player.y + player.height < block[1] + block[3]))) {
		player.y = block[1] - player.height;
		player.jumping=false;
		player.jump = player.jump_step;
	}
}


pullPlayer = function() {

	player.y += gravity
	
	// Bottom Wall Interaction
	if (player.y + player.height > canvas.height){
		player.jumping = false;
		player.jump = player.jump_step;
	}

	for (var i =0; i<blocks.level_1_blocks.length; i++){
		playerToFallOnBlock(blocks.level_1_blocks[i], player);
	}

	for (var i =0; i<blocks.level_2_blocks.length; i++){
		playerToFallOnBlock(blocks.level_2_blocks[i], player);
	}

}

playerInBoundary = function() {

	if (player.y + player.height > canvas.height){
		player.y = canvas.height - player.height;
		player.jumping = false;
	}
	if (player.y < 0){
		player.y = 0;
		player.jumping = false;
	}
	if (player.x + player.width > canvas.width){
		player.x = canvas.width - player.width;
	}
	if (player.x < 0){
		player.x = 0;
	}
}

check = function(block, player){
	return (((player.x > block[0] && player.x < block[0] + block[2]) || 
			(player.x + player.width > block[0] && player.x + player.width < block[0] + block[2])) && 
		((player.y > block[1] && player.y < block[1] + block[3]) || 
			(player.y + player.height > block[1] && player.y + player.height< block[1] + block[3])))
	
}

checkInteraction = function(blockArray, reward=false){
	for(var i=0; i<blockArray.length; i++){
		block = blockArray[i];
		if (check(block, player) && reward){
			return i;
		}
		else if (check(block, player)){
			if (player.moveLeft && !player.jumping){
				player.x = block[0] + block[2];
			}
			else if (player.moveRight && !player.jumping){
				player.x = block[0] - player.width;
			}
			else if (player.jumping){
				player.y = block[1] + block[3]
			}
			return
		}
	}
}


playerBlockInteraction = function() {
	
	checkInteraction(blocks.level_1_blocks)

	checkInteraction(blocks.level_2_blocks)

}


restartGame = function(){
	player = new Player(start_x=50, start_y=canvas.height - 70, 
					jump=30, 
					step=5, height=50, width=25);
	blocks = new Blocks(canvas.width, canvas.height)
	reward = new Reward();
	gravity = 10;
	score = 0;
	gameOver = false;
}

won = function() {
	if (check(blocks.winning_block, player)){
		if (player.hasKey){
			alert("Chicken Dinner!");
			player.moveLeft=false;
			player.x = blocks.winning_block[0] + blocks.winning_block[2] + 5;
			score += 10
			restartGame();	
		}
		else{
			player.moveLeft=false;
			player.x = blocks.winning_block[0] + blocks.winning_block[2] + 5;
			score -= 1
		}
	}
}

gotReward = function() {
	idx = checkInteraction(reward.reward, true);
	if (idx != undefined){
		if (reward.points[idx] == 5){
			player.hasKey = true;
		}
		score += reward.points[idx];
		reward.points[idx] = 0;
	}
}

showMessage = function() {
	context.fillStyle = "white";
	context.font = "30px Arial";
	context.fillText("Score : " + score, 5, 25);
}

main = function() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle="#303030";
	context.fillRect(0, 0, canvas.width, canvas.height);

	player.show();
	blocks.show();
	reward.show();
	player.move();

	// Gravity on Player
	pullPlayer();
	gotReward();
	
	// player in boundary
	playerInBoundary();
	playerBlockInteraction();
	won();
	showMessage();
	// Todo: RL/Genetic
	requestAnimationFrame(main);

	

}

main();
