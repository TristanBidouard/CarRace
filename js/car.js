function Car() {
	this.width = 30;
	this.height = 60;
  	this.heading = 0;
  	this.rotation = 0;
  	this.vel = createVector(0, 0);
  	this.isBoosting = false;
  	this.pos = createVector(width / 2, this.width);

  this.boosting = function(b) {
    this.isBoosting = b;
  }

  this.update = function() {
    if (this.isBoosting) {
      this.boost();
    }
    this.pos.add(this.vel);
    this.vel.mult(0.96);
  }

  this.boost = function() {
    var force = p5.Vector.fromAngle(this.heading);
    force.mult(0.2);
    this.vel.add(force);
  }

  this.hits = function(road) {
    var d = dist(this.pos.x, this.pos.y, road.pos.x, road.pos.y);
    if (d < this.r + road.r) {
      return true;
    } else {
      return false;
    }
  }

  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);
    fill(255);
    noStroke();
    rect(-this.width/2, -this.height/2, this.width, this.height, 20);
    fill(100,170,255);
    rect(-this.width/4, -this.height/4, this.width/2, this.height/6);
    fill(0);
    rect(-this.width/2 -this.width/15, -this.height/4, this.width/15, this.height/8);
    rect(this.width/2, -this.height/4, this.width/15, this.height/8);


    rect(-this.width/2 - this.width/15, this.height/6, this.width/15, this.height/8);
    rect(this.width/2, this.height/6, this.width/15, this.height/8);
    point(0,0);


    pop();
  }

	this.edges = function() {
		if (this.pos.x > width) {
			this.pos.x = width;
		} else if (this.pos.x < 0) {
			this.pos.x = 0;
		}
		if (this.pos.y > height) {
			this.pos.y = height;
		} else if (this.pos.y < 0) {
			this.pos.y = 0;
	}
  }

  this.setRotation = function(a) {
    this.rotation = a;
  }

  this.turn = function() {
    this.heading += this.rotation;
  }

}
