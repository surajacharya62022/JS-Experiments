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

function randomIntFromRange(min,max){
    return Math.floor(Math.random() * (max-min)+min);
}


function circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    
    this.velocity= {
        dx: Math.random() - SPEED,
        dy: Math.random() -SPEED
    };
    console.log(this.velocity.dx,this.velocity.dy);
    this.radius = radius;
    this.color = color;
    this.mass = 1;

    this.update = numberOfCircles => {
        this.draw();

        for(let i=0; i < numberOfCircles.length; i++){
            if(this === numberOfCircles[i])
            continue;
            
            //comparing the distance of each circle
            if(distanceOfCircles(this.x,this.y,numberOfCircles[i].x,numberOfCircles[i].y) - this.radius * 2 < 0){
             //  resolveCollision(this, numberOfCircles[i]);
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
         let rValue = randomIntFromRange(0, 255);
        let gValue = randomIntFromRange(0, 255);
        let bValue = randomIntFromRange(0, 255);
        let color = 'rgb(' + rValue + ',' + gValue + ',' + bValue + ')';
        // var color = 'purple';
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

// function rotate(velocity, angle) {
//     const rotatedVelocities = {
//         x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
//         y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
//     };

//     return rotatedVelocities;
// }


// function resolveCollision(particle, otherParticle) {
//     const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
//     const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

//     const xDist = otherParticle.x - particle.x;
//     const yDist = otherParticle.y - particle.y;

//     // Prevent accidental overlap of particles
//     if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

//         // Grab angle between the two colliding particles
//         const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

//         // Store mass in var for better readability in collision equation
//         const m1 = particle.mass;
//         const m2 = otherParticle.mass;

//         // Velocity before equation
//         const u1 = rotate(particle.velocity, angle);
//         const u2 = rotate(otherParticle.velocity, angle);

//         // Velocity after 1d collision equation
//         const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
//         const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

//         // Final velocity after rotating axis back to original location
//         const vFinal1 = rotate(v1, -angle);
//         const vFinal2 = rotate(v2, -angle);

//         // Swap particle velocities for realistic bounce effect
//         particle.velocity.x = vFinal1.x;
//         particle.velocity.y = vFinal1.y;
//         otherParticle.velocity.x = vFinal2.x;
//         otherParticle.velocity.y = vFinal2.y;
//     }
// }
