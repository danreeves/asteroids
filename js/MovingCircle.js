MovingCircle = function (x,y,radius){

	var pos = this.pos = new Vector2(x,y);
	var vel = this.vel = new Vector2(0,0);
	this.radius = radius;
	this.enabled = true;

	// temp vector to calculate distance from circle in hitTest
	var diff = new Vector2(0,0);

	this.update = function(canvas) {

		pos.plusEq(vel);

		if(pos.x+this.radius < 0) pos.x = canvas.width+this.radius;
		else if (pos.x-this.radius > canvas.width) pos.x = -this.radius;

		if(pos.y+this.radius < 0) pos.y = canvas.height+this.radius;
		else if (pos.y-this.radius > canvas.height) pos.y = -this.radius;

	};

	this.draw = function(ctx) {

		ctx.strokeStyle = "#ffffff";
		ctx.beginPath();
		ctx.arc(this.pos.x,this.pos.y,this.radius, 0, Math.PI*2, true);
		ctx.stroke();

	};

	this.hitTest = function(x,y) {

		diff.copyFrom(pos);
		diff.x-=x;
		diff.y-=y;

		var l = Math.pow(diff.x, 2) + Math.pow(diff.y, 2)

		// if (l < this.radius) return true;

		// now check built in vector function
		// then use optimised version

		// return l < this.radius*this.radius;
		return diff.isMagLessThan(this.radius)

		// return false;
	};

};
