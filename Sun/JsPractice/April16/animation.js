var container=document.getElementById('container');
container.style.width='300px';
container.style.height='300px';
container.style.background='yellow';


var ball= document.getElementById('ball');
ball.style.width='30px';
ball.style.height='30px';
ball.style.borderRadius='20px';
ball.style.background='navy';
ball.style.position='absolute';
container.appendChild(ball);
container.style.clear='both';


var ballMove = 0;
var counter = 0;
var maxheight= 280;

/**Bouncing the ball using setInterval */

setInterval(function() {
    if(ballMove === maxheight)
    {
        if(maxheight===0)
        {
            maxheight = 280;
            
        }
        else{            
            ballMove--;
            maxheight--;
            
        ball.style.top= ballMove + 'px';
        
        }
        
    }
    else{        
        ballMove++;
        ball.style.top= ballMove + 'px';
        
        

   
    }
    

    
}, 1000/60);



// function callanimate(){

// setInterval(function() {        
//             if(ballMove === maxheight)
//             {
//                  reverse();
//             }
//             else{
                
//                 ballMove++;
//                 ball.style.top = ballMove + 'px';
                
//             }      
    
// }, 1000 / 60);
// }
// callanimate();
// function reverse(){
//     setInterval(function(){
        
//         if(ballMove === 0)
//             {   
//                 //ballMove = 0;
//                 callanimate();
//             }
//             else{
               
//                 ballMove--;
//                 ball.style.top = ballMove + 'px';
                
//             }

//     },1000 / 60)
    
// }



