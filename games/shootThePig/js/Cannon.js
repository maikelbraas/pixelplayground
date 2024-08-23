function Cannon(ctx, w, h, plat){

	this.width = 50;
	this.height = 50;

	this.x = plat.x+this.width/2;
	this.y = plat.y-this.height;
	this.degree = 46;

	this.vel = 8;

	this.draw = function(){
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate((this.degree)*Math.PI/180);
		ctx.translate(-this.x, -this.y);
		ctx.fillStyle = "black";
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.restore();
	}

	this.rotate = function(direction){
		if(direction == "up" && this.degree < 90)
			this.degree += 2;
		else if(direction == "down" && this.degree > 0)
			this.degree -= 2;
	}

	this.power = function(direction){
		if(direction == "right" && this.vel < 30)
			this.vel += 0.25;
		else if(direction == "left" && this.vel > 2)
			this.vel -= 0.25;
	}
}