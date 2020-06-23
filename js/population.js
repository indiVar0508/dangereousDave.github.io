class Population{

	constructor(population_size, player, uniRate){
		this.population_size = population_size;
		this.species = []
		this.basePlayer = player
		for(var i =0; i < population_size; i++){
			this.species.push(new GeneticAgent(start_x=player.start_x, start_y=player.start_y, jump=player.jump_step, 
								step=player.jump, height=player.height, width=player.width, n_steps=player.gene.length,
								n_actions=player.n_actions, mutation_rate=player.mutation_rate));
		}
		this.matingPool = []
		this.uniRate = uniRate
		this.GenerationNo = 1
	}

	renderPopulation(){
		this.species.forEach(function(player){player.show();});
	}

	movePopulation(){
		this.species.forEach(function(player){player.move();});
	}

	allAlive(){
		var allDead = false;
		this.species.forEach(function(player){allDead = allDead || player.dead})
		return allDead
	}

	evolve(){
		this.fitness()
		this.naturalSelection()
		this.generate()
		this.GenerationNo += 1
	}

	fitness(){
		this.species.forEach(function(player){player.fitness += (player.gene.length - player.current_move)})
	}

	naturalSelection(){
		var matingPool = []
		let maxFitness = 0
		this.species.forEach(function(player){if (player.fitness > maxFitness) {maxFitness = player.fitness;}})
		this.species.forEach(function(player){
			let score = (player.fitness / maxFitness) * 100;
			while(score > 0){
				matingPool.push(player);
				score--;
			}
		});
		this.matingPool = matingPool
	}

	generate(){
		this.species = []
		for(var i=0; i<this.population_size; i++){
			var p1 = this.matingPool[Math.floor(Math.random()*this.matingPool.length)]
			var p2 = this.matingPool[Math.floor(Math.random()*this.matingPool.length)]
			let child = new GeneticAgent(start_x=this.basePlayer.start_x, start_y=this.basePlayer.start_y, jump=this.basePlayer.jump_step, 
								step=this.basePlayer.jump, height=this.basePlayer.height, width=this.basePlayer.width, n_steps=this.basePlayer.gene.length,
								n_actions=this.basePlayer.n_actions, mutation_rate=this.basePlayer.mutation_rate);
			if (Math.random() < this.uniRate){
				if (Math.random() < 0.5){child = p1.uniCrossOver()}
				else{child = p2.uniCrossOver()}
			}
			else{
				if (Math.random() < 0.5){child = p1.biCrossOver(p2)}
				else{child = p2.biCrossOver(p1)}
			}
			child.mutation()	
			this.species.push(child)
		}
	}

}