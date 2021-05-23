function Bullet(x, y) {
	this.x1 = x;
	this.y = y + 10;
	this.x2 = x + 10;
	this.velocity = 4;
	this.show = function () {
		line(this.x1, this.y, this.x2, this.y);
		stroke(0);
	};

	this.update = function () {
		this.x1 += this.velocity;
		this.x2 += this.velocity;
	};
}
