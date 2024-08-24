function Ball(w, h, number, radius){
    this.h = h-32;
//    fur ze bouncy
    this.gravity = 0.2;
    this.bounceFactor = 0.9;
//    radius
    this.radius = radius;
//    Volicity
    this.vx = 1;
    this.vy = -4.4;

    this.y = 200;

    this.bounceUp = false;
    this.bounceDown = false;

    this.number = number;

    number % 2 == 0 ? this.x = w/2 - this.radius*2 : this.x = w/2 + this.radius*2;

    number % 2 == 0 ? this.left = true : this.left = false;
    
    this.draw = function(ctx){
        ctx.fillStyle = "green";
        ctx.shadowColor = "black";
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.closePath();
    };
    
    this.move = function(){
        if(this.y + this.radius > this.h){
            this.y = this.h - this.radius;
            this.vy *= -this.bounceFactor;
            //Don't let it drop too low
            if(this.vy < -8 && this.radius == 30){
                this.vy = -9.4;
            }else if(this.vy < -5 && this.radius == 15){
                this.vy = -7.4;
            }else if(this.vy <= -3 && this.radius == 7.5){
                this.vy = -6.4;
            }
        }else if(this.left){
            this.y += this.vy;
            this.vy += this.gravity;
            this.x -= this.vx;
            if(this.x <= 30+this.radius/2)this.left = false;
            
        } else if(!this.left){
            this.y += this.vy;
            this.vy += this.gravity;
            this.x += this.vx;
            if(this.x >= w-40-this.radius/2)this.left = true;
        }

        if(this.bounceUp){
            this.vx = 2;
            this.vy += 1;
            this.bounceUp = false;
            this.vy = -7;
            // setTimeout(function(){_this.vx = 1}, 4000);
        }
    }
}