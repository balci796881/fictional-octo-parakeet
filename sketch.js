//zombie trying to survive and evolve, must defeat rock monster.
//playing:zombie,NPC:rock monster.score based on amount of apples collected.
// as score increases, zombie evolves
var zombie;
var apple;
var rock;
var knight,caveman,soldier,apples,monster;
var ground;
var applesgroup,monstergroup;
var gameState = "Intro";
var enviroment,backgroundimg
var jumpsound,soldiersound,knightsound
var button,buttonimg
var score = 0; 
function preload(){
  caveman = loadImage("zombie.png")
  knight = loadImage("knight.png")
  soldier = loadImage("american.png")
  apples = loadImage("7.jpg")
  monster = loadImage("rock.jpg")
  backgroundimg = loadImage("background.jpg")
  jumpsound = loadSound("jump.wav")
  knightsound = loadSound("sword.mp3")
  soldiersound = loadSound("soldier.mp3")
  buttonimg = loadImage("button.png")
}

function setup() {
  createCanvas(600,325);
  enviroment = createSprite(5,140,10,10);
  enviroment.addImage(backgroundimg);
  enviroment.scale = 1.6;
  zombie = createSprite(80,260,160,10)
  zombie.addImage(caveman)
  zombie.scale = 0.2;
  zombie.setCollider("rectangle",10,5,250,300);
  ground = createSprite(137,320,275,50);
  ground.visible = true;
  fill("White")
  button = createSprite(275,162,110,30)
  applesgroup = createGroup()
  monstergroup = createGroup()
}

function draw() {
  background(180,255,255);  
  drawSprites();
  if(gameState==="Intro"){
    textSize(10)
    text("Press Space To Start",225,162)
    if(keyDown("SPACE")){
      gameState="PLAY"
      button.visible = false;
    }
  }
  if(gameState === "PLAY"){
    enviroment.velocityX = -9;
    if(enviroment.x<0){
      enviroment.x=enviroment.width/2;
    }
  if(keyDown("SPACE")&&zombie.y>=200){
    zombie.velocityY=-15;
    jumpsound.play();
  }
  zombie.velocityY =zombie.velocityY+0.8
  spawnapples();
  spawnMonster(); 
  if (zombie.isTouching(applesgroup)){
    score = score+1;
    applesgroup[0].destroy();   
  }
  if(score>=35){
    zombie.addImage(knight)
    knightsound.play();
  }
  if(score>=50){
    zombie.addImage(soldier)
    soldiersound.play();
  }
  if(monstergroup.isTouching(zombie)){
    gameState = "END";
  }
}
console.log(gameState)
if(gameState ==="END"){
  enviroment.velocityX = 0;
monstergroup.setVelocityXEach(0);
applesgroup.setVelocityXEach(0);
zombie.velocityY = 0;
monstergroup.setLifetimeEach(-1)
applesgroup.setLifetimeEach(-1)
}
zombie.collide(ground)
fill("black")
textSize(40);
text("score:"+score,10,40);
}
function spawnapples(){
  if(frameCount%60===0){
  apple = createSprite(550,280,50,50);
  apple.y = Math.round(random(150,250))
  apple.addImage(apples)
  apple.scale = 0.4;
  apple.velocityX = -6-score/2 ; 
  apple.lifetime = 200;
  zombie.depth = apple.depth;
  zombie.depth = zombie.depth+1
  applesgroup.add(apple);
  }
}
function spawnMonster(){
  if(frameCount%120===0){
    rock = createSprite(550,250,50,50)
    rock.addImage(monster)
    rock.scale = 0.15;
    rock.velocityX = -9-score/2;
    rock.lifetime = 150;
    
    zombie.depth = rock.depth;
    zombie.depth = zombie.depth+1

    monstergroup.add(rock);

  }
}