var tom,jerry,bomb,chese,li,li2
var back

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score

var obstaclesGroup

var lose

function preload(){
  tom_run =    loadAnimation("Tom1.png","Tom2.png","Tom3.png","Tom4.png")
  
  jerry_run = loadAnimation("Jerry1.png","Jerry2.png","Jerry3.png")
  
  ground = loadImage("Back.PNG")
  chese = loadImage("chese.png")
  boom = loadImage("bomb.png")
  lines = loadImage("line.PNG")
  lines2 = loadImage("lin ver.PNG")
  lose = loadImage("End.PNG")
}

function setup() {
 createCanvas(700, 450)
  back=createSprite(350,200,300,300)
  back.addImage(ground)
  back.velocityX=-3
  
  lost=createSprite(340,225,300,300)
  lost.addImage(lose)
  lost.scale=0.75
  lost.visible=false
  
  tom=createSprite(110,410,12,12)
  tom.addAnimation("running", tom_run);
  tom.scale=0.2
  
  jerry=createSprite(260,380,12,12)
  jerry.addAnimation("running", jerry_run);
  jerry.scale=0.06
  
  li=createSprite(350,430,300,300)
  li.addImage(lines)
  li.scale=1.3
  li.visible=false
  
  li2=createSprite(350,225,300,300)
  li2.addImage(lines2)
  li2.scale=0.42
  li2.velocityX=-3
  li2.visible=false
  
  obstaclesGroup = createGroup();
  
  score=0
}

function draw() {
  background(0)
 
  if(gameState === PLAY){
  tom.velocityY=tom.velocityY+0.3
  tom.collide(li); 
    
  back.velocityX=-(3+ score/20);
    
  if(jerry.x>700){
    jerry.destroy()
  }
     if (back.x < 0){
      back.x = 650;
    }
  if((keyDown("space")||touches.length) > 0 && tom.y >= 364.3){
  tom.velocityY=-12       
  }
 
  jerry.velocityX=3
       
  
  if(tom.isTouching(obstaclesGroup)){
    gameState=END
  }
    
  spawnObtacles()
  scoring()
  }
  else if(gameState===END){
    lost.visible=true 
    obstaclesGroup.destroyEach()
    tom.destroy()
  }
  drawSprites(); 

   text("Score : "+ score, 300,200);
   textSize(40)
}
function scoring(){
    if(tom.isTouching(li2)){
      li2.x=225
      score=score+1
    }
}

function spawnObtacles(){
  if (frameCount % 100 === 0){
      
  var obstacle = createSprite(700,400,10,40);
   obstacle.velocityX = -(5 +score/20);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(boom);
              break;
      case 2: obstacle.addImage(chese);
              break;
    default: break;
  
  }
    obstacle.scale=0.03
    obstacle.lifetime = 230
     obstaclesGroup.add(obstacle);
  }
}