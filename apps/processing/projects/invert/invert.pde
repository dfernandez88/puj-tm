String media_path = "../../media/";
String out_path = "../../out/";

void setup(){
  PImage img = loadImage(media_path + "lena.jpg");
  size(512, 512);
  image(img,0,0);
  
  for (int y=0; y<img.height; y++) {
    for (int x=0; x<img.width; x++) {
      color c = get(x,y);
      set(x, y, color(255 - red(c), 255 - green(c), 255 - blue(c)));
    }
  }
  saveFrame(out_path + "lena-inv.jpg");
}