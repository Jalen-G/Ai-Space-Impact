var bestAvailBrain;
var player;
var tempEnemy;
var wall;
var hit = false;
var playerHit = false;
var enemies = [];
var bullets = [];
var bestScore = 0;
var bestPlayer;
var bestFitness = 0;
var generation = 1;
var oldScore = 0;
var oldY = 0;

function setup() {
	createCanvas(400, 400);
	bestAvailBrain = loadJSON('https://api.jsonbin.io/b/5fc69e94177c556ef9b56a1a') 
	oldY = height / 2;
	player = new Player();
	player.preload()
	tempEnemy = new Enemy()
	tempEnemy.preload()
	enemies.push(tempEnemy);
	setInterval(function () {
		if (player.score == oldScore || player.y == oldY) {
			nextGen();
		} else {
			oldScore = player.score;
			oldY = player.y;
		}
	}, 15000);
}

function draw() {
	background('#caefdd');
	textSize(32);
	text(player.score, 20, 40);
	textSize(24);
	text(`Health: ${player.health}`, width - 110, 35);
	// Spawns and moves player
	player.update();
	player.show();
	if (frameCount % 80 == 0) {
		tempEnemy = new Enemy()
		enemies.push(tempEnemy);
	}
	// Spawns and moves enemy
	for (let i = 0; i < enemies.length; i++) {
		enemies[i].show();
		enemies[i].update();
		if (enemies[i] != undefined && enemies[i].x < -60) {
			enemies.splice(i, 1);
		}
	}
	// Checks every bullet for a colliosn with every enemy
	for (let i = 0; i < bullets.length; i++) {
		bullets[i].update();
		bullets[i].show();
		for (let j = 0; j < enemies.length; j++) {
			try {
				hit = collideLineRect(
					bullets[i].x1,
					bullets[i].y,
					bullets[i].x2,
					bullets[i].y,
					enemies[j].x,
					enemies[j].y,
					enemies[j].width,
					enemies[j].height
				);
				if (hit) {
					player.score++;
					enemies.splice(j, 1);
					bullets.splice(i, 1);
				}
			} catch {}
		}
		// Detects if bullets have gone off screen and deletes it
		if (bullets[i] != undefined && bullets[i].x1 > width) {
			bullets.splice(i, 1);
		}
	}
	// Checks if enemy collides with player
	if (enemies[0] != undefined) {
		playerHit = collideRectRect(
			enemies[0].x,
			enemies[0].y,
			enemies[0].width,
			enemies[0].height,
			player.x,
			player.y,
			30,
			21
		);
		if (playerHit) {
			enemies.splice(0, 1);
			player.health--;
		}
	}
	checkGameOver();
}

// Checks if the game is over
function checkGameOver() {
	if (player.health == 0) {
		nextGen();
	}
}

function loadBestBrain() {
	bestPlayer.brain = NeuralNetwork.deserialize(bestAvailBrain);
	generation = 0;
	bestScore = 0;
	nextGen();
}
