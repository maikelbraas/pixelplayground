function Player(ctx, w, h){
//    X and Y as
    this.x = w/2-10;
    this.y = h-72;
//    Width and height
    this.width = 20;
    this.height = 40;
//    Player speed
    this.speed = 4;
    
    this.draw = function(){
//        Change with image when done.
        ctx.fillStyle = "skyblue";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStroke = "white";
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    };
    
    this.move = function(){
        if(this.left && this.x > 30)this.x -= this.speed;
        if(this.right && this.x < w-30-this.width)this.x += this.speed;
    };
}