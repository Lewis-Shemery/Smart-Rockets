function Rocket(dna) {
  this.pos = createVector(width / 2, height);
  this.vel = createVector();
  this.acc = createVector();
  this.completed = false;
  this.crashed = false;
  this.speed = lifespan;

  //looks for dna because this function 
  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }
  this.fitness = 0;

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function() {
    //has it hit the target?
    var target_d = dist(this.pos.x, this.pos.y, target.x, target.y);
    if (target_d <= 15) {
      this.completed = true;
      this.speed = frame_count;
      this.pos = target.copy();
      success++
      if(frame_count < lifespan){
        minspeed = frame_count
      }
    }
    //what is the distance from the rocket to the target
    var planet1_d = dist(this.pos.x, this.pos.y, planet1_x, planet1_y)
    //if the distance is less than the radius, it has crshsed
    if (planet1_d <= planet1_r/2){
      this.crashed = true;
      //change the position of the rocket to the position of the planet
      this.pos = createVector(planet1_x, planet1_y).copy();
      fail++
    }
    
    var planet2_d = dist(this.pos.x, this.pos.y, planet2_x, planet2_y)
    if (planet2_d <= planet2_r/2){
      this.crashed = true;
      this.pos = createVector(planet2_x, planet2_y).copy();
      fail++
    }
    
    var planet3_d = dist(this.pos.x, this.pos.y, planet3_x, planet3_y)
    if (planet3_d <= planet3_r/2){
      this.crashed = true;
      this.pos = createVector(planet3_x, planet3_y).copy();
      fail++
    }
    
  /* Rectagle collision
    if (this.pos.x > rx && this.pos.x < rx + rw && this.pos.y > ry && this.pos.y < ry + rh) {
        this.crashed = true;
    }
  */
    
    //has the rocket hit the edge of the window
    if (this.pos.x > width || this.pos.x < 0) {
      this.crashed = true;
      fail++
    }
    if (this.pos.y > height || this.pos.y < 0) {
      this.crashed = true;
      fail++
    }

  //uses the inverse of the rockets distance from the target as its fitness
  this.calcFitness = function() {
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);

    this.fitness = map(d, 0, height, height, 0);
    //if the rocket hits the target, multiply fitness by 10
    if(this.speed == minspeed){
      this.fitness *= 100;
    }
    else if (this.completed) {
      this.fitness *= 10;
    }

    //if the rocket crahses, divide fitness by 10
    if (this.crashed) {
      this.fitness /= 10;
    }
  }

    //
    this.applyForce(this.dna.genes[frame_count]);
    if (!this.completed && !this.crashed) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
  }

  this.show = function() {
    push();
    noStroke();
    fill(255, 150);
    translate(this.pos.x, this.pos.y);
    //heading() calculates the angle of rotation for a 2D vector
    rotate(this.vel.heading());
    //modifies the location from which the rectangle is drawn
    rectMode(CENTER);
    rect(0, 0, 25, 5);
    pop();
  }
}