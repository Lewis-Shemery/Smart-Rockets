//Global variables
var population; 
var lifespan = 250;
var lifeP;
var successP;
var failP;
var frame_count = 0;
var success = 0;
var fail = 0;
var target;
var maxforce = 0.3;  //sets the vector in the array genes to %30 of its magnitude. 
var minspeed = lifespan;

//variables to set 2D object dimensions
// - x-pos
// - y-pos
// - radius
var planet1_x = 250;
var planet1_y = 200;
var planet1_r = 125;

var planet2_x = 370;
var planet2_y = 280;
var planet2_r = 100;

var planet3_x = 460;
var planet3_y = 380;
var planet3_r = 90;

/*
var rect_x = 100;
var rect_y = 200;
var rect_w = 100;
var rect_h = 7;

var sx = 300;
var sy = 400;
var sw = 100;
var sh = 7;
*/

//called once when the program is started
function setup() {
  createCanvas(700, 600);
  
  rocket = new Rocket();
  population = new Population();
  target = createVector(width / 2, 50);
  lifeP = createP();
  successP = createP();
  failP = createP();
}

//allows user to drag planets around
function mouseDragged(){
    if(dist(mouseX, mouseY, planet1_x, planet1_y) <= planet1_r/2){
      planet1_x = mouseX;
      planet1_y = mouseY;
    }

    else if(dist(mouseX, mouseY, planet2_x, planet2_y) <= planet2_r/2){
      planet2_x = mouseX;
      planet2_y = mouseY;
    }

    else if(dist(mouseX, mouseY, planet3_x, planet3_y) <= planet3_r/2){
      planet3_x = mouseX;
      planet3_y = mouseY;
    }
  }

//called indefinitely until program is stopped or noLoop() is called 
function draw() {
  background(0);
  population.run();
  lifeP.html("Frame Count: " + frame_count);
  successP.html("Completed: " + success);
  failP.html("Crashed: " + fail);

  frame_count++;
  if (frame_count == lifespan) {
    population.evaluate();
    population.selection();
    frame_count = 0;
    fail = 0;
    success = 0;
  }

  fill(255);
  ellipse(planet1_x, planet1_y, planet1_r, planet1_r);
  ellipse(planet2_x, planet2_y, planet2_r, planet2_r);
  ellipse(planet3_x, planet3_y, planet3_r, planet3_r);
  //rect(rect_x, rect_y, rect_w, rect_h);

  ellipse(target.x, target.y, 30, 30);
}
