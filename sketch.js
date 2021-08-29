var trex, trex_running, edges,ground,groundimage,invisibleGround,clouds,cloudImage,obstacle,ob1,ob2,ob3,ob4,ob5,ob6,score=0,gameState="play",cloudgroup,obstaclegroup,trex_Collided,gameover,restart,gameoverImage,restartImage,jumpsound,crashsound,milestone;

function preload(){
  trex_running = loadAnimation("images/trex1.png","images/trex3.png", "images/trex4.png")
groundimage=loadImage("images/round2.png")
  cloudImage=loadImage("images/cloud.png")
  ob1=loadImage("images/obstacle1.png")
   ob2=loadImage("images/obstacle2.png")  
  ob3=loadImage("images/obstacle3.png")
  ob4=loadImage("images/obstacle4.png")
  ob5=loadImage("images/obstacle5.png")
  ob6=loadImage("images/obstacle6.png")
  trex_Collided=loadAnimation("images/trex_collided.png")
  gameoverImage=loadImage("images/gameOver.png")
  restartImage=loadImage("images/restart.png")
  jumpsound=loadSound("jump.mp3")
  crashsound=loadSound("die.mp3")
  milestone=loadSound("checkPoint.mp3")
  
}



function setup(){
  createCanvas(600,200);
  
  
  //console.info("This is an information");
  //console.warn("This is the warning");
  //console.error("This is an error");
  
  
  //trex
  trex= createSprite(50,165,20,40);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("collided",trex_Collided);
  trex.debug=true
 trex.setCollider("circle",0,0,40);
  
  //making ground
  ground=createSprite(300,180,600,20);
  //ground.velocityX= -10;
  ground.addImage("ground",groundimage);
  edges= createEdgeSprites();
  
  restart=createSprite(300,150)
  restart.addImage("restart",restartImage)
  restart.scale=0.5;
  restart.visible=false;
  
  gameover=createSprite(300,90)
  gameover.addImage("gameover",gameoverImage);
  gameover.visible=false;

invisibleGround=createSprite(300,190,600,10);
invisibleGround.visible=false;
obstaclegroup=createGroup();
cloudgroup=createGroup();
  
}


function draw(){
  //console.time();
  background("white");
  if(gameState==="play"){
    //console.log(trex.y);
    
    if(score%100===0 && score>0){
      milestone.play()
      //ground.velocityX=ground.velocityX-1
    }
    ground.velocityX=-10-score/100
    
  //to jump trex

  if(keyDown("space") && trex.y>160){
    trex.velocityY= -13;
    jumpsound.play()
    
  }
  
    // gravity
  trex.velocityY =trex.velocityY +0.8;
  
  //infinite scrolling of ground 
  if(ground.x<0){
    ground.x=ground.width/2;
  }
    spawnclouds()
  spawnobstacle()
    
    score=Math.round(getFrameRate()/60)+score
    
  
  
    if(trex.isTouching(obstaclegroup)){
    gameState="Over";
      crashsound.play()
       }
  }
  
  else if(gameState==="Over"){
    ground.velocityX=0;
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    obstaclegroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    trex.changeAnimation("collided",trex_Collided);
    trex.velocityY=0;
    restart.visible=true;
    gameover.visible=true;
    
    if(mousePressedOver(restart)){
      reset() 
}
    
  }

  
 // console.count();
  
  //console.log(frameRate());
  
  
  trex.collide(invisibleGround)
  
  
  drawSprites();
  //console.timeEnd();

  
  
  //score=frameCount
  text("score"+score,550,20)
  
  
}

function reset(){
  gameState="play";
  score=0;
  restart.visible=false;
  gameover.visible=false;
  cloudgroup.destroyEach();
  obstaclegroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  
  
}

function spawnclouds(){
  
                       
  if(frameCount%60==0){
    clouds=createSprite(600,100,40,10);
    clouds.y=Math.round(random(5,100))
  clouds.velocityX=ground.velocityX;
    clouds.addImage("clouds",cloudImage)
    clouds.scale=0.9;
    clouds.depth=trex.depth;
    trex.depth=trex.depth+1;
  console.log(clouds.x);
    clouds.lifetime=120;
    cloudgroup.add(clouds);
  }
  
}

function spawnobstacle(){
  if(frameCount%60==0){
    obstacle=createSprite(600,165,50,50);
    obstacle.velocityX=ground.velocityX;
    obstaclegroup.add(obstacle);
    
    var randN=Math.round(random(1,6))
    
    switch(randN){
      case 1:
        obstacle.addImage(ob1);
        break;
        
        
         case 2:
        obstacle.addImage(ob2);
        break;
        
         case 3:
        obstacle.addImage(ob3);
        break;
        
        case 4:
        obstacle.addImage(ob4);
        break;
        
        case 5:
        obstacle.addImage(ob5);
        break;
        
         case 6:
        obstacle.addImage(ob6);
        break;
        
    }
 obstacle.scale=0.5;
    obstacle.lifetime=100;
  }
  
  
}