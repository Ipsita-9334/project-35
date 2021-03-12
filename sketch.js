var balloon1, balloon2, balloon3;
var background, backgroundImg;
var database;
var position;

function preload() {
   backgroundImg = loadImage("images/picture1.png");
}


function setup() {
  createCanvas(500, 500);
  createSprite(400, 200, 50, 50);

  balloon = createSprite(250,250,10,10);
  balloon = loadImage("images/picture2.png")

  database = firebase.database();
  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value", readPosition, showError);
}

function draw() {
  textSize("89");
  fill("blue");

  if(keyDown(LEFT_ARROW)){
      balloon.x = balloon.x - 10;
  }
  else if(keyDown(RIGHT_ARROW)){
      balloon.x = balloon.x + 10;
  }
  else if(keyDown(UP_ARROW)){
      balloon.y = balloon.y - 10;
  }
  else if(keyDown(DOWN_ARROW)){
      balloon.y = balloon.y + 10;
  }
  
  drawSprites();
}

function readPosition(data){
position = data.val();
balloon.x = position.x;
balloon.y = position.y;
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    x: height.x + x,
    y: height.y + y
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y; 
}

function showError(){
  console.log("Error in writing the database");
}