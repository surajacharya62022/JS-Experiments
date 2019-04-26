var score = 0;
var canvasMaxHeight = 650;
var pipes = [];
const BOTTOM_BACKGROUND_HEIGHT = 118;
const LENGTH_BETWEEN_TWO_PIPE = 250;
var dieSound= new Audio();
dieSound.src = './audio/hit.wav';

window.onload = function() {
var canvas =  document.getElementById('canvas-container');
var ctx= canvas.getContext('2d');
var stopAnimation = null ;
canvas.width= window.innerWidth;
canvas.height= canvasMaxHeight;
 const windowbg = new WindowBackground(canvas,ctx);
 const bird = new Bird(50,250,ctx);
 const bgbottom = new bottomBackground(canvas,ctx);
 
 //Create pipes at each interval.
 setInterval(function(){
    let pipeSet = createRandomPipe(ctx,canvas.width,canvas.height);
    pipes.push(pipeSet);    

 },2000)

 //Start game.
 gameLoop();

ctx.fillStyle = '#ffffff';
  function gameLoop(){
     stopAnimation = setInterval(function() {
        ctx.fillRect(0,0,canvas.width,canvas.height);
        windowbg.update();
        windowbg.render();

        pipes.forEach(function(pipe){
            pipe.update();
            pipe.render();           
        });

        bird.update();
        bird.render(); 
        bgbottom.update();
        bgbottom.render();      
        var finalScore= myScore(bird,pipes);             
       
        if(detectCollision(bird,pipes)){ 
            ctx.font = '100px serif';
            ctx.textAlign = 'center';
            ctx.fillStyle= 'white';
            ctx.fillText('Game Over ',canvas.width / 2,300);          
            
            ctx.font = '100px serif';
            ctx.textAlign = 'center';
            ctx.fillStyle= 'red';
            ctx.fillText('Your Score is: '+ finalScore,canvas.width / 2,630); 

            ctx.fillStyle = 'gray';
            
            ctx.fillRect(600, 356,200,55);

            ctx.fillStyle = 'yellow';
            ctx.font = '50px arial';
            ctx.fillText('Play Again',700, 400,200,200);
            dieSound.play();
            clearInterval(stopAnimation);   
            canvas.addEventListener('click',rePlay,false);           
                  
        }                   
    }, 1000 / 60);}

    function rePlay(event){
        var x =event.pageX;
        var y= event.pageY;
        console.log(x,y);
        if((x >= 600 && x < 800) && (y >356 && y< 411 ) ){
           location.reload();
        }
    }     
    
}

const WindowBackground = function (canvas,ctx){
    this.canvas=canvas;
    this.ctx=ctx;
    this.bgPos = 0;
    this.speed = 3;
    this.bgWidth = 288;
    this.bgImg= document.getElementById('bgImage');       
}

WindowBackground.prototype.update = function (){
   this.bgPos -= this.speed;
   if(this.bgPos < -this.bgWidth){
       this.bgPos = 0;
   }
   
}


WindowBackground.prototype.render = function () {
   for(let i = 0; i <= this.canvas.width/this.bgWidth+1; i++){   
    this.ctx.drawImage(this.bgImg,this.bgPos + i * this.bgWidth,0);
   }
}
const bottomBackground = function (canvas, ctx){
    this.canvas =canvas;
    this.xp = 0;
    this.ctx =ctx;
    this.speed = 3;
    this.width = 306;
    this.bottombg= document.getElementById('bottombg');
}
bottomBackground.prototype.update = function(){
    this.xp -= this.speed;
    if(this.xp < -this.width){
        this.xp = 0;
    }
}

bottomBackground.prototype.render = function(){
    for(let i =0; i <= this.canvas.width/this.width+1; i++){
        this.ctx.drawImage(this.bottombg,this.xp + i * this.width,512,this.width,388);
    }
}

const Bird =  function(x,y,ctx){
    this.x = x;
    this.y = y;
    this.ctx=ctx;
    this.vely= 0;
    this.width = 38;
    this.height = 26;
    this.spriteIndex = 0;
    this.birdsprites = [document.getElementById('bird1'),
    document.getElementById('bird2'),
    document.getElementById('bird3')];
   
   var increaseBirdPositionTopWhenSpaceIsPressed = this;
    window.addEventListener('keydown',function(e){
        if(e.keyCode === 32){           
            increaseBirdPositionTopWhenSpaceIsPressed.vely = -15;
        }
    });
};

