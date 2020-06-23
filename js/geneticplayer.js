class GeneticAgent extends Player{

	constructor(start_x, start_y, jump, step, height, width, n_steps, n_actions, mutation_rate){
		super(start_x, start_y, jump, step, height, width);
		this.gene = new Array();
		this.n_steps = n_steps
		for(var i=0;i < n_steps; i++){
			this.gene.push(Math.floor(Math.random() * n_actions));
		}
		this.mutation_rate = mutation_rate
		this.current_move = 0;
		this.n_actions = n_actions
		this.fitness = 0.0;
	}

	getNextMove(){
		if (this.current_move < this.gene.length){return this.gene[this.current_move++];}
		this.dead=true;
		return -1;
	}

	biCrossOver(player2){
		var child = new GeneticAgent(this.start_x, this.start_y, this.jump_step, this.step, this.height, this.width, this.n_steps, this.n_actions, this.mutation_rate);
		var randomPoint = Math.floor(Math.random() * child.gene.length)
		for(let i=0; i<child.gene.length; i++){
			if (i < randomPoint){child.gene[i] = this.gene[i];}
			else{child.gene[i] = player2.gene[i];}
		}
		return child
	}

	uniCrossOver(){
		var  child = new GeneticAgent(this.start_x, this.start_y, this.jump_step, this.step, this.height, this.width, this.n_steps, this.n_actions, this.mutation_rate);
		child.gene = this.gene
		return child
	}

	mutation(){
		var mutation_rate = this.mutation_rate
		var n_actions = this.n_actions 
		this.gene.forEach(function(val){if(Math.random() < mutation_rate){val=Math.floor(Math.random() * n_actions)}})
	}

	move() {
		if (this.dead){return;}
		let next_move = this.getNextMove()
		if (next_move == 0){
			this.moveLeft = true;
			this.moveRight = false;
			this.moveUp = false;
		} else if(next_move == 1){
			this.moveRight = true;
			this.moveLeft = false;
			this.moveUp = false;
		} else if(next_move == 2){
			this.moveUp = true;
			this.moveRight = false;
			this.moveLeft = false;
		} else{
			this.moveUp = false;
			this.moveRight = false;
			this.moveLeft = false;
		}

		this.Up();
		this.Right();
		this.Left();
	}


}
