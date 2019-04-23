function pattern()
{
    var str=[];
    for(var start=5;start>0;start--){
        for(var toPrint=0;toPrint<start;toPrint++ ){
           str=str + ' ' + '*';
        }
        console.log(str);
        console.log('');
        str=[];
    }
}

console.log(pattern());