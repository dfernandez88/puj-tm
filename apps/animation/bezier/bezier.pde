float i;

void setup(){
  i = 0;
  size(100,100);
}

void draw(){
  background(100);
  noFill();
  
  bezier(0, 100, 90, 90, 10, 10, 100, 0);
  fill(255);
  
  int steps = 100;
  i += 1;
  if(i > 100){
    i = 0;
  }
  i = mouseX;
  
  float t = i / float(steps);
  float x = bezierPoint(0, 90, 10, 100, t);
  float y = bezierPoint(100, 90, 10, 0, t);
  
  ellipse(x, y, 5, 5);
}