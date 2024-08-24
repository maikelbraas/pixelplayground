window.onload = function(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var w = canvas.offsetWidth;
    var h = canvas.offsetHeight;
    
//    Controls
    var left;
    var right;
//    Loops
    var draw_loop;
    var logic_loop;
    var player_loop;
    var ball_loop;
    var fire_loop;
//    Arrays
    var player =  new Player(ctx, w, h);
    var balls = [];
    var bullets = [];
//    Etc...
    var start = true;
    var fire = false;
    var number = 0;
    var hit = false;

    var fps = 1000/60;

    var radius = 30;

    var destroyedX = 0;
    var destroyedY = 0;

    var ballSpawnAmound = 2;

    var p = 0;
    var o = 0;  
//    Draw your playing ground and other stuff
    function draw(){
//        Draw the basic background
        ctx.fillStyle = "#585858";
        ctx.fillRect(0, 0, w, h);
//        draw the borders
        ctx.fillStyle = "chocolate";
        ctx.fillRect(0,0,w, 30); //Top bar
        ctx.fillRect(0,0,30, h); //Left bar
        ctx.fillRect(w-30, 0, 30, h); //Right bar
        ctx.fillRect(0, h-30, w, 30); //Floor bar
//        draw lines
        ctx.strokeStyle = "white";
        ctx.strokeRect(0,0, w, h);//Outer line
        ctx.strokeRect(30,30, w-60, h-60);//inner line
//        Draw player
        player.draw(ctx);
//        Draw ball
        for(var i = 0; i < balls.length; i++){
            balls[i].draw(ctx);
        }


//        Draw bullets
        for(var i = 0; i < bullets.length; i++){
            bullets[i].draw(ctx);  
            if(bullets[i].linePos <= 30){
                bullets.splice(i, 1);//Splice ones out of the field - Memory spacing
                p = 0;
            }
        }
    }
//    Game Logic
    function logic(){
//        Move the player
        player.move();
//        Move the ball - AI
        for(var a = 0; a < balls.length; a++){
            balls[a].move();
        }
        
        
//        Check Bullet with Ball collision
        for(var q = 0; q < bullets.length; q++){
            for(var z = 0; z < balls.length; z++){
                if(bullets[q].x + bullets[q].width/2 >= balls[z].x - balls[z].radius &&
                    bullets[q].x - bullets[q].width/2 <= balls[z].x + balls[z].radius&&
                    // bullets[q].linePos >= balls[z].y - balls[z].radius &&
                    bullets[q].linePos <= balls[z].y + balls[z].radius){
                        o = 0;
                        p = 0;
                        radius = balls[z].radius/2;
                        destroyedX = balls[z].x;
                        destroyedY = balls[z].y;
                        balls.splice(z, 1);
                        bullets.splice(q, 1);
                }
            }
        }
        // Check vall with ball collision
        for(var i = 0; i < balls.length; i++){

            for(var v = 0; v < balls.length; v++){
                if(balls[v].x+balls[v].radius >= balls[i].x-balls[i].radius &&
                    balls[v].x-balls[v].radius <= balls[i].x+balls[i].radius &&
                    balls[v].y+balls[v].radius >= balls[i].y-balls[i].radius &&
                    balls[v].y-balls[v].radius <= balls[i].y+balls[i].radius &&
                    balls[v].number != balls[i].number){
                        if(balls[v].left){//Turn dirrection
                            //if one ball is higher than the other bounce on the other ball
                            if(balls[v].y-balls[v].radius > balls[i].y){
                                balls[i].bounceUp = true;
                            }else if(balls[i].y-balls[i].radius > balls[v].y){
                                balls[v].bounceUp = true;
                            }else{
                            balls[v].left = false;
                            balls[i].left = true;
                            }
                            hit = true;
                            break;//break it to avoid endless collision
                        }else if(!balls[v].left){//Turn dirrection
                            //if one ball is higher than the other bounce on the other ball
                            if(balls[v].y-balls[v].radius > balls[i].y){
                                balls[i].bounceUp = true;
                            }else if(balls[i].y-balls[i].radius > balls[v].y){
                                balls[v].bounceUp = true;
                            }else{
                            balls[i].left = false;
                            balls[v].left = true;
                            }
                            hit = true;
                            break;//break it to avoid endless collision
                        }
                }
            }
            if(hit){
                hit = false;
                break;//break it to avoid endless collision
            }
        }

        //Ball with player collision
        for(var i = 0; i < balls.length; i++){
        // console.log(player.y, balls[0].y + balls[0].radius);
            if(player.x + player.width >= balls[i].x - balls[i].radius &&
                player.x <= balls[i].x + balls[i].radius &&
                player.y+player.height >= balls[i].y + balls[i].radius &&
                player.y <= balls[i].y + balls[i].radius){
                gameOver();
            }
        }
        
    }
    
//    get Ball
    function getBall(){
        if(radius > 3.75){
            for(o; o < ballSpawnAmound; o++){
                number++;
                balls.push(new Ball(w, h, number, radius));
                if(destroyedX != 0){
                    number % 2 == 0 ? balls[balls.length-1].x = destroyedX-balls[balls.length-1].radius*2 : balls[balls.length-1].x = destroyedX+balls[balls.length-1].radius*2;
                    balls[balls.length-1].y = destroyedY;
                }
            }
        }
    }
//    get Bullet
    function getBullet(){

        if(fire){
            for(p; p < 1; p++){
                bullets.push(new Bullet(player.x+player.width/2, player.y-5));
            }
            fire = false;
        }
        if(balls.length == 0){
            winner();
        }
    }
    //    start screen
    function startScreen(){
        //background
        ctx.fillStyle="#000";
        ctx.fillRect(0,0,w,h);
        
        //Explenation
        ctx.fillStyle="white";
        ctx.font="20pt Arial";
        ctx.fillText("Welcome to this small game!", (w/8),h/2 - 60);
        ctx.fillText("You start by pressing: Spacebar", (w/8), h/2 - 30);
        ctx.fillText("A = left", (w/8), h/2);
        ctx.fillText("D = right", (w/8), h/2 + 30);
        ctx.fillText("Green squares double your speed.", (w/8), h/2 + 60);
        ctx.fillText("Red squares double the length of the paddle.", (w/8), h/2 + 90);
    } 

    //    Game Over
    function gameOver(){
        //Put restart to true - Able to respawn
        start = true;
        ctx.fillStyle="white";
        ctx.fillRect(0,0,w,h);
        ctx.fillStyle="#000000";
        ctx.font="30pt 'Press Start 2P'";
        var textWidth = ctx.measureText('GAME OVER!');
        ctx.fillText("GAME OVER!", (w-textWidth.width) /2,60);
        ctx.font="20pt Arial";
        ctx.fillText("Restart by pressing: Spacebar", (10), h/2 + 90);
        level = 1;
        clear();
    }
    
    function winner(){
        ctx.fillStyle="white";
        ctx.fillRect(0,0,w,h);
        ctx.fillStyle="green";
        ctx.font="30pt 'Press Start 2P'";
        var textWidth = ctx.measureText('You win!');
        ctx.fillText("You win!", (w-textWidth.width) /2, 60 );
        ctx.fillText("If you want to move to the second level press 'Spacebar'", 10, 130 );
        ctx.fillText("If not, thanks for playing!", 10, 160 );
        ctx.font="20pt Arial";
        if(level == 1)level = 2;
        clear();
    }

    
//    Set settings and loops
    function init(){
        start = false;
//        Set all intervals
        logic_loop = setInterval(logic, fps);
        ball_loop = setInterval(getBall, fps);
        fire_loop = setInterval(getBullet, fps);
        draw_loop = setInterval(draw, fps);
    }

    function clear(){
        start = true;
        o = 0;
        p = 0;
        player.x = w/2 - player.width/2;
        destroyedX = 0;
        destroyedY = 0;
        radius = 30;
        number = 0;
        balls = [];
        bullets = [];
        clearInterval(logic_loop);
        clearInterval(ball_loop);
        clearInterval(fire_loop);
        clearInterval(draw_loop);
    }
//    Controls
    window.addEventListener("keypress", function(e){
        if((e.code == "Space" || e.charCode == 32 || e.which == 32) && !start){
            fire = true;
        }
    });
    window.addEventListener("keydown", function(e){
        if(e.keyCode === 68)player.right = true; //right
        if(e.keyCode === 65)player.left = true; //left
        // if(e.keyCode === 32)fire = true;
    });
    
    window.addEventListener("keyup", function(e){
        if(e.keyCode === 68)player.right = false;
        if(e.keyCode === 65)player.left = false;
        if(e.keyCode === 13 && start)init();
        
    });
    if(start && level == 1)startScreen();
};