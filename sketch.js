//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dog1img, dog2img;

foodS = 20;

function preload()
{
  //load images here
  dog1img = loadImage("images/dogImg.png");
  dog2img = loadImage("images/dogImg1.png");
}

function setup() 
{
  createCanvas(500, 500);

  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  
  dog = createSprite(250,400);
}


function draw() 
{  
  background(46,139,87);

  dog.addImage(dog1img);

  dog.scale = 0.2;

  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(dog2img);
  }

  drawSprites();
  //add styles here
  textSize(20);
  fill("black")
  text("Food Stock :- "+foodS,100,150);
  text("NOTE :- Press Up Arrow To Feed The Dog",50,50);
}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x)
{
  if(x<=0)
  {
    x = 0
  }
  else
  {
    x = x - 1;
  }

  database.ref("/").update
  ({
    Food : x
  })
}
