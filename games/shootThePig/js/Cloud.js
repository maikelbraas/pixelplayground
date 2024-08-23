function Cloud(ctx, w){

	this.width = 40;
	this.scale = Math.floor(Math.random() * 9)  / 20 + 0.5;
	this.x = w;
	this.y = Math.floor(Math.random()*400)+40;
	this.vy = 0;
	this.vx = 5;
	this.gravity = Math.floor(Math.random() * 4)  / 50 + 0.01;
	this.cloudSwing = 0.5;

	this.move = function(){
		this.vx += this.gravity;
		this.x -= this.vx; 
		this.vy = 0;
		if(this.direction == 1){
			this.vy += this.cloudSwing;
			this.y -= this.vy;
		}
		else if(this.direction == 2)
		{
			this.vy += this.cloudSwing;
			this.y += this.vy;
		}
	}

	this.swing = function(){
		this.direction = Math.floor(Math.random() *2 )+1;
	}

	this.draw = function(){
		this.move();

  	ctx.strokeStyle='#87CEFA';
  	ctx.fillStyle='white';
		ctx.save();
		ctx.translate(this.x,this.y);
		ctx.scale(this.scale,this.scale);
		ctx.beginPath();
		ctx.moveTo(0, 0);
  	ctx.bezierCurveTo(-40, 20,-40, 70, 60, 70);
  	ctx.bezierCurveTo(80, 100, 150, 100, 170, 70);
  	ctx.bezierCurveTo(250, 70, 250, 40, 220, 20);
  	ctx.bezierCurveTo(260, -40, 200, -50, 170, -30);         
  	ctx.bezierCurveTo(150, -75, 80, -60, 80, -30);
  	ctx.bezierCurveTo(30, -75, -20, -60, 0, 0);
  	ctx.closePath();
  	ctx.lineWidth = 5;
  	ctx.fill();
  	ctx.stroke();
  	ctx.restore();

	}

}