Bird.prototype.update = function(){
    this.ticks++;
    if(this.ticks % 15 === 0){
        this.spriteIndex =  (this.spriteIndex +1) % this.sprites.length;
       // console.log((this.spriteIndex +1) % this.sprites.length)
       
    }
    this.y += this.vely;
    this.vely += 2;
}

Bird.prototype.render = function(){
let renderX = this.x - this.width/2;
let renderY = this.y - this.height/2;
this.ctx.drawImage(this.birdsprites[this.spriteIndex], renderX, renderY);
}

const Pipe = function(xPos,yPos,length,speed,ctx){
this.xPos = xPos;
this.yPos= yPos;
this.length = length;
this.speed = speed;
this.ctx = ctx;
this.width = 200;
this.canvasHeight = 650;
//this.lengthBottom =  Math.round(Math.random()*200+100);
this.bottomPipeLength = this.canvasHeight - LENGTH_BETWEEN_TWO_PIPE - this.length;
 this.bottomPipeYPosition =  this.canvasHeight - this.bottomPipeLength;
this.northPipe = document.getElementById('north-pipe');
this.southPipe = document.getElementById('south-pipe');

}

Pipe.prototype.update = function(){
this.xPos -= this.speed;
}

Pipe.prototype.render = function(){      
      this.ctx.drawImage(this.northPipe,this.xPos,this.yPos,this.width,this.length); 
      this.ctx.drawImage(this.southPipe,this.xPos,this.bottomPipeYPosition,this.width,this.bottomPipeLength);
}

function myScore(bird,pipes){
    for(var i = 0;i < pipes.length; i++){        
        let e = pipes[i];
        let topPipe = e.yPos <= 0;        
        let topPipeXPosition = e.xPos;
        let pipeWithfromXposition = e.xPos + e.width;
        let bottomPipeYPosition= canvasMaxHeight - LENGTH_BETWEEN_TWO_PIPE - e.length;        
        let canvasBottomBackgroundLength=  canvasMaxHeight - BOTTOM_BACKGROUND_HEIGHT;
        var bottomLength = canvasMaxHeight - bottomPipeYPosition;
        let birdXPosition = bird.x;
        
        if(topPipe){
            let topPipeYPosition = e.yPos + e.length;            
            let birdHeightPositionToColideWithTopPipe = bird.y - bird.height / 2;
            if(birdXPosition > topPipeXPosition && birdXPosition < pipeWithfromXposition && birdHeightPositionToColideWithTopPipe < topPipeYPosition ){              
                
                return i;                      
            }
        }           
        let birdHeightPoisitionToColideWithBottomPipe = bird.y + bird.height / 2;
            
        if( birdXPosition > topPipeXPosition && birdXPosition < pipeWithfromXposition && birdHeightPoisitionToColideWithBottomPipe > bottomLength ||  birdHeightPoisitionToColideWithBottomPipe>= canvasBottomBackgroundLength){
            
            return i;           
        }        
    }
      
}

function createRandomPipe(ctx,canvasWidth,canvasHeight){
    let lengthTop =  Math.round(Math.random()*250);
    let returnPipe;
    let pipeInterval = 5;
    returnPipe = new Pipe(canvasWidth,0,lengthTop,pipeInterval,ctx);
    return returnPipe;    
}

function detectCollision(bird,pipes){       
    for(var i = 0;i < pipes.length; i++){        
        let pipe = pipes[i];
        let topPipe = pipe.yPos <= 0;        
        let topPipeXPosition = pipe.xPos;
        let pipeWithfromXposition = pipe.xPos + pipe.width;
        let bottomPipeYPosition= canvasMaxHeight - LENGTH_BETWEEN_TWO_PIPE - pipe.length;        
        let canvasBottomBackgroundLength=  canvasMaxHeight - BOTTOM_BACKGROUND_HEIGHT;
        var bottomLength = canvasMaxHeight - bottomPipeYPosition;
        let birdXPosition = bird.x;
        
        if(topPipe){
            let topPipeYPosition = pipe.yPos + pipe.length;
            
            let birdHeightPositionToColideWithTopPipe = bird.y - bird.height / 2;
            if(birdXPosition > topPipeXPosition && birdXPosition < pipeWithfromXposition && birdHeightPositionToColideWithTopPipe < topPipeYPosition ){              
                return true;                      
            }
        }           
        let birdHeightPoisitionToColideWithBottomPipe = bird.y + bird.height / 2;
            
        if( birdXPosition > topPipeXPosition && birdXPosition < pipeWithfromXposition && birdHeightPoisitionToColideWithBottomPipe > bottomLength ||  birdHeightPoisitionToColideWithBottomPipe > canvasBottomBackgroundLength){
            return true;           
        }        
    }
    return false;
}