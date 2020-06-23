const canvas = document.getElementById("my_canvas");
const context = canvas.getContext("2d");

// Initializong Object
keyLeft = keyRight = keyUp = evolve = false;
Bricks = new Blocks(canvas.width, canvas.height)


startMyself=function(){
	Character = new Player(start_x=50, start_y=canvas.height - 70, 
					jump=30, 
					step=5, height=50, width=25);

	points = new Reward();

	dave = new Game(Character, Bricks, points, 10);

	start=function(){
		dave.main();
		requestAnimationFrame(start);
	}
	start()
}
startEvolve = function(){

	AICharcater = new GeneticAgent(start_x=50, start_y=canvas.height - 70, 
					jump=30, 
					step=5, height=50, width=25, n_steps=500, n_actions=3, mutation_rate=0.05);
	pointsEvolve = new Reward(true);
	dave = new geneticGame(AICharcater, Bricks, pointsEvolve, 10, 50)

	start=function(){
		dave.main();
		requestAnimationFrame(start);
	}
	start()
}

startMyself()
