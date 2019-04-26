const canvas = document.getElementById('canvas-box');
const context = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
const SPEED = 1.5;

function distanceOfCircles(x1, y1, x2, y2) {
    const xDis = x2 - x1;
    const yDis = y2 - y1;

    return Math.sqrt(Math.pow(xDis, 2) + Math.pow(yDis, 2));
   // console.log(Math.sqrt(Math.pow(xDis, 2) + Math.pow(yDis, 2)));
}

//
function randomIntFromRange(min,max){
    return Math.floor(Math.random() * (max-min)+min);
}

function circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.velocity= {
        dx: Math.random() - SPEED,
        dy: Math.random() - SPEED 
    };
    console.log(color);
    this.radius = radius;
    this.color = color;
    //this.mass = 1;

    this.update = numberOfCircles => {
        this.draw();

        for(let i=0; i < numberOfCircles.length; i++){
            if(this === numberOfCircles[i])
            continue;
            
            //comparing the distance of each circle
            if(distanceOfCircles(this.x,this.y,numberOfCircles[i].x,numberOfCircles[i].y) - this.radius * 2 < 0){
              // resolveCollision(this, numberOfCircles[i]);
                this.velocity.dx = -this.velocity.dx;
              this.velocity.dy = -this.velocity.dy;       
            
               
            }
        }
        
        //collide within the window frame
        if(this.x - this.radius <= 0 || this.x + this.radius >= innerWidth){
            this.velocity.dx = - this.velocity.dx;
        }
        if(this.y - this.radius <= 0 || this.y + this.radius >= innerHeight){
            this.velocity.dy = - this.velocity.dy;
        }
        this.x += this.velocity.dx;
        this.y += this.velocity.dy;
    }

    this.draw = function () {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.stroke();
        context.fill();
    }
}

var numberOfCircles;

function init() {
    numberOfCircles = [];
   
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < 100; i++) {

        var radius = 10;
        //do not collapse with the left and right of the window frame
        let x = randomIntFromRange(radius,canvas.width-radius);

        //do not collapse with the top and buttom of the window frame
         let y = randomIntFromRange(radius,canvas.height-radius);
         var color = 'purple';
        if(i !== 0){
            for (let j = 0; j < numberOfCircles.length; j++){

                //create distance between circles
                if(distanceOfCircles(x,y,numberOfCircles[j].x,numberOfCircles[j].y)-radius<0){
                    x= randomIntFromRange(radius,canvas.width-radius);
                    y = randomIntFromRange(radius,canvas.height-radius);
                    j=0;
                }
            }
        }
        
        numberOfCircles.push(new circle(x, y, radius, color));
       
    }
}

function animate() {
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    numberOfCircles.forEach(numberOfCircle => {
        numberOfCircle.update(numberOfCircles);

    });
    requestAnimationFrame(animate);
}


console.log(numberOfCircles);

console.log(innerWidth);
init();
animate();


