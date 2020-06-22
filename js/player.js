class Player{
	
	constructor(start_x, start_y, jump, step, height, width){
		this.start_x = start_x
		this.start_y = start_y
		this.x = start_x;
		this.y = start_y;
		this.width = width;
		this.height = height;
		this.jump_step = jump;
		this.jump = jump;
		this.step = step;
		this.moveRight = false;
		this.moveLeft = false;
		this.moveUp = false;
		this.jumping = false;
		this.hasKey = false;
		this.dead = false;

	}

	show(){
		if (!this.dead){
			drawRect(this.x, this.y, this.width, this.height,"#f0e609");}
	}

	Up() {
		// Abtract naive way to mimic gravity
		if (this.moveUp && !this.jumping){
			this.y -= this.jump;
			this.jumping = true;
		}
		if (this.jumping){
			this.jump -= 1;
			this.y -= this.jump;
		}
		if (this.jump < -this.jump_step){
			this.jumping=false;
			this.jump = this.jump_step;
		}
	}

	Right() {
		if (this.moveRight){this.x += this.step;}
	}

	Left() {
		if (this.moveLeft){this.x -= this.step;}
	}

	move() {
		if (this.dead){return;}
		this.moveRight = keyRight;
		this.moveLeft = keyLeft;
		this.moveUp = keyUp;
		this.Up();
		this.Right();
		this.Left();
	}

}

class GeneticAgent extends Player{

	constructor(start_x, start_y, jump, step, height, width, n_steps, n_actions=3){
		super(start_x, start_y, jump, step, height, width);
		this.gene = new Array();
		for(var i=0;i < n_steps; i++){
			this.gene.push(Math.floor(Math.random() * n_actions));
		}
		this.current_move = 0;
		this.fitness = 0.0;
	}

	getNextMove(){
		if (this.current_move < this.gene.length){return this.gene[this.current_move++];}
		this.dead=true;
		return -1;
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
