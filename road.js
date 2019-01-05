function Road(dir) {
	this.spacing = 150;
	this.step = 10;
	this.y = -this.step;
	this.speed = 2;
	this.direction = dir;
	this.highlight = false;
	this.turnStep = this.step;
	this.offsetUp = width/2 - this.spacing/2;
	this.offsetDown = width/2 - this.spacing/2;
	this.nextOffset = 0;


	this.show = function() {
		push();
		if(this.direction == 0){
			this.nextOffset = this.offsetUp ;

			fill(150);
			noStroke();
			if (this.highlight) {
				fill(200, 100, 100);
			}
			beginShape();
				vertex(this.nextOffset, this.y);
				vertex(this.offsetDown, this.y + this.step);
				vertex(this.offsetDown + this.spacing, this.y + this.step);
				vertex(this.nextOffset + this.spacing, this.y);
			endShape();

			stroke(0);
			if (this.highlight) {
				stroke(255, 0, 0);
			}
			line(this.nextOffset, this.y, this.offsetDown, this.y + this.step);
			line(this.nextOffset + this.spacing, this.y, this.offsetDown + this.spacing, this.y + this.step);

		}else if(this.direction == 1){
			this.nextOffset = this.offsetUp + this.turnStep;

			fill(150);
			noStroke();
			if (this.highlight) {
				fill(200, 100, 100);
			}
			beginShape();
				vertex(this.nextOffset, this.y);
				vertex(this.offsetDown, this.y + this.step);
				vertex(this.offsetDown + this.spacing, this.y + this.step);
				vertex(this.nextOffset + this.spacing, this.y);
			endShape();

			stroke(0);
			if (this.highlight) {
				stroke(255, 0, 0);
			}

			line(this.nextOffset, this.y, this.offsetDown, this.y + this.step);
			line(this.nextOffset + this.spacing, this.y, this.offsetDown + this.spacing, this.y + this.step);
		}else if(this.direction == -1){

			fill(150);
			noStroke();
			if (this.highlight) {
				fill(200, 100, 100);
			}
			beginShape();
				vertex(this.nextOffset, this.y);
				vertex(this.offsetDown, this.y + this.step);
				vertex(this.offsetDown + this.spacing, this.y + this.step);
				vertex(this.nextOffset + this.spacing, this.y);
			endShape();

			stroke(0);
			if (this.highlight) {
				stroke(255, 0, 0);
			}

			this.nextOffset = this.offsetUp - this.turnStep;
			line(this.nextOffset, this.y, this.offsetDown, this.y + this.step);
			line(this.nextOffset + this.spacing, this.y, this.offsetDown + this.spacing, this.y + this.step);
		}
		
		pop();
	}

	this.update = function() {
		this.y += this.speed;
	}

	this.offscreen = function() {
		if (this.y > height) {
			return true;
		} else {
			return false;
		}
	}

	this.hits = function(car) {
		if (car.pos.x < this.offsetUp || car.pos.x > this.offsetUp + this.spacing) {
			if (car.pos.y > this.y && car.pos.y < this.y + this.step){
				this.highlight = true;
				return true;
			}
		}
		this.highlight = false;
		return false;
	}

	this.edges = function(){
		if(this.offsetUp < this.turnStep){
			this.direction = 1;
		}else if(this.offsetUp + this.spacing > width - this.turnStep){
			this.direction = -1;
		}
	}
}