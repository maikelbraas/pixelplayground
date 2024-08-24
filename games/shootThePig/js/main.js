window.onload = function () {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var w = canvas.width;
	var h = canvas.height;

	var fps = 10;

	var start = false;
	var gameOverStatus = false;
	var move_loop;
	var createPigs_loop;
	var collsion_loop;
	var swing_loop;
	var clouds_loop;

	var bullet;

	var countSteps = 0;
	var cheatOn = false;

	var parabolaStartX;
	var parabolaStartY;
	var parabolaEndX;
	var parabolaEndY;
	var parabolaMiddleX;
	var parabolaMiddleY;


	var platform = new Platform(ctx, w, h);
	var cannon = new Cannon(ctx, w, h, platform);
	var pigs = [];
	var particles = [];
	var bullets = [];
	var timer_pig = 0;
	var timer_cloud = 0;
	var clouds = [];
	var powerMeter = new Power(ctx, w, h);
	let field = new Field(ctx);
	let sky = new Sky(ctx);

	var shots = 0;
	var kills = 0;
	var lifes = 3;

	var backon = new Image();
	backon.src = 'img/baccon.png';
	var pig1 = new Image();
	pig1.src = 'img/pig2.png';

	var pig2 = new Image();
	pig2.src = 'img/pig3.png';

	var pig3 = new Image();
	pig3.src = 'img/pig4.png';

	var animationloop = function draw() {
		field.draw();
		//Draw sky
		sky.draw();

		//Parabola line
		if (cheatOn) {
			ctx.beginPath();
			ctx.strokeStyle = "white";
			ctx.moveTo(parabolaStartX, parabolaStartY);
			ctx.quadraticCurveTo(parabolaMiddleX, parabolaMiddleY, parabolaEndX, parabolaEndY);
			ctx.shadowColor = "red";
			ctx.shadowBlur = 5;
			ctx.stroke();
			ctx.shadowBlur = 0;
		}
		//Draw ground
		//draw clouds
		for (var i = 0; i < clouds.length; i++) {
			clouds[i].draw();
		}
		//Misc
		ctx.fillStyle = "black";
		ctx.font = "12px Arial";
		ctx.fillText("Lifes left: " + lifes, 10, 20);
		ctx.fillText("Kills: " + kills, w - 100, 20);
		ctx.fillText("Shots fired: " + shots, w / 2, 20);
		//draw bullet
		if (bullet != null || bullet != undefined) {
			bullet.draw();
		}
		//draw cannon
		cannon.draw();
		//draw platform
		platform.draw();

		//draw pigs
		for (var i = 0; i < pigs.length; i++) {
			pigs[i].draw();
		}
		//draw particles
		for (var i = 0; i < particles.length; i++) {
			particles[i].draw();
		}
		powerMeter.draw(cannon.vel);

		if (lifes <= 0 && start) {
			gameOver();
		};
		if (gameOverStatus) showGameoverScreen();
		requestAnimationFrame(animationloop);
	}



	function move() {

		if (bullet != null || bullet != undefined)
			bullet.move();

		for (var i = 0; i < particles.length; i++) {
			particles[i].move();
		}
		for (var i = 0; i < pigs.length; i++) {
			pigs[i].move();
		}
	}

	//clouds

	function swingClouds() {
		for (var i = 0; i < clouds.length; i++) {
			clouds[i].swing();
		}

		for (var i = 0; i < clouds.length; i++) {
			if (clouds[i].x < -200) {
				clouds.splice(i, 1);
			}
		}
		if (cheatOn) {
			//Visible parabola
			var removeVelocityValue = cannon.vel * (90 - cannon.degree) / 80;
			var countStepsToEnd = parabolaStartY;
			while (h > countStepsToEnd) {
				countSteps++;
				countStepsToEnd -= removeVelocityValue;
				removeVelocityValue -= 1;
			}

			parabolaStartX = cannon.x + cannon.width / 2;
			parabolaStartY = cannon.y + cannon.height / 3;
			parabolaEndX = parabolaStartX + (countSteps * (cannon.vel * cannon.degree / 45));
			parabolaEndY = h;
			parabolaMiddleX = parabolaStartX + ((countSteps / 2) * (cannon.vel * cannon.degree / 45));
			parabolaMiddleY = parabolaStartY - ((countSteps / 2) * (cannon.vel * (90 - cannon.degree) / 80));
			countSteps = 0;
		}
	}


	function spawnClouds() {

		if (timer_cloud <= 0) {
			timer_cloud = Math.floor(Math.random() * 50);
			if (clouds.length < 5) {
				clouds.push(new Cloud(ctx, w));
				// setTimeout(200);
			}
		} else {
			timer_cloud--;
		}
	}

	function collision() {
		if (bullet != null || bullet != undefined)
			for (var p = 0; p < pigs.length; p++) {
				if (bullet.x + bullet.radius >= pigs[p].x &&
					bullet.y + bullet.radius >= pigs[p].y &&
					bullet.x - bullet.radius <= pigs[p].x + pigs[p].width &&
					bullet.y - bullet.radius <= pigs[p].y + pigs[p].height) {
					createParticles(bullet);
					kills += 1;
					bullet = null;
					pigs.splice(p, 1);
					platform.calcHeight();
					cannon.y = platform.y - cannon.height;
					break;
				}
			}
		//Remove particles that fall too low.
		for (var i = 0; i < particles.length; i++) {
			if (particles[i].y > h) {
				particles.splice(i, 1);
			}
		}
		//remove pigs that didn't get hit
		for (var i = 0; i < pigs.length; i++) {
			if (pigs[i].x < 100) {
				pigs.splice(i, 1);
				lifes -= 1;
			}
		}

		if ((bullet != null || bullet != undefined) && bullet.y > h)
			bullet = null;
	}

	function createBullet() {
		if (bullet == null || bullet == undefined) {
			bullet = new Bullet(ctx, cannon);
			shots++;
		}
	}

	function createPigs() {
		if (timer_pig <= 0) {
			timer_pig = Math.floor(Math.random() * 500) + 50;
			pigs.push(new Pig(ctx, w, h, pig1, pig2, pig3));
		} else {
			timer_pig -= 1;
		}
	}

	function createParticles(bullet) {
		for (var i = 0; i < 10; i++) {
			particles.push(new Particle(ctx, bullet, backon));
		}
	}

	function startScreen() {
		ctx.fillStyle = "black";
		ctx.font = "30px Arial";
		var text = "Press enter to start the game.";
		var measure = ctx.measureText(text).width;
		ctx.fillText("Press enter to start the game.", w / 2 - measure / 2, h / 2);
		ctx.fillText("Move up with: W", w / 2 - measure / 2, h / 2 + 30);
		ctx.fillText("Move down with: S", w / 2 - measure / 2, h / 2 + 60);
		ctx.fillText("More POWA: D", w / 2 - measure / 2, h / 2 + 90);
		ctx.fillText("Less POWA: A", w / 2 - measure / 2, h / 2 + 120);
	}

	function showGameoverScreen() {
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = "#c1c1c1";
		ctx.font = "60px Arial";
		var text = "You Lost!";
		var measure = ctx.measureText(text).width;
		ctx.fillText("You Lost", w / 2 - measure / 2, h / 2 - 30);
		var text = "Press enter to restart the game.";
		var measureEnter = ctx.measureText(text).width;
		ctx.fillText(text, w / 2 - measureEnter / 2, h / 2 + 30);
		clear();
	}

	function gameOver() {
		gameOverStatus = true;
		let score = (kills * 100) + ((kills - shots) * 50);
		let highscore = { highscore: score, game_id: 5 };
		fetch('/games/highscore/highscore.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(highscore)
		})
			.then(response => response.text())
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.error('Error:', error);
			});
	}

	function init() {
		createPigs();
		clouds.push(new Cloud(ctx, Math.floor(Math.random() * h * 0.8) + 1, w));
		requestAnimationFrame(animationloop);
		move_loop = setInterval(move, fps);
		collision_loop = setInterval(collision, fps);
		createPigs_loop = setInterval(createPigs, fps);
		swing_loop = setInterval(swingClouds, 30);
		clouds_loop = setInterval(spawnClouds, 30);
		start = true;
		gameOverStatus = false;
	}

	function clear() {
		pigs = [];
		clouds = [];
		bullets = [];
		particles = [];
		lifes = 3;
		kills = 0;
		shots = 0;
		clearInterval(move_loop);
		clearInterval(collision_loop);
		clearInterval(createPigs_loop);
		clearInterval(swing_loop);
		clearInterval(clouds_loop);
		start = false;
	}

	window.addEventListener("keyup", function (e) {
		if (e.keyCode == 13 && !start) {
			init();
		}
		if (e.keyCode == 32) {
			createBullet();
		}
		if (e.keyCode === 192) {
			if (cheatOn) {
				cheatOn = false;
			} else {
				cheatOn = true;
			}
		}
	})

	window.addEventListener("keydown", function (e) {
		if (e.keyCode == 87) {
			cannon.rotate("up");
		}
		if (e.keyCode == 83) {
			cannon.rotate("down");
		}
		if (e.keyCode == 68) {
			cannon.power("right");
		}
		if (e.keyCode == 65) {
			cannon.power("left");
		}
	})

	if (!start) startScreen();

}