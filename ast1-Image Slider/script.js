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

            clearInterval(imageSlider);                
            setTimeout(imageSliding,2000);
           
            console.log(counter);
            console.log(imageMaxSlideLength);
           // imageBox.style.transition = '0.6s ease';
            imageBox.style.left= 2100 + 'px';
            counter = 0;
            slideLengthBreak = imageWidth ;
        }else{
            if(counter === -slideLengthBreak){
                slideLengthBreak = slideLengthBreak + imageWidth ;
                clearInterval(imageSlider);                
                 setTimeout(imageSlide,2000);
                 imageIndex++;
                 console.log(imageIndex);           
            }
            counter--;
             console.log(counter);
            imageBox.style.marginLeft = counter + 'px';
            console.log(imageBox.style.left);
        }
        
    },6);

 }

imageSlide();
function changeMargin() {
    document.getElementById('image-box').style.left = 1000 + 'px';
    console.log(document.getElementById('image-box').style.left);
  }

next.addEventListener('click',function(){
    
    var getindex = imageIndex;
    console.log('test');
    clearInterval(imageSlider);
    console.log(counter);
    changeMargin();
    // imageBox.style.left = -700 + 'px';
    // console.log(imageBox.style.left);

});
