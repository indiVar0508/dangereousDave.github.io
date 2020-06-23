class geneticGame extends Game{

	constructor(player, blocks, reward, gravity, population_size){
		super(player, blocks, reward, gravity);
		this.population = new Population(population_size, player);
	}

	pullPlayers = function(player, n) {

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

	gotReward = function(player) {
		let idx = this.checkInteraction(this.reward.reward, player, true);
		if (idx != undefined){
			if (this.reward.points[idx] == 5){
				player.hasKey = true;
				player.color = "#AFAFAF"
			}
			if (this.reward.points[idx] == 3){
				// player.step += 2;
				player.jump_step += 1;
			}
			// if (this.reward.points[idx] == 1){
			// 	// player.step += 2;
			// }

			player.fitness += this.reward.points[idx];
			this.reward.points[idx] = 0;	
		}
		}

	restartGame = function(){
			this.blocks = new Blocks(canvas.width, canvas.height)
			this.reward = new Reward(this.reward.fixed);
			keyLeft = keyRight = keyUp = false;
		}

	won = function(player) {
			if (this.check(this.blocks.winning_block, player)){
				if (player.hasKey){
					// alert("Chicken Dinner!");
					player.moveLeft=false;
					player.x = this.blocks.winning_block[0] + this.blocks.winning_block[2] + 5;
					player.fitness += 100
					player.dead = true
					player.color="green"
				}
				else{
					player.moveLeft=false;
					player.x = this.blocks.winning_block[0] + this.blocks.winning_block[2] + 5;
					player.fitness -= 50
					player.color="red"
					// player.dead = true
				}
			}
	}


	main = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillStyle="#303030";
		context.fillRect(0, 0, canvas.width, canvas.height);

		this.population.renderPopulation();
		this.blocks.show();
		this.reward.show();

		this.population.movePopulation();

		// Gravity on Player
		for(var i=0; i<this.population.species.length; i++){this.pullPlayer(this.population.species[i]);}
		// Block Intraction
		for(var i=0; i<this.population.species.length; i++){this.gotReward(this.population.species[i]);}
		for(var i=0; i<this.population.species.length; i++){this.playerInBoundary(this.population.species[i]);}
		for(var i=0; i<this.population.species.length; i++){this.playerBlockInteraction(this.population.species[i]);}
		// Won?
		for(var i=0; i<this.population.species.length; i++){this.won(this.population.species[i]);}
		if(this.population.allAlive()){
			this.population.evolve();
			this.restartGame()
		}
		this.showMessage("Generation : " + this.population.GenerationNo);
		// Todo: Make game Logic when won for Genetic	
		}	

}