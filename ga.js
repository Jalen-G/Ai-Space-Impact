function nextGen() {
	var fitness =
		(player.score / (player.aliveTime * 0.001) + player.health) *
			(player.score * 0.1) +
		player.aliveTime * 0.001;
	generation++;
	enemies = [];
	bullets = [];
	if (fitness >= bestFitness) {
		bestFitness = fitness;
		bestPlayer = player;
	}
	if (player.score > bestScore) bestScore = player.score;
	document.getElementById(
		'generationText'
	).innerText = `Generatiton: ${generation}`;
	document.getElementById('scoreText').innerText = `Best Score: ${bestScore}`;
	player = new Player(bestPlayer.brain);
}
