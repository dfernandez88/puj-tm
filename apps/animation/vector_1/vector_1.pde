int ball_r;
PVector position;
PVector velocity;

void setup() {
  size(200, 200);
  background(255);
  position = new PVector(100, 100);
  velocity = new PVector(2.5, 5);
  ball_r = 16;
}

void draw() {
  noStroke();
  fill(255);
  rect(0,0,width,height);
  
  //Cambio de position dado el vector velocidad
  position.add(velocity);

  if ((position.x + ball_r > width) || (position.x - ball_r < 0)) {
    velocity.x = velocity.x * -1;
  }
  if ((position.y + ball_r > height) || (position.y - ball_r < 0)) {
    velocity.y = velocity.y * -1;
  }

  // Display circle at x position
  stroke(0);
  fill(175);
  ellipse(position.x,position.y, ball_r, ball_r);
}