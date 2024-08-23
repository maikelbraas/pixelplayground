class Sky{
	constructor(ctx){
		this.ctx = ctx;
		this.h = canvas.height;
		this.w = canvas.width;
	}

	draw(){

		this.ctx.fillStyle = "skyblue";
		this.ctx.fillRect(0, 0, this.w, this.h*0.8);
		this.ctx.fillStyle = "#FDB813";
    this.ctx.shadowColor = "yellow";
    this.ctx.shadowBlur = 5;
		this.ctx.beginPath();
		this.ctx.arc(100,75,50,0,2*Math.PI);
    this.ctx.fill();
    this.ctx.shadowBlur = 0;
	}
}