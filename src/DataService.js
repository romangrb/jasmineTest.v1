(function (root, service) {
  // Browser globals (root is window)
  root.DataService = service();
}(this, function () {
  
  var DataService = {},
      storage = null;
  var serialize = function (value) {
    return JSON.stringify(value)
  };
  var deserialize = function (value) {
    if (typeof value != 'string') {
      return undefined;
    }
    try {
      return JSON.parse(value)
    } 
    catch (e) {
      return value || undefined;
    };
  };
  
  var isKeyObject = function(key){
      
     if(typeof key ==='string'){      
      
       switch(key) {
          case 'TaskList':
                return  key;
                break;
          
          case 'ToDos':
                return  key;
                break;
        
          case 'Archive':
                return  key;
                break;
           
          case '__DataServiceTest__':
                return  key;
                break;
           
          default:
                console.log('key : '+ key +' - is undefined');
                return false;
         }
       
       }else{
           console.log('key : is not a string type');
           return false;
         }
    
   };
  function isLocalStorageNameSupported() {
    try {
      return ('localStorage' in window && window['localStorage'])
    } 
    catch (err) {
      return false;
    }
  };
  if (isLocalStorageNameSupported()) {
    
    storage = window['localStorage']; 
    
    DataService.set = function (key, val) {      
      if (val === undefined) {
        return DataService.remove(key);
      }            
      if (isKeyObject.call(this, key)){                        
        var val = (key!=='__DataServiceTest__')? val : '__DataServiceTest__';        
      storage.setItem(key, serialize.call(this, val));
      return val;
      }
    };
    DataService.get = function (key, defaultVal) {
      if (isKeyObject.call(this, key)){
      
        var val = deserialize.call(this, storage.getItem(key));
        return (val === undefined ? defaultVal : val);
      };
    };
    DataService.remove = function (key) {
      if (isKeyObject.call(this, key)){
        storage.removeItem(key);
      };
    };
    DataService.clear = function () {
      storage.clear();
    }; 
    
  }
  try {
    var testKey = '__DataServiceTest__';
        DataService.set(testKey, testKey);
    if (DataService.get(testKey) != testKey) {
      DataService.disabled = true;
    }
    DataService.remove(testKey);
  } catch (e) {
    DataService.disabled = true;
  }
  DataService.enabled = !DataService.disabled;
  return DataService;
}));

