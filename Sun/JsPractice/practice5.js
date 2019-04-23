var array = [1,2,3,4];
var newArray = [];

// var result=array.forEach(function(value){
//     newArray.push( value + value );
// }
// );


var result=array.reduce(function(acc,value){
    newArray.push( acc + value );
},2);

console.log(newArray);