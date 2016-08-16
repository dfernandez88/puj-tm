String media_path = "../../media/";
String out_path = "../../out/";

void setup() {
  PImage img = loadImage(media_path + "plaza.png");
   
  size(756, 568);
  PImage msk = createImage(378, 568, RGB);
  background(0);
  img.loadPixels();
  msk.loadPixels();
  
  for (int i=0; i< img.pixels.length; i++) {
    color c = img.pixels[i];
    
    //Si el color es azul o blanco, colocar negro en la máscara
    if (red(c) + green(c) + blue(c) > 600 || blue(c) > 185) {
      msk.pixels[i] = 0;
    }
    else {
      msk.pixels[i] = 255;
    }
  }
  msk.updatePixels();
  image(img, 0, 0);
  
  //Invertir colores
  /*for (int i=0; i< img.pixels.length; i++) {
    if(msk.pixels[i] == 255){
      color c = img.pixels[i];
      img.pixels[i] = color(255 - red(c), 255 - green(c), 255 - blue(c));
    }
  }*/
  
  img.mask(msk);
  image(img, img.width, 0);
}