var imageBox = document.getElementById('image-box');
var counter = 0;
var imageSlider;
var imageWidth = 700;
var slideLengthBreak = 700;
var imageMaxSlideLength = 2100;
var imageIndex = 1;
var prev=document.getElementById('prev');
var next = document.getElementById('next');

 function imageSlide(){
    imageSlider =  setInterval(function(){
        if(counter === -imageMaxSlideLength){
            imageIndex++;
            clearInterval(imageSlider);                
            setTimeout(imageSlide,2000);                      
            imageBox.style.left= 2100 + 'px';
            counter = 0;
            slideLengthBreak = imageWidth ;
        }else{
            if(counter === -slideLengthBreak){
                slideLengthBreak = slideLengthBreak + imageWidth ;
                clearInterval(imageSlider);                
                 setTimeout(imageSlide,2000);
                 if(imageIndex === 4){
                     imageIndex = 1;
                 }
                 imageIndex++;
                 console.log(imageIndex);           
            }
            counter--;
             console.log(counter);
            imageBox.style.marginLeft = counter + 'px';
            console.log(imageBox.style.left);
        }
        
    },10);

 }

imageSlide();

prev.addEventListener('click',function(){

    if(imageIndex === 1)
    {
        imageIndex = 4 ;
        clearInterval(imageSlider);
        imageBox.style.marginLeft = - (imageIndex-1) * imageWidth + 'px'; 
        setTimeout(imageSlide,2000);
    
    }
    else{
        clearInterval(imageSlider);
        imageBox.style.marginLeft =  - (imageIndex-1) * imageWidth + 'px'; 
        setTimeout(imageSlide,2000);    
    }   
  
});

next.addEventListener('click',function(){
    
    if(imageIndex === 4){
        imageIndex= 1;
        document.getElementById('image-box').style.marginLeft = - (imageIndex-1) * imageWidth + 'px'; 
        clearInterval(imageSlider);    
        setTimeout(imageSlide,2000);
    }else{
        document.getElementById('image-box').style.marginLeft = -(imageIndex-1 +1) * imageWidth + 'px'; 
        clearInterval(imageSlider);    
        setTimeout(imageSlide,2000);
       }    
});
