describe('dataService', function () {
  describe('key  is Object, Array, undefined, null, number, RegExp type', function () {
    it('should return undefined', function () {
      var f = function () {
      };
      expect(DataService.get({
      })).toBeUndefined();
      expect(DataService.get(f)).toBeUndefined();
      expect(DataService.get([])).toBeUndefined();
      expect(DataService.get(undefined)).toBeUndefined();
      expect(DataService.get(null)).toBeUndefined();
      expect(DataService.get(0)).toBeUndefined();
      expect(DataService.get(/\d/)).toBeUndefined();
    });
  });
  describe('key is String type that do not match with - Timers ,ToDos, Archives string', function () {
    it('should return undefined', function () {
      expect(DataService.get('')).toBeUndefined();
    });
  });
  describe('Checking of correctly returned values  from get method within set method of DataService object', function () {
    var key0 = 'someName',
    key1 = 'ToDos',
    key2 = 'TaskList',
    key3 = 'Archive',
    str = 'someString',
    arr = [
      'someValueA',
      'someValueB'
    ],
    
    feedback = null;
    
    
    describe('return expected values within get method', function () {
      beforeEach(function () {
        DataService.set(key0, str);
        feedback = DataService.get(key0);
      });
      it('if key is ' + key0, function () {
        expect(feedback).toEqual(val1);
      });
      beforeEach(function () {
        DataService.set(key0, str);
        feedback = DataService.get(key0);
      });
      it('if key is ' + key0 + ' notEqual by return value', function () {
        expect(feedback).not.toEqual(val1);
      });
      beforeEach(function () {
        DataService.set(key1, arr);
        feedback = DataService.get(key1);
      });
      it('if key is ' + key1, function () {
        expect(feedback).toEqual(arr);
      });
      DataService.set(key2, arr);
      feedback = DataService.get(arr);
      it('if key is ' + key2, function () {
        expect(feedback).toEqual(arr);
      });
      DataService.set(key3, arr);
      feedback = DataService.get(arr);
      it('if key is ' + key3, function () {
        expect(feedback).toEqual(arr);
      });
    });
  });
});