var userInformation = [
    {   
        name:'Suraj',
        gender:'Male',
        education:[
            {
                name:'New Horizon',
                year:2017
            }
        ]
    },
    {
        name:'Siddhantha',
        gender:'Male',
        education:[
            {
                name:'New Horizon',
                year:2017
            }
        ]
    }
];

var result=userInformation.forEach( function(value) {
    console.log('Name:',value.name);
    console.log('Gender:',value.gender);
    console.log('educaton:');
    value.education.forEach(function(education){
        console.log('\t Name',education.name);
        console.log('Year',education.year);
        
    }
        
    )
    console.log('\n');
    
});


