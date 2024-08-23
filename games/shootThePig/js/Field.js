class Field{
	constructor(ctx){
		this.ctx = ctx;
		this.w = canvas.width;
		this.h = canvas.height;
	}

	draw(){
		//Draw field
		this.ctx.fillStyle = "forestgreen";
		this.ctx.fillRect(0, 0, this.w, this.h);
		this.ctx.strokeStyle = "black";
		this.ctx.strokeRect(0, this.h*0.8, this.w, this.h);
		this.ctx.fillStyle = "#573B0C";
		this.ctx.fillRect(0, this.h-60, this.w, this.h);
		this.ctx.strokeStyle = "black";
		this.ctx.strokeRect(0, this.h-60, this.w, this.h);
	}
}