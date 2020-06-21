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
	
	
		pullPlayer = function() {

			this.player.y += this.gravity
			
			// Bottom Wall Interaction
			if (this.player.y + this.player.height > canvas.height){
				this.player.jumping = false;
				this.player.jump = this.player.jump_step;
			}

			for (var i =0; i<this.blocks.level_1_blocks.length; i++){
				this.playerToFallOnBlock(this.blocks.level_1_blocks[i], this.player);
			}

			for (var i =0; i<this.blocks.level_2_blocks.length; i++){
				this.playerToFallOnBlock(this.blocks.level_2_blocks[i], this.player);
			}

		}
	
		playerInBoundary = function() {
	
			if (this.player.y + this.player.height > canvas.height){
				this.player.y = canvas.height - this.player.height;
				this.player.jumping = false;
			}
			if (this.player.y < 0){
				this.player.y = 0;
				this.player.jumping = false;
			}
			if (this.player.x + this.player.width > canvas.width){
				this.player.x = canvas.width - this.player.width;
			}
			if (this.player.x < 0){
				this.player.x = 0;
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
				var block = blockArray[i];
				if (this.check(block, this.player) && reward){
					return i;
				}
				else if (this.check(block, this.player)){
					if (this.player.moveLeft && !this.player.jumping){
						this.player.x = block[0] + block[2];
					}
					else if (this.player.moveRight && !this.player.jumping){
						this.player.x = block[0] - this.player.width;
					}
					else if (this.player.jumping){
						this.player.y = block[1] + block[3]
					}
					return
				}
			}
		}
	
	
		playerBlockInteraction = function() {
			
			this.checkInteraction(this.blocks.level_1_blocks)
	
			this.checkInteraction(this.blocks.level_2_blocks)
	
		}
	
	
		restartGame = function(){
			this.player = new Player(start_x=this.player.start_x, start_y=this.player.start_y, 
							jump=this.player.jump_step, 
							step=this.player.step, height=this.player.height, width=this.player.width);
			this.blocks = new Blocks(canvas.width, canvas.height)
			this.reward = new Reward();
			this.score = 0;
			this.gameOver = false;
			keyLeft = keyRight = keyUp = false;
		}
	
		won = function() {
			if (this.check(this.blocks.winning_block, this.player)){
				if (this.player.hasKey){
					alert("Chicken Dinner!");
					this.player.moveLeft=false;
					this.player.x = this.blocks.winning_block[0] + this.blocks.winning_block[2] + 5;
					this.score += 10
					this.gameOver = true;
					this.restartGame();	
				}
				else{
					this.player.moveLeft=false;
					this.player.x = this.blocks.winning_block[0] + this.blocks.winning_block[2] + 5;
					score -= 1
				}
			}
		}
	
		gotReward = function() {
			let idx = this.checkInteraction(this.reward.reward, true);
			if (idx != undefined){
				if (this.reward.points[idx] == 5){
					this.player.hasKey = true;
				}
				this.score += this.reward.points[idx];
				this.reward.points[idx] = 0;
			}
		}
	
		showMessage = function() {
			context.fillStyle = "white";
			context.font = "30px Arial";
			context.fillText("Score : " + this.score, 5, 25);
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
			this.pullPlayer();
			this.gotReward();
			
			// player in boundary
			this.playerInBoundary();
			this.playerBlockInteraction();
			this.won();
			this.showMessage();
			// Todo: RL/Genetic	
		}	
}
