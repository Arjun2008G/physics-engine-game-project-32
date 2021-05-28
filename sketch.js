const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var world,engine;
var bgimg;
var ltank;
var ltankimg;
var bgsound;
var alien
var alienimg;
var slingshot;
var alien2;
var alien2img;
var alien3;
var alien3img;
var diamond;
var diamondimg;
var wallimg;
var bomb1;
var bombsprite;
var bombs=25;
var bombsound;
var endimage;
var diamondcol=0;

function preload(){
bgimg = loadImage("background.png");  
ltankimg = loadImage("yellowtank.png");
bgsound = loadSound("bgmusic.mp3");
alienimg = loadImage("ufo.png");
diamondimg=loadImage("diamond.png");
wallimg = loadImage("wall.png");
bombsound = loadSound("explosionsound.mp3");
endimage = loadImage("gameover.png");
}

function setup() {
  createCanvas(1500,700);

  ltank = createSprite(130,600,50,50);
  ltank.addImage(ltankimg);
  ltank.scale=0.6;

  //alien = createSprite(0,40,1000,1000);
  //alien.addImage(alienimg);
  //alien.scale=0.25;
  //alien.velocityX=20;

  alien1 = createSprite(1500,120,50,50);
  alien1.addImage(alienimg);
  alien1.scale=0.4;

  /*diamond = createSprite(1200,610,50,50);
  diamond.addImage(diamondimg);
  diamond.scale=0.15;
  diamond.visible=true;
  */

  engine=Engine.create();
  world=engine.world;

  /*bomb1 = Bodies.circle(150,610,20);
  World.add(world,bomb1);
  imageMode(CENTER);
  image(bomb.jpg,bomb1.body.position.x,bomb1.position.y,20,20);

  bomb2 = Bodies.circle(1350,610,20);
  World.add(world,bomb1);
  imageMode(CENTER);
  image(bomb.jpg,bomb2.body.position.x,bomb2.poisition.y,20,20);
  */
  bomb1 = new bomb(150,610);

  wallObj = new wall(750,490,50,400);
  upwall = new wall(750,5,1500,10);
  downwall = new wall(390,695,800,10);
  rightwall = new wall(1495,350,10,700);

  diamond1 = new Diamond(950,600);
  diamond2 = new Diamond(1150,600);
  diamond3 = new Diamond(1350,600);
  diamond4 = new Diamond(900,500);
  diamond5 = new Diamond(1100,500);
  diamond6 = new Diamond(1300,500);
  diamond7 = new Diamond(950,400);
  diamond8 = new Diamond(1150,400);
  diamond9 = new Diamond(1350,400);

  slingshot = new Slingshot(bomb1.body,{x:290, y:570});

  bgsound.loop();
}

function draw() {
  background(bgimg);
  Engine.update(engine);
  fill("yellow");
  stroke("black");
  textSize(20);
  text("You have to stretch the slinghsot(bomb) to launch bomb",30,30);
  fill("red");
  text("Press spacebar to again attach the bomb to the tank.",30,60);
  fill("yellow");
  text("Collect the diamonds by indirectly making the bomb bounce on the top wall.",30,90);
  fill("red");
  text("You only have a limited number of bombs!GOOD LUCK!",30,120);
  fill("black");
  textSize(25);
  text("NUMBER OF BOMBS LEFT:",30,150)
  text(bombs,350,150);

  slingshot.display();
  bomb1.display();
  wallObj.display();
  upwall.display();
  downwall.display();
  rightwall.display();
  diamond1.display();
  diamond2.display();
  diamond3.display();
  diamond4.display();
  diamond5.display();
  diamond6.display();
  diamond7.display();
  diamond8.display();
  diamond9.display();

  if(alien1.x===1500){
    alien1.velocityX=-20;
  }
  if(alien1.x===0){
    alien1.velocityX=20;
  }

  if(bombs===0){

    end = createSprite(750,350,50,50);
    end.addImage(endimage);
    end.scale=2.5;
    Matter.Body.setPosition(bomb1.body,{x:290, y:570});
    slingshot.attach(bomb1.body);
  }  

  

  /*if(isTouching(bombsprite,alien)){

    alien.visible=false;
  */

  detectCollision(bomb1,diamond1);
  detectCollision(bomb1,diamond2);
  detectCollision(bomb1,diamond3);
  detectCollision(bomb1,diamond4);
  detectCollision(bomb1,diamond5);
  detectCollision(bomb1,diamond6);
  detectCollision(bomb1,diamond7);
  detectCollision(bomb1,diamond8);
  detectCollision(bomb1,diamond9);

  if(detectCollision(diamond4,bomb1)){
    delete diamond4.x;
  }

  drawSprites();
}

function keyPressed(){
  if(keyCode === 32 && bombs>0){
    Matter.Body.setPosition(bomb1.body,{x:290, y:570});
    slingshot.attach(bomb1.body);
 }
}

function mouseDragged(){
  Matter.Body.setPosition(bomb1.body, {x: mouseX , y: mouseY});
}

function mouseReleased(){
  slingshot.fly();
  bombs=bombs-1;
  bombsound.play();
}

function detectCollision(lbomb,lDiamond){

  bombPosition=lbomb.body.position;
  diamondPosition=lDiamond.body.position;
  var distance=dist(bombPosition.x,bombPosition.y,diamondPosition.x,diamondPosition.y);
  if(distance<=lbomb.r+lDiamond.r){
  Matter.Body.setPosition(bomb1.body,{x:290, y:570});
  slingshot.attach(bomb1.body);
  diamondcol = diamondcol+1;

  }
  }

/*function isTouching(bombsprite,alien){
  if (alien.x - bombsprite.x < bombsprite.width/2 + alien.width/2
    && bombsprite.x - alien.x < bombsprite.width/2 + alien.width/2
    && bombsprite.y - alien.y < bombsprite.height/2 + alien.height/2
    && alien.y - bombsprite.y < bombsprite.height/2 + alien.height/2) {
  
      return true;
}
else {

  return false;
}
}
*/