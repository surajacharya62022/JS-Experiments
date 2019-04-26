var imageBox = document.getElementById('image-box');
var counter = 0;
var imageSlider;
var imageWidth = 700;
var slideLengthBreak = 700;
var imageMaxSlideLength = 2100;



 function imageSliding(){
    imageSlider =  setInterval(function(){
        if(counter === -imageMaxSlideLength){
            
            console.log(counter);
            console.log(imageMaxSlideLength);
            imageBox.style.transition = '0.6es ease';
            imageBox.style.left= 2100 + 'px';
            counter = 0;
            slideLengthBreak = imageWidth ;
        }else{
            if(counter === -slideLengthBreak){
                clearInterval(imageSlider);
                setTimeout(imageSliding,2000);
                slideLengthBreak = slideLengthBreak + imageWidth ;
           
            }

            counter--;
             console.log(counter);
            imageBox.style.marginLeft = counter + 'px';
            console.log(imageBox.style.left);
        }
        
    },6);

 }
imageSliding();

