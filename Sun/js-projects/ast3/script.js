var score = 0;
window.onload = function() {
var canvas =  document.getElementById('canvas-container');
var ctx= canvas.getContext('2d');
var stopAnimation = null ;

canvas.width= window.innerWidth;
canvas.height= 900;
 const windowbg = new WindowBackground(canvas,ctx);
 const bird = new Bird(50,250,ctx);
 const bgbottom = new bottomBackground(canvas,ctx);
 
 const pipes = [];

 setInterval(function(){
    let pipeSet = createRandomPipe(ctx,canvas.width,canvas.height);
    pipes.push(pipeSet.top,pipeSet.bottom);

    
 },2000)

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
             

        if(collision(bird,pipes)){ 
            ctx.font = '100px serif';   
            ctx.fillStyle= 'red';
            ctx.fillText('Your Score is: '+ finalScore,canvas.width/2-100,300);           
             // alert('YOUR SCORE IS ====  ' + finalScore); 
            // console.log(test);  
           // window.cancelAnimationFrame(stopAnimation); 
            clearInterval(stopAnimation);
            
        }      
            
      //stopAnimation =  window.requestAnimationFrame(gameLoop);
    
    }, 1000 / 60);
        
    
};

}

const WindowBackground = function (canvas,ctx){
    this.canvas=canvas;
    this.ctx=ctx;
    this.bgPos = 0;
   // this.fgPos = 0;
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
   
   var self = this;
    window.addEventListener('keydown',function(e){
        if(e.keyCode === 32){
           
           self.vely = -18;
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
this.yPos= yPos;
this.xPos = xPos;
this.length = length;
this.speed = speed;
this.ctx = ctx;
this.width = 150;

}

Pipe.prototype.update = function(){
this.xPos -= this.speed;
}

function myScore(bird,pipes){
    var j=0;
    for(var i = 0;i < pipes.length; i++){
        let e = pipes[i];
        let topPipe = e.yPos <= 0;
        let x0 = e.xPos, x1 = e.xPos + e.width;
        if(topPipe){
            let y0 = e.yPos + e.length;
            let a = bird.x;
            let b = bird.y - bird.height / 2;
            j++;
            if(a > x0 && a < x1 && b < y0){
                return j;                 
                            
            }

        }
        else{
            let y2 = e.yPos;
            let a = bird.x;
            let b = bird.y + bird.height / 2;
            if( a > x0 && a < x1 && b > y2){
                return j;                      
           
            }
        }
        
    }
}

Pipe.prototype.render = function(){
  //  this.ctx.save();
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(this.xPos,this.yPos,this.width, this.length);
    this.ctx.fillStyle = 'blue';  
    this.ctx.fillRect(this.xPos+5,this.yPos+5,this.width-50,this.length-30); 
    this.ctx.fillStyle ='#ffffff';
 
}

function createRandomPipe(ctx,canvasWidth,canvasHeight){
    let lengthTop =  Math.round(Math.random()*200+100);
    let lengthBottom = canvasHeight - 200 - lengthTop;
    var yposition =  canvasHeight + 5 - lengthBottom;
    //console.log(yposition);
    let returnPipe = {};

    returnPipe.bottom = new Pipe(canvasWidth,yposition,lengthBottom,6,ctx);
     returnPipe.top = new Pipe(canvasWidth,0,lengthTop,6,ctx);
      return returnPipe;
    
}

function collision(bird,pipes){
  //  let collisionDetected = false;
    for(var i = 0;i < pipes.length; i++){
        let e = pipes[i];
        let topPipe = e.yPos <= 0;
        let x0 = e.xPos, x1 = e.xPos + e.width;
        if(topPipe){
            let y0 = e.yPos + e.length;
            let a = bird.x;
            let b = bird.y - bird.height / 2;
            if(a > x0 && a < x1 && b < y0){
                console.log(x0);
                return true;             
                            
            }

        }
        else{
            let y2 = e.yPos;
            let a = bird.x;
            let b = bird.y + bird.height / 2;
            if( a > x0 && a < x1 && b > y2){
                return true;
                       
           
            }
        }
        
    }
    return false;
}

