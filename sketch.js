var tower,towerImage;
var door,doorImage,doorGroup;
var climber,climberImage,climberGroup;
var Ghost,GhostImage;
var spooky;

//GamState
var PLAY = 1;
var END = 0;
var gameState = 1;




function preload(){
  
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  GhostImage = loadImage("ghost-standing.png");
  spooky = loadSound("spooky.wav");
  
}

function setup(){
  createCanvas(600,600);
  
  spooky.loop();
  
  tower = createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY = 1;
  
  doorGroup = new Group();
  climberGroup = new Group();
  
  Ghost = createSprite(300,300,20,20);
  Ghost.addImage(GhostImage);
  Ghost.scale = 0.4;
   
  
  
}

function draw(){
  
  
  
  
  if(gameState === PLAY){
    if(tower.y > 500){
    tower.y = 300;
  }
  console.log(tower.y);
  
  if(keyDown("space")){
    Ghost.velocityY = -3;
  }
  
  Ghost.velocityY = Ghost.velocityY + 0.8;
  
  if(keyDown("left_arrow")){
    Ghost.x = Ghost.x -3;
  }
  
   if(keyDown("right_arrow")){
    Ghost.x = Ghost.x + 3;
  }
  
  if(climberGroup.isTouching(Ghost)){
    Ghost.velocityY = 0;
  }
  
  if(Ghost.y > 600){
    Ghost.destroy();
    gameState = END;
  }
    Spawndoor();
  
  drawSprites();
  }
  
  if(gameState === END){
    
    stroke("yellow");
    fill("yellow");
    
    textSize(30);
    text("GameOver",200,300);
    
    
  }
  
  
  
  
  
}

function Spawndoor(){
  
  if(frameCount%180===0){
    door = createSprite(120,50);
    door.addImage(doorImage);
    door.velocityY = 1;
    door.x = Math.round(random(100,400));
    door.lifetime = 500;
    
    climber = createSprite(120,100);
    climber.addImage(climberImage);
    climber.velocityY = 1;
    climber.x = door.x;
    climber.lifetime = 500;
    
    Ghost.depth = door.depth ;
    Ghost.depth = Ghost.depth + 1;
    
    doorGroup.add(door);
    climberGroup.add(climber);
  }
}

