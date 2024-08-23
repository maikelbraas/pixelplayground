function Pig(ctx, w, h, pig1, pig2, pig3){

	this.width = pig1.width;
	this.height = pig1.height;
	this.x = w;
	this.y = h - this.height-(Math.floor(Math.random()*h*0.1)+60);

	this.pig1 = pig1;
	this.pig2 = pig2;
	this.pig3 = pig3;
	this.switch = 0;

	this.draw = function(){
		if(this.switch % 5 == 0){			
			ctx.drawImage(this.pig2, this.x, this.y, this.width, this.height);
		}else
		if(this.switch % 2 == 0){
			ctx.drawImage(this.pig1, this.x, this.y, this.width, this.height);
		}else{
			ctx.drawImage(this.pig3, this.x, this.y, this.width, this.height);
		}
		this.switch += 1;
	}
	
	this.move = function(){
		this.x -= 2;
	}
}