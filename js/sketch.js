let car;
let roads = [];
let end = false;
let score = 0;
let bestScore = 0;
let img;
let level;

function preload(){
	img = loadImage("./img/warning.png");
}

function setup() {
	createCanvas(1000, 500);
	car =  new Car();
	roads.push(new Road(0,1));
	roads.push(new Road(0,1));
	frameRate(50);
}

function draw() {
	background(100);

	for (var i = 0; i <= roads.length-2; i++) {
		roads[i+1].offsetUp = roads[i].nextOffset;
		roads[i+1].offsetDown = roads[i].nextOffset;
	}
	for (var i = roads.length-2; i >= 0; i--) {
	
		roads[i].edges();
		roads[i].show();
		roads[i].update();

		if (roads[i].hits(car)) {
			end = true;
		}
		if (roads[i].offscreen()) {
			roads.splice(i, 1);
		}
	}

	if(roads[roads.length-2].y == 0){
		let dir = getRdm();
		roads.push(new Road(dir, level));
	}
	car.render();
	car.turn();
	car.update();
	car.edges();

	score += 1;

	level = floor(score / 100) + 1;

	if(end){
		gameOver();
		if(score > bestScore){
			bestScore = score;
		}
		score = 0;
	}

	if(score % 1000 == 0){
		displayLevel(level, false);
	}else{
		displayLevel(level, true);
	}
	displayScore(score, bestScore);
	end = false;
	
}

function keyReleased() {
  car.setRotation(0);
  car.boosting(false);
}

function keyPressed() {
	if (keyCode == RIGHT_ARROW) {
		car.setRotation(0.1);
	} else if (keyCode == LEFT_ARROW) {
		car.setRotation(-0.1);
	} else if (keyCode == UP_ARROW) {
		car.boosting(true);
	} else if (keyCode == DOWN_ARROW) {
		car.vel.mult(0.6);
	}
}

function gameOver() {
	push();
	fill(80);
	textSize(100);
	textAlign(CENTER);
	image(img, 10, height-200, 100, 100);
	pop();
}

function getRdm(){
	let rdm = random(0,1);
	if(rdm <= 0.33){
		return -1;
	}else if(rdm > 0.33 && rdm < 0.66){
		return 1;
	}else if(rdm => 0.66){
		return 0;
	}
}

function displayScore(score, bestScore){
	push();
	if(end){
		fill(255, 80, 80);
	}else{
		fill(50);
	}
	textSize(30);
	text('SCORE : ' + score, 10, height-50);
	text('BEST    : ' + bestScore, 10, height-10);
	pop();
}

function displayLevel(level, flash){
	push();
	fill(50);
	textSize(30);
	text('LEVEL : ' + level, 10, 50);
	pop();
}