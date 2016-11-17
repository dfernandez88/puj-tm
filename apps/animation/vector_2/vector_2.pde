void setup() {
  size(640,360);
}

void draw() {
    background(255);
  
    // Vector que apunta a la posision del mouse
    PVector mouse = new PVector(mouseX,mouseY);
    
    // Vector que apunta al centro del canvas
    PVector center = new PVector(width/2,height/2);
    
    //Restar el vector del centro al mouse, lo que produce un 
    //vector del centro al mouse
    mouse.sub(center);
    
    // normalizar el vector
    mouse.normalize();
    
    // Aumentar su longitud en factor de 50x
    mouse.mult(50);
    
    //Actaulizamos la referencia de la posisición 0,0 del canvas al
    //centro de él
    translate(width/2,height/2);
    
    // Dibujamos el vector de mouse
    stroke(0);
    strokeWeight(2);
    line(0,0,mouse.x,mouse.y);
}