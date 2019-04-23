var fruits=[
    {id:1,
    name:'Banana',
    color:'Yellow'
    },
    {id:2,
        name:'Apple',
        color:'Red'
    }
];

function searchByName(){

};
var key=Object.keys(fruits);
var arr= [];


/**Search by Value */
function searchByName(fruits,name)
{

    var result = fruits.filter(function(fruit){
        if(fruit.name === name){
            return fruit;
        }
    })
    console.log(result);
}
searchByName(fruits,'Apple');
/**Search by Key */

function searchByKey(fruits,key,value)
{
    var result =fruits.map(function(fruit){
        if(fruit[key]===value){
            return fruit;
        }
    })
    console.log(result);
}

searchByKey(fruits,'name','Apple');
