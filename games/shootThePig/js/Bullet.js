function Bullet(ctx, cannon){
	this.radius = 10;

	this.x = cannon.x + cannon.width/2;
	this.y = cannon.y+cannon.height/3;

	this.cvy = cannon.vel * (90-cannon.degree)/80;
	this.cvx = cannon.vel * (cannon.degree)/45;
	this.vVert = 0;
	this.vHor = 0;
	this.time = 1;
	this.gr = 1;

	this.s = 0;
	this.h = 0;

	this.draw = function(){
        ctx.fillStyle = "red";
        ctx.shadowColor = "black";
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.closePath();
	}

	this.move = function(){
				this.y -= this.cvy;
				this.x += this.cvx;
				this.cvy -= this.gr;
			
	}
}