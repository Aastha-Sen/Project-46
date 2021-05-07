var spacecraft,sImg;
var asteroids,aImg;
var laser,lImg;
var bImg;
var score=0;
var lasersGroup,asteroidsGroup;
var gameState="lvl1";

function preload(){
  sImg=loadImage("images/spacecraft.png");
  aImg=loadImage("images/asteroid.jpg");
  lImg=loadImage("images/laser.png");
  bImg=loadImage("images/back.jpg");
}
function setup() {
  createCanvas(800,600);

  spacecraft=createSprite(400, 500, 50, 50);
  spacecraft.addImage("space",sImg);
  spacecraft.scale=0.1;

  lasersGroup=new Group();
  asteroidsGroup=new Group();
}

function draw() {
  if(gameState==="lvl1"){
    fill("black");
    textSize(30);
    spacecraft.visible=false
    text("Welcome to the Space Fighter!!",200,200);
    text("Destroy the asteroids and try to reach moon",200,240);
    text("Press ENTER to start",200,280)

    if(keyDown("enter")){
      gameState="lvl2"
    }
  }
  if(gameState==="lvl2"){
    background(bImg);
    spacecraft.visible=true 
    
    if(keyDown("left")){
      spacecraft.x=spacecraft.x-5;
    }
    if(keyDown("right")){
      spacecraft.x=spacecraft.x+5;
    }
    if(keyDown("space")){
      spawnLasers();
      laser.velocityY=-3;
    }
    if(lasersGroup.isTouching(asteroidsGroup)){
      score=score+5;
      lasersGroup.destroyEach();
      asteroidsGroup.destroyEach();
    }
    
    fill("white");
    textSize(30);
    text("SCORE : "+ score,500,50);
    
    if(score===25){
      gameState="lvl3";
    }

    spawnAsteroids();
  }
  if(gameState==="lvl3"){
    console.log("lvl 3 reached");
  }
  
  drawSprites();
}

function spawnAsteroids(){
  if(frameCount%250===0){
   asteroids=createSprite(400,-10,50,50);
   asteroids.addImage("asteroid",aImg);
   asteroids.scale=0.07
   asteroids.velocityY=1;
   //asteroids.depth=spacecraft.depth-1;
   asteroids.x=Math.round(random(0,800));
   asteroids.lifetime=800;
   asteroidsGroup.add(asteroids);
  }
}
function spawnLasers(){
  
    laser=createSprite(400,500,50,50);
    laser.addImage("laser",lImg);
    laser.scale=0.1;
    
    laser.depth=spacecraft.depth-2;
    laser.lifetime=800;
    laser.x=spacecraft.x;
    lasersGroup.add(laser)
  }