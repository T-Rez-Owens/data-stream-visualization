const filterFunction = require('./bellsTheorem');
  
describe('filter Function', function() {
    it('has objects pass through three filters and the light is 85%', function(done) {
        console.log(filterFunction);
    var array = filterFunction.filterObjects();
    expect(array[0].Light).toEqual(85);
    
    });
});