class Blocks{

	constructor(gameWidth, gameHeight){
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
		this.level_2_blocks = new Array();
		this.level_1_blocks = new Array();
		
		// Level 1 Block Cords
		this.level_1_blocks.push([200, 350, 250, 50]);

		this.level_1_blocks.push([650,  350, 50, 150]);
		this.level_1_blocks.push([700,  350, 400, 50]);

		let i = this.level_1_blocks.length - 1
		this.winning_block = [this.level_1_blocks[i][0]+1, this.level_1_blocks[i][1] + this.level_1_blocks[i][3], 40, gameHeight - this.level_1_blocks[i][1]]

		// Level 2 Block Cords
		let start_x = 0
		let start_y_even = 200
		let start_y_odd = 100
		let delta_x = 145;

		for(let i = 0; i < 9; i++){
			if (i % 2 == 0 ){this.level_2_blocks.push([start_x, start_y_even, 100, 50]);}
			else {this.level_2_blocks.push([start_x, start_y_odd,  100, 50]);}
			start_x += delta_x
		}



	}
	show() {

		// Level 1 Block
		for(let i = 0; i < this.level_1_blocks.length; i++){
			drawRect(this.level_1_blocks[i][0], this.level_1_blocks[i][1], this.level_1_blocks[i][2], this.level_1_blocks[i][3]);
		}
		// Exit Gate
		drawRect(this.winning_block[0], this.winning_block[1], this.winning_block[2], this.winning_block[3], "#bf8310");

		// Level 2 Block

		for(let i = 0; i < this.level_2_blocks.length; i++){
			drawRect(this.level_2_blocks[i][0], this.level_2_blocks[i][1], this.level_2_blocks[i][2], this.level_2_blocks[i][3]);
		}

	}
}

class Reward extends Blocks{

	constructor(){
		super();
		this.key = Math.floor(Math.random() * 9);
		this.trophy = Math.floor(Math.random() * 9);
		if (this.key == this.trophy){
			this.trophy += 1;
		}

		this.reward = new Array();
		this.points = new Array();

		for(let i = 0; i < 9; i++){
			this.reward.push([this.level_2_blocks[i][0] + 30, this.level_2_blocks[i][1] - 35, this.level_2_blocks[i][2] - 55, 36]);
			this.points[i] = 1;
			if (this.key == i){this.points[i] = 5;}
			else if (this.trophy == i){this.points[i] = 3;}
		}
	}

	show() {

		for(let i = 0; i < this.level_2_blocks.length; i++){
			if (this.points[i] == 0){continue;}
			if (i == this.key){
				drawRect(this.reward[i][0], this.reward[i][1], this.reward[i][2], this.reward[i][3], "#FFFFFF");
				continue;
			}
			else if(i == this.trophy){
				drawRect(this.reward[i][0], this.reward[i][1], this.reward[i][2], this.reward[i][3], "#11c11c");
				continue;
			}
			drawRect(this.reward[i][0], this.reward[i][1], this.reward[i][2], this.reward[i][3], "#2cbec9");
		}

	}

}