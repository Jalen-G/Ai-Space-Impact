function Enemy() {
	this.height = 15;
	this.width = 24;
	this.y = Math.floor(Math.random() * (height - 120)) + 60;
	this.x = width + 30;
	this.moveSpeed = 2.5;
	this.color = 255;

	this.preload = function() {
		enemyImg = loadImage('https://i.imgur.com/0eFzhnf.png')
	}

	this.show = function () {
		image(enemyImg, this.x, this.y);
	};

	this.update = function () {
		this.x -= this.moveSpeed;
	};
}
