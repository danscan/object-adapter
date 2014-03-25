var _ = require('underscore'),
    getValueAtPath,
    setValueAtPath,
    Adapter;

/**
 * that takes an object and a path, and 
 * gets the value at that path of the object
 *
 * @param <Object> object
 * @param <String> path
 *
 * @returns <Mixed> value
 */
getValueAtPath = function getValueAtPath(object, path) {
  var subPaths = path.split('.'),
      value = object;

  for (i in subPaths) {
    value = (value[subPaths[i]] ? value[subPaths[i]] : undefined);
  }

  return value;
};

/**
 * takes an object and a path, and sets
 * the value at that path of the object
 *
 * @param <Object> object
 * @param <String> path
 *
 * @returns <Object> object
 */
setValueAtPath = function setValueAtPath(object, path, value) {
  var subPaths = path.split('.'),
      ref = object;

  for (i in subPaths) {
    if (i < subPaths.length - 1) {
      ref = (ref[subPaths[i]] ? ref[subPaths[i]] : ref[subPaths[i]] = {});
    } else {
      ref[subPaths[i]] = value;
    }
  }

  return object;
};

// Adapter
module.exports = Adapter = function ObjectAdapterConstructor(pathsMap) {
  this.pathsMap = pathsMap;

  // Return ObjectAdapter for provided pathsMap
  return function ObjectAdapter(array) {
    var objectsMapped = 0;

    return _.map(array, function adaptObject(object) {
      _.each(pathsMap, function mapPath(destPath, srcPath) {
        object = setValueAtPath(object, destPath, getValueAtPath(object, srcPath));
      });

      return object;
    });
  };
};
