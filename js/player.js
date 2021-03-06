class Player{
	
	constructor(start_x, start_y, jump, step, height, width, color="#f0e609"){
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
		this.color = color

	}

	show(){
		if (!this.dead){
			drawRect(this.x, this.y, this.width, this.height,this.color);}
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

