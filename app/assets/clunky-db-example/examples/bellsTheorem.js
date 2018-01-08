class BellsTheorem{
    filterObjects(){
        var array = [];
        
        var objectsArray = []
        for(i=0;i<50,i++) {
            objectsArray.push(
                {
                    a : 1,
                    b: 1,
                    c: 1,
                });
        }
        for(i=0;i<50,i++) {
            objectsArray.push(
                {
                    b: 1,
                    c: 1,
                    spin: 1
                });
        }
        var dividor = 2;
        var limit = 1;
        var multiplier = .0005;
        function magicEquation(number){
            return 0;
        }
        
        function filterA(objects){
           for(i=0;i<objects.length;i++){
            if(objects[i].d)
           }
            
            return objects;
        }
        function filterB(objects){
            
            objects['x']=(objects['y']/2)*.85;
            objects['y']=0;
            return objects;
        }
        function filterC(objects){
            
           
            objects['d']=objects['y'];
            objects['y']=0;
            objects['z']=0;
           
            return objects;
        }
        function resultD(objects){
            return objects.x+objects.y+objects.z;
        }
        var aResult1 = filterA(objects);
        var bResult1 = filterB(aResult1);
        var cResult1 = filterC(bResult1);
        var sumLight1 = resultD(cResult1);
        var threeFilters = {
            aResult:aResult1,
            bResult:bResult1,
            cResult:cResult1,
            Light:sumLight1
        }
        array.push(threeFilters);
        var objects2 = {
            x : 100,
            y: 100,
            z: 100
        }
        var aResult = filterA(objects2);
        var cResult = filterC(aResult);
        var sumLight = resultD(cResult);
        var twoFilters = {
            aResult:aResult,
            cResult:cResult,
            Light:sumLight
        }
        array.push(twoFilters);
        return array;
    }


}

module.exports = BellsTheorem;