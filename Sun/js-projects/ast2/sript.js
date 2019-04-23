const canvas = document.getElementById('canvas-box');
const context = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
const SPEED = 0.7;

function distanceOfCircles(x1, y1, x2, y2) {
    const xDis = x2 - x1;
    const yDis = y2 - y1;

    return Math.sqrt(Math.pow(xDis, 2) + Math.pow(yDis, 2));
    console.log(Math.sqrt(Math.pow(xDis, 2) + Math.pow(yDis, 2)));
}

//
function randomIntFromRange(min,max){
    return Math.floor(Math.random() * (max-min+1)+min);
}

function circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.velocity= {
        dx: Math.random() - SPEED,
        dy: Math.random() - SPEED 
    };
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
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < 50; i++) {

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
        //console.log(x);
        numberOfCircles.push(new circle(x, y, radius, color));
        
    }
  //  console.log(numberOfCircles.length);


}
function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    numberOfCircles.forEach(numberOfCircle => {
        numberOfCircle.update(numberOfCircles);

    });
}


console.log(numberOfCircles);

console.log(innerWidth);
init();
animate();




// function rotate(velocity, angle){
//     var rotatedVelocities = {
//         x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
//         y: velocity.x * Math.sin(angle) +  velocity.y * Math.cos(angle)
//     };

//     return rotatedVelocities;
// }



// function collisionDetection(numberOfCircle, otherCircle){
//     var xVelocityDiff = numberOfCircle.velocity.x - otherCircle.velocity.x;
//     var yVelocityDiff = numberOfCircle.velocity.y- otherCircle.velocity.y;

//     var xDist = otherCircle.x - numberOfCircle.x;
//     var yDist = otherCircle.y - numberOfCircle.y;

//     if(xVelocityDiff * xDist + yVelocityDiff * yDist >= 0)
//     {
//         //returns the angle from x-axis point
//         var angle = -Math.atan2(otherCircle.y - numberOfCircle.y, otherCircle.x - numberOfCircle.x );

//         //store mass in var for better readability in collision
//         var m1 = numberOfCircle.mass;
//         var m2 =  otherCircle.mass;

//         //velocity before equation
//         var u1= rotate(numberOfCircle.velocity, angle);
//         var u2= rotate(otherCircle.velocity, angle);

//         //velocity after id collection equation
//         var v1 = {
//             x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y};
                
        
//         var v2 = {
//             x: u2.x * (m1 - m2) / (m1 + m2) +  u1.x * 2 * m2 / (m1 + m2), y: u2.y};
       
//             var vFinalx =  rotate(v1, -angle);
//             var vFinaly = rotate(v2, -angle);

//             numberOfCircle.velocity.x = vFinalx.x;
//             numberOfCircle.velocity.y = vFinalx.y;

//             otherCircle.velocity.x = vFinaly.x;
//             otherCircle.velocity.y = vFinaly.y;           
    
//         }

// }

