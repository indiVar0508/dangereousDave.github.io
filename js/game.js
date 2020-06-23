class Game{

		constructor(player, blocks, reward, gravity){
			this.player = player;
			this.blocks = blocks;
			this.reward = reward;
			this.gravity = gravity;
			this.score = 0;
			this.gameOver = false;

		}

		
		playerToFallOnBlock = function(block, player) {
			if (((player.x > block[0] && player.x < block[0] + block[2]) || 
				(player.x + player.width> block[0] && player.x + player.width < block[0] + block[2])) &&
				((player.y + player.height> block[1]) && (player.y + player.height < block[1] + block[3]))) {
				player.y = block[1] - player.height;
				player.jumping=false;
				player.jump = player.jump_step;
			}
		}
	
	
		pullPlayer = function(player) {

			player.y += this.gravity
			
			// Bottom Wall Interaction
			if (player.y + player.height > canvas.height){
				player.jumping = false;
				player.jump = player.jump_step;
			}

			for (var i =0; i<this.blocks.level_1_blocks.length; i++){
				this.playerToFallOnBlock(this.blocks.level_1_blocks[i], player);
			}

			for (var i =0; i<this.blocks.level_2_blocks.length; i++){
				this.playerToFallOnBlock(this.blocks.level_2_blocks[i], player);
			}

		}
	
		playerInBoundary = function(player) {
	
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
	
		checkInteraction = function(blockArray, player, reward=false){
			for(var i=0; i<blockArray.length; i++){
				var block = blockArray[i];
				if (this.check(block, player) && reward){
					return i;
				}
				else if (this.check(block, player)){
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
	
	
		playerBlockInteraction = function(player) {
			
			this.checkInteraction(this.blocks.level_1_blocks, player)
	
			this.checkInteraction(this.blocks.level_2_blocks, player)
	
		}
	
	
		restartGame = function(){
			this.player = new Player(start_x=50, start_y=canvas.height - 70, 
					jump=30, 
					step=5, height=50, width=25);
			this.blocks = new Blocks(canvas.width, canvas.height)
			this.reward = new Reward();
			this.score = 0;
			this.gameOver = false;
			keyLeft = keyRight = keyUp = false;
		}
	
		won = function(player) {
			if (this.check(this.blocks.winning_block, player)){
				if (player.hasKey){
					alert("Noice, GG WP");
					player.moveLeft=false;
					player.x = this.blocks.winning_block[0] + this.blocks.winning_block[2] + 5;
					this.score += 10
					this.gameOver = true;
					this.restartGame()
				}
				else{
					player.moveLeft=false;
					player.x = this.blocks.winning_block[0] + this.blocks.winning_block[2] + 5;
					this.score -= 1
				}
			}
		}
	
		gotReward = function(player) {
			let idx = this.checkInteraction(this.reward.reward, player, true);
			if (idx != undefined){
				if (this.reward.points[idx] == 5){
					player.hasKey = true;
					player.color = "#AFAFAF"
				}
				if (this.reward.points[idx] == 3){
					player.height += 5;
					player.width += 3;
					player.step += 2;
					player.jump_step += 1;
				}
				this.score += this.reward.points[idx];
				this.reward.points[idx] = 0;
			}
		}
	
		showMessage = function(msg) {
			context.fillStyle = "white";
			context.font = "30px Arial";
			context.fillText(msg, 5, 25);
		}
	
		main = function() {
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.fillStyle="#303030";
			context.fillRect(0, 0, canvas.width, canvas.height);
	
			this.player.show();
			this.blocks.show();
			this.reward.show();
			this.player.move();
	
			// Gravity on Player
			// console.log(this);
			this.pullPlayer(this.player);
			this.gotReward(this.player);
			
			// player in boundary
			this.playerInBoundary(this.player);
			this.playerBlockInteraction(this.player);
			this.won(this.player);
			this.showMessage("Score : " + this.score);
			// Todo: RL/Genetic	
		}	
}

