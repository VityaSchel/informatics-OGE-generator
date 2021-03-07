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

  random: function(min_inclusive, max_inclusive, exclude = []){
    exclude = []
    exclude.push(...exclude)
    let random;
    do {
      random = Math.floor(min_inclusive + Math.random() * (max_inclusive + 1 - min_inclusive))
    } while(exclude.includes(random))
    return random
  }
}

export default utils