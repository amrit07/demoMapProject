angular.module('filtersModule',[])
.filter('unique', function() {
    return function(input, key) {
        if(typeof input =='undefined'){return false;}
        var unique = {};
        var uniqueList = [];
        for(var i = 0,l= input.length; i < l; i++){
            if(typeof unique[input[i][key]] == "undefined"){
                unique[input[i][key]] = "";
                uniqueList.push(input[i]);
            }
        }
        return uniqueList;
    };
})
.filter('filterby',function(){
 return function(input,key,value){
  if(typeof input =='undefined'){return false;}
  var list =input.filter(function(item){
      return item[key]==value;
  });
  return list;

 }

});