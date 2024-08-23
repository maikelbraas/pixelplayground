function Power(ctx, w, h){
	this.width = 100;
	this.height = 30;

	this.x = this.width;
	this.y = h-this.height;
	this.power;

	this.draw = function(power){
		this.power = power;
		ctx.fillStyle = "black";
		ctx.strokeRect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = "red";
		ctx.fillRect(this.x, this.y, this.power*3.32, this.height);
		ctx.fillStyle = "white";
		ctx.fillText("Power Meter", this.x, this.y+this.height/2);
	}
}