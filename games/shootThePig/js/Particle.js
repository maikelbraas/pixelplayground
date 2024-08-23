function Particle(ctx, ball, backon){
	this.x = ball.x;

	this.backon = backon;

	this.width = 128;
	this.height = backon.height;
	this.y = ball.y-this.height-60;


	this.vy = Math.random() * 10 +1;
	this.vx = Math.random() * 10 +1;
	this.gravity = 0.5;
	this.randomDirection = Math.floor(Math.random() * 2) +1;

	this.draw = function(){
		ctx.drawImage(this.backon, this.x, this.y, 32, 32);	
	}


	this.move = function(){
		if(this.randomDirection == 2){
			this.x -= this.vx;
			this.y -= this.vy;
			this.vy -= this.gravity;
		}else{
			this.x += this.vx;
			this.y -= this.vy;
			this.vy -= this.gravity;
		}	
	}
}