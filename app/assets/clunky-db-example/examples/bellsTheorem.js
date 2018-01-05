class BellsTheorem{
    filterObjects(){
        var array = [];
        var threeFilters = [];
        var twoFilters = [];
        var objects = {
            x : 100,
            y: 100,
            z: 100
        }
        
        function filterA(objects){
            if(objects['x']>50){
                objects['x']=0;
            }
            return objects;
        }
        function filterB(objects){
            if(objects['y']>50){
                objects['y']=0;
            }
            if(objects['z']>50){
                objects['z']=0;
            }
            return objects;
        }
        function filterC(objects){
            if(objects['z']>50){
                objects['z']=0;
            }
            return objects;
        }
        function resultD(objects){
            return objects.x+objects.y+objects.z;
        }
        var aResult = filterA(objects);
        var bResult = filterB(aResult);
        var cResult = filterC(bResult);
        var sumLight = resultD(cResult);
        console.log("\na",aResult,"\nb",bResult,"\nc",cResult,"\nLight:",sumLight);
        
        var aResult = filterA(objects);
        var cResult = filterC(aResult);
        var sumLight = resultD(cResult);
        console.log("\na",aResult,"\nc",cResult,"\nLight:",sumLight);
        
        return array;
    }


}

module.exports = BellsTheorem;