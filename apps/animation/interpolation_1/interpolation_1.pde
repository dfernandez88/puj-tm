
PVector pos;
PVector newPos;

void setup() {
  pos = new PVector(width/2, height/2);
  newPos = pos;
  size(640, 360); 
  noStroke();  
}

void draw() { 
  background(51);
  
  //actualizamos el vector posición con la
  //interpolacion desde su posición a la nueva
  //realizando incrementos del 5% de la distancia total.
  pos.lerp(newPos, 0.05);
  
  fill(255);
  stroke(255);
  ellipse(pos.x, pos.y, 66, 66);
}

void mouseReleased() {
  newPos = new PVector(mouseX, mouseY);
}