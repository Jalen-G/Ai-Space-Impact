function Player(brain) {
	this.y = height / 2;
	this.x = 30;
	this.moveSpeed = 2.5;
	this.color = 255;
	this.health = 3;
	this.score = 0;
	this.aliveTime = 0;
	this.shotDelay = 250;
	this.lastShot = 0;
	if (brain instanceof NeuralNetwork) {
		this.brain = brain.copy();
		this.brain.mutate(mutate);
	} else {
		this.brain = new NeuralNetwork(3, 10, 4);
	}

	this.preload = function() {
		playerImg = loadImage("https://i.imgur.com/FMDiC53.png")
	}

	this.show = function () {
		image(playerImg, this.x, this.y);
	};

	this.update = function () {
		this.aliveTime++;
		let closestE = null;
		let closestD = Infinity;
		for (let i = 0; i < enemies.length; i++) {
			let d = enemies[i].x - this.x;
			if (d < closestD && d > 0) {
				closestE = enemies[i];
				closestD = d;
			}
		}

		try {
			let inputs = [closestD / width, closestE.y / height, player.y / height];
			let output = this.brain.predict(inputs);
			if (output[0] > 0.25) {
				this.shoot();
			}
			if (output[1] > 0.25) {
				this.moveUp();
			}
			if (output[2] > 0.25) {
				this.moveDown();
			}
		} catch {}
	};

	this.shoot = function () {
		var d = new Date();
		var currTime = d.getTime();
		if (abs(currTime - this.lastShot) > this.shotDelay) {
			this.lastShot = currTime;
			bullets.push(new Bullet(player.x, player.y));
		}
	};

	this.moveUp = function () {
		this.y -= this.moveSpeed;
		if (this.y < 0) nextGen();
	};

	this.moveDown = function () {
		this.y += this.moveSpeed;
		if (this.y > height) nextGen();
	};
}

function mutate(x) {
	if (random(1) < 0.5) {
		let offset = randomGaussian() / 2;
		let newx = x + offset;
		return newx;
	} else {
		return x;
	}
}
