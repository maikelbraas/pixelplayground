class Line{
	constructor(ctx){
		this.ctx = ctx;
	}
	
	draw(){
		ctx.beginPath();
		ctx.strokeStyle="white";
		ctx.moveTo(parabolaStartX, parabolaStartY);
		ctx.quadraticCurveTo(parabolaMiddleX, parabolaMiddleY, parabolaEndX, parabolaEndY);
		ctx.shadowColor = "red";
		ctx.shadowBlur = 5;
		ctx.stroke();
		ctx.shadowBlur = 0;
	}

}