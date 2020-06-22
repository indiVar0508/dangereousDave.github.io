class Population{

	constructor(population_size, player){
		this.population_size = population_size;
		this.species = []
		for(var i =0; i < population_size; i++){
			this.species.push(new GeneticAgent(start_x=player.start_x, start_y=player.start_y, jump=player.jump_step, 
								step=player.jump, height=player.height, width=player.width, player.gene.length));
		}
		console.log("population created", population_size)
	}

	showPlayer(player){
		console.log("a");
		player.show();
	}

	movePlayer(player){
		player.move();
	}

	renderPopulation(){
		this.species.forEach(function(player){player.show();});
	}

	movePopulation(){
		this.species.forEach(function(player){player.move();});
	}


}