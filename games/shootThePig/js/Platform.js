function Platform(ctx, w, h){

	this.width = 50;
	this.height = 60;
	this.x = 100;
	this.y = h-this.height-60;

	this.draw = function(){
		ctx.fillStyle = "grey";
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.strokeStyle = "black";
		ctx.strokeRect(this.x, this.y, this.width, this.height);
	}

	this.calcHeight = function(){
			this.height = (Math.floor(Math.random()*h));
		while(this.height <= 60 || this.height >= h-h*0.2){
			this.height = (Math.floor(Math.random()*h));
		}
		this.y = h-this.height-60;
	}
}