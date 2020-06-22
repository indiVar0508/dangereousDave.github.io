const canvas = document.getElementById("my_canvas");
const context = canvas.getContext("2d");

// Initializong Object
Character = new Player(start_x=50, start_y=canvas.height - 70, 
					jump=30, 
					step=5, height=50, width=25);
Bricks = new Blocks(canvas.width, canvas.height)
points = new Reward();
// gravity = 10;
// score = 0;
// gameOver = false;
keyLeft = keyRight = keyUp = false;


AICharcater = new GeneticAgent(start_x=50, start_y=canvas.height - 70, 
					jump=30, 
					step=5, height=50, width=25, 5000);

dave = new Game(Character, Bricks, points, 10);
// dave = new geneticGame(AICharcater, Bricks, points, 10, 50)
startGame=function(){
	dave.main();
	requestAnimationFrame(startGame);
}

startGame()
