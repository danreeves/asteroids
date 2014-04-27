ShipMoving = function(x,y) {


	this.pos = new Vector2(x,y);
	this.angle = 0;
	this.vel = new Vector2(0,0);
	var temp = new Vector2(0,0);

	this.thrustPower = 0.2;
	this.rotateSpeed = 8;

	this.update = function() {
		// if (this.pos.y == canvas.height) {
		// 	this.vel.y = 0;
		// 	this.pos.y = canvas.height-1;
		// }
		// else {
		// 	this.vel.y += 0.05;
		// }
		// this.vel.x *= 0.99;
		// this.vel.y *= 0.99;
		// this.pos.plusEq(this.vel);
		//
		this.pos.plusEq(this.vel);

		if(this.thrustSize>0) this.thrustSize--;

	};

	this.thrust = function() {

		temp.reset(this.thrustPower,0);

		temp.rotate(this.angle);
		this.vel.plusEq(temp);

	};

	this.rotateLeft = function() {
		this.angle -= this.rotateSpeed;
	};
	this.rotateRight = function() {
		this.angle += this.rotateSpeed;
	};


	// c = canvas context
	this.draw = function(c, thrusting) {

		c.save();
		c.translate(this.pos.x, this.pos.y);
		c.rotate(this.angle * Vector2Const.TO_RADIANS);

		c.lineWidth = 2;

		if (thrusting) {
			c.strokeStyle = "red";
			c.fillStyle = "orange";
			c.beginPath();
			c.moveTo(-12, 2);
			c.lineTo(-12, -2);
			c.lineTo(randomRange(-15,-20), 0);
			c.closePath();
			c.stroke();
			c.fill();
		}

		c.strokeStyle = "#555";
		c.fillStyle = '#333';
		c.beginPath();
		c.moveTo(-10, -10);
		c.lineTo(-10, 10);
		c.lineTo(14, 0);
		c.closePath();
		c.stroke();
		c.fill();
		c.restore();

	};


};
