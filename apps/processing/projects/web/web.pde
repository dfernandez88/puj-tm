int base=10;
int x,y,gameScore=0;
int changeX=-5;
int changeY=-5;
int gameOver=0;
void setup()
{
  size(640, 480);
  x=(int)random(width);
  y=height-base;
}
void draw()
{
  if(gameOver==0)
  {
  background(0); 
  text("SCORE:"+gameScore+"00",width/2,height/2);
  rect(mouseX,height-base,200,base);
  ellipse(x,y,10,10);
  x=x+changeX;
  y=y+changeY;
  if(x<0 | x>width)
  {
    changeX=-changeX;
  }
  if(y<0)
  {
    changeY=-changeY;
  }
  if(y>height-base)
  {
    //check whether it is falling inside the rectangle or not
    if(x>mouseX && x<mouseX+200)
    {
      changeY=-changeY; //bounce back
      gameScore++;
    }
    else
    {
      gameOverSplash();
    }
  }
  }
  else
  {
    background(100,100,200);
    text("Game Over!",width/2,height/2);
    text("CLICK TO RESTART",width/2,height/2+20);
  }
}
void gameOverSplash()
{
  gameOver=1;
}
void mouseClicked()
{
  changeY=-changeY;
  gameScore=0;
  gameOver=0;
}