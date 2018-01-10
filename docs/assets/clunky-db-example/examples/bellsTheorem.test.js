const filterFunction = require('./bellsTheorem');
var filter = new filterFunction;  
describe('filter Function', function() {
    it('has objects pass through three filters and the light is 85%', function() {
        var array = filter.filterObjects();
        expect(array[0].Light).toEqual(85);
    });

    it('has objects pass through two filters and the light is 0%', function() {
        var array = filter.filterObjects();
        expect(array[1].Light).toEqual(0);
    });
});