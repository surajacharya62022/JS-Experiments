var parent= document.getElementById('container');

var newElement= document.createElement('div');
newElement.innerHTML='This is container class';
newElement.style.padding='30px';
newElement.style.background='gray';
newElement.style.color='red';

parent.appendChild(newElement);

newElement.addEventListener('click',function(){
newElement.style.background='black';

});




