
PVector[] pos = {
  new PVector(300,300),
  new PVector(100,100),
  new PVector(500,230)};
  
PVector obj_pos;
PVector obj_new_pos;
int index = 0; 

void setup() {
  updateTarget();
  
  size(640, 360); 
  noStroke();  
}

void draw() { 
  background(51);
  
  //Ultimo target con posición dinamica
  /*
  pos[2] = new PVector(mouseX,mouseY);
  if(get_index(index+1) == pos.length-1){
    obj_new_pos = new PVector(mouseX,mouseY);
  }
  */
 
  for (int i = 0; i < pos.length; i++) {
    fill(255);
    stroke(255);
    ellipse(pos[i].x, pos[i].y, 30, 30);
  }
  
  obj_pos.lerp(obj_new_pos, 0.05);
  
  fill(255,0,0);
  stroke(255,0,0);
  ellipse(obj_pos.x, obj_pos.y, 15, 15);
    
  if(PVector.sub(obj_pos, obj_new_pos).mag() <= 1){
    index += 1;
    updateTarget();
  }
}


void updateTarget(){
  obj_pos = pos[get_index(index)].copy();
  obj_new_pos = pos[get_index(index+1)].copy();
}

int get_index(int i){
  return i % pos.length;
}