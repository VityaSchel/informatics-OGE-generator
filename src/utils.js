import md5 from 'md5'

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
  },

  encodeAnswer: function(excercise, answer, skipDebugLog = false){
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
      if(!skipDebugLog)
        pushAnswerToDebug(excercise, answer)

    const salt = '🧂🧂🧂 SALT !!! :D 🧂🧂🧂'
    if(answer === undefined) {
      return answer
    } else {
      let _answer = String(answer).toLowerCase()
      let seed = window.appData.seed
      return md5(_answer + salt + excercise + seed)
    }
  },


  ending: function(digit){
    digit = Number(digit)
    if(digit % 10 == 0 || digit.isBetween(11, 14)){
      return 'ов'
    } else if(digit % 10 == 1 && digit !== 11) {
      return ''
    } else if((digit % 10).isBetween(2,4)) {
      return 'а'
    } else {
      return 'ов'
    }
  },

  copyText: function(string){
    let _tmpinput = document.createElement('textarea')
    _tmpinput.style = {
      'display': 'none'
    }
    document.body.appendChild(_tmpinput)
    _tmpinput.value = string
    _tmpinput.select()
    _tmpinput.setSelectionRange(0, 99999)
    document.execCommand("copy")
    _tmpinput.remove()
  }
}

Number.prototype.isBetween = function(min_inclusive, max_inclusive){
  return (this >= min_inclusive && this <= max_inclusive)
}

Array.prototype.last = function(){
  return this[this.length-1]
}

function pushAnswerToDebug(excercise, answer){
  function prepareDebug(){
    if(window.appData.DEBUG === undefined){
      window.appData.DEBUG = {}
    }
    if(window.appData.DEBUG.answers === undefined){
      window.appData.DEBUG.answers = []
    }
    if(!Array.isArray(window.appData.DEBUG.answers[excercise])) {
      window.appData.DEBUG.answers[excercise] = []
    }
    if(typeof window.appData.DEBUG.autofill !== 'function'){
      window.appData.DEBUG.autofill = function(from = 1, to = 12){
        for (let i = from; i <= to; i++){
          let correctAnswer = window.appData.DEBUG.answers[i]
          if(correctAnswer !== undefined){
            window.appData.answersInputs[i].current.querySelector('input').value = correctAnswer[0]
            window.appData.answers[i] = correctAnswer[0]
          }
        }
      }
    }
    if(typeof window.appData.DEBUG.unlock11and12 !== 'function'){
      window.appData.DEBUG.unlock11and12 = function(){
        window.ExtraFiles.generate()
      }
    }
  }

  prepareDebug()
  window.appData.DEBUG.answers[excercise].push(answer)
}

export default utils