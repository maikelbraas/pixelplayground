function Bullet(x, y){
//    Bullet starting point && X and Y
    this.x = x;
    this.y = y;
//    Bullet width && mke it a circle
    this.width = 5;
    this.circle = 2*Math.PI;

    this.speed = 0;
    
    this.draw = function(ctx){
        this.speed += 0.02;
        if(this.speed > 1)this.speed = 1;
        this.linePos = y + (30 - y) * this.speed;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = this.width;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, this.linePos);
        ctx.stroke();
        ctx.closePath();
        ctx.lineWidth = 1;
    };
}