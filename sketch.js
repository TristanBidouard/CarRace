let car;
let roads = [];
let end = false;

function setup() {
	createCanvas(1000, 500);
	car =  new Car();
	roads.push(new Road(0));
	roads.push(new Road(0));
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
		roads.push(new Road(dir));
	}
	car.render();
	car.turn();
	car.update();
	car.edges();

	if(end){
		gameOver();
	}

	
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
	fill(50);
	stroke(0);
	textSize(100);
	textAlign(CENTER);
	text('Hit !', width/2, height/2);
	end = false;
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