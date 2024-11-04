/* VARIABLES */
let walls;
let gameState
let door;
let player;
let cbirds;
let cbird1;
let cbird2;
let cbird3;
let cbird4;
let cbird5;
let cbird6;
let score;
let hawks;
let hawk1;
let hawk2;
let hawk3;
let wind;
let topText;
let txtx;
let txty;

/* PRELOAD LOADS FILES */
function preload(){
  
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);
  

  walls= new Group();
  walls.collider='s';
  //*border walls. x,y,w,h,collide
  new walls.Sprite(200,50,380,2);
  new walls.Sprite(10,195,2,290);
  new walls.Sprite(width-10,220,2,340);
  new walls.Sprite(200,390,380,2);

  //*left walls, top corner and then lower 
  new walls.Sprite(120,70,1,40);
  new walls.Sprite(165,147,70,1);
  
  new walls.Sprite(50,190,80,1);
  new walls.Sprite(90,235,1,90);
  //partitions, side and bottom
  new walls.Sprite(200,160,1,220);
  new walls.Sprite(120,340,220,1);

  //*right walls. top left and right, then middle
  new walls.Sprite(280,85,1,70);
  new walls.Sprite(360,135,55,1);
  new walls.Sprite(260,220,120,1);
  //wall above door
  new walls.Sprite(350,290,75,1);
    //x, y, width, height
  walls.color= color(0);
  
  
//door
  door=new Sprite(353,340,65,90);
  door.collider='s';
  door.color='brown';
 
  //birds- consider changing to baby ducks?
  cbirds=new Group();
  cbirds.collider='k';
  cbird1= new cbirds.Sprite(160,70);
  cbird2= new cbirds.Sprite(170,170);
  cbird3= new cbirds.Sprite(50,220);
  cbird4= new cbirds.Sprite(240,70);
  cbird5= new cbirds.Sprite(360,70);
  cbird6= new cbirds.Sprite(220,200);
  cbirds.w=30;
  cbirds.h=30;
  cbirds.color='lightblue';
  
   //player
player=new Sprite(40,70,30);
  player.rotationLock=true;
  player.color='blue';
  //hawks
  hawks=new Group();
  hawks.collider='k';
  hawks.w=30;
  hawks.h=30;
  hawks.color='red';
  hawk1= new hawks.Sprite(30,270);
  hawk1.vel.x=1;
  hawk2= new hawks.Sprite(40,145);
  hawk2.vel.x=1;
  hawk3= new hawks.Sprite(290,360);
  hawk3.vel.y=3;
  //wind
  wind= new Sprite(270,140,25,25,'k')
  wind.color='teal';
  wind.vel.x=1

  score=0;
  
}

/* DRAW LOOP REPEATS */
function draw() {
  background('#f7e4b0');
  fill('black');
  if (score<6){
     topText='Use the arrow keys to move. Collect all six birds. Avoid the hawks and \n avoid wind gusts which will bring you back to the start!';
  }
  text(
    topText,
    10, 20);
  //player controls
  
  if (kb.pressing("left")) {
    player.vel.x = -5;
  } else if (kb.pressing("right")) {
    player.vel.x = 5;
  } else if (kb.pressing("up")) {
    player.vel.y = -5;
  } else if (kb.pressing("down")) {
    player.vel.y = 5;
  } else {
    player.vel.x = 0;
    player.vel.y = 0;
  }
  if (player.x<=0){
    player.x=1;
  }
  //hawk & wind movements+ interaction
  if (hawk1.x >= 74){
    hawk1.vel.x=-1; 
  } else if (hawk1.x < 27){
    hawk1.vel.x=1;
  } 
  if (hawk2.x > 115){
    hawk2.vel.x=-1; 
  } else if (hawk2.x < 27){
    hawk2.vel.x=1;
  } 
  if (hawk3.y > 370){
    hawk3.vel.y=-3; 
  } else if (hawk3.y < 240){
    hawk3.vel.y=3;
  } 
  if (player.collides(hawks)){
    score=8;
    topText='             You Lose! Press Space to restart.';
    gameSee(false);
    
  }
  
  if (wind.x > 315){
    wind.vel.x=-2; 
  } else if (wind.x < 215){
    wind.vel.x=2;
  }
  if (player.collides(wind)){
    player.pos={x:40,y:70}
  }

  //bird interaction
  for (let i=0; i < cbirds.length;i++) {
    if (player.collides(cbirds[i])){
      cbirds[i].visible=false;
      cbirds[i].collider='n';
      score = score + 1;
      print(score);
    }
  }
  //win 
  if(player.collides(door)&&score==6){
    topText='You Win!'
    gameSee(false);
  }
  if (kb.pressing('space')){
    score=0;
    player.pos={x:40,y:70};
    gameSee(true);
    print(score);
  }
  

}

/* FUNCTIONS */
//this function makes the game screen visible(or not) and changes all collider types in order to make screen changes easier 
function gameSee(bool){
  wind.visible=bool;
  cbirds.visible=bool;
  walls.visible=bool;
  door.visible=bool;
  hawks.visible=bool;
  player.visible=bool;
  if (bool==true){
    cbirds.collider='k';
  } else if(bool==false);
  
  }
function gameWin(){
  gameSee(false);
  background('#f7e4b0');
  
}