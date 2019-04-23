var points = [
    {x: 10, y: 20},
    {x: 40, y: 70},
    {x: 60, y: 20},
    {x: 100, y: 300},
    {x: 156, y: 40},
    {x: 60, y: 290}
    
];
var container=document.getElementById('container');
container.style.width='400px';
container.style.height='400px';
container.style.background='green';
container.style.position='relative';


points.forEach(function(dot){
    var graph=document.createElement('div');
    graph.style.width='10px';
    graph.style.height='10px';
    graph.style.padding='0px';
    graph.style.position='absolute';
    graph.style.background='navy';
    graph.style.outlineColor='yellow';
    graph.style.borderRadius='20px';
    graph.style.left=dot.x+ 'px';
    graph.style.top=dot.y + 'px';   
    container.appendChild(graph);
});