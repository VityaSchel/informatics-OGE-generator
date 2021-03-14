const utils = {
  shuffle: function(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
  },

  random: function(min_inclusive, max_inclusive, exclude = []) {
    exclude = []
    exclude.push(...exclude)
    let random;
    do {
      random = Math.floor(min_inclusive + Math.random() * (max_inclusive + 1 - min_inclusive))
    } while(exclude.includes(random))
    return random
  },

  randomItem: function(array) {
    return array[Math.floor(Math.random() * array.length)]
  },

  capitalize: function(string) {
    return string.charAt(0).toUpperCase()+string.substring(1)
  },

  toPureLabel: function(string) {
    string = string.replace(/[^а-яА-Я ]/umg, '')
    string = string.replace(/ и/umg, '')
    return string
  },

  wordsLimit: function(string, limit) {
    return string.split(' ').slice(0, limit).join(' ')
  },

  flatObject: function(nestedObject) {
    function traverseAndFlatten(currentNode, target, flattenedKey) {
        for (var key in currentNode) {
            if (currentNode.hasOwnProperty(key)) {
                var newKey;
                if (flattenedKey === undefined) {
                    newKey = key;
                } else {
                    newKey = flattenedKey + key;
                }

                var value = currentNode[key];
                if (typeof value === "object") {
                    traverseAndFlatten(value, target, newKey);
                } else {
                    target[newKey] = value;
                }
            }
        }
    }

    function flatten(obj) {
        var flattenedObject = {};
        traverseAndFlatten(obj, flattenedObject);
        return flattenedObject;
    }

    return flatten(nestedObject)
  },

  closePoints: function(point1, point2, shrinkPercentage){
    // point1: array[2], point2: array[2], shrinkPercentage: Number(0.0 - 1.0)

    let x1 = point1[0]
    let x2 = point2[0]
    let y1 = point1[1]
    let y2 = point2[1]

    let xCross = x2
    let yCross = y1

    let crossWidth = xCross-x1
    let crossWidthOffset = crossWidth*shrinkPercentage/2
    let crossWidthShrink = crossWidth*(1-shrinkPercentage)

    let shrinkedPoint1X = x1 + crossWidthOffset
    let shrinkedPoint2X = x1 + crossWidthOffset + crossWidthShrink

    let crossHeight = yCross-y2
    let crossHeightOffset = crossHeight*shrinkPercentage/2
    let crossHeightShrink = crossHeight*(1-shrinkPercentage)

    let shrinkedPoint1Y = y2 + crossHeightOffset
    let shrinkedPoint2Y = y2 + crossHeightOffset + crossHeightShrink

    return [[shrinkedPoint1X, shrinkedPoint2Y], [shrinkedPoint2X, shrinkedPoint1Y]]
  }
}

export default utils