import dedent from 'dedent-js'
import utils from '../../../utils.js'

let unique_number = {
  type: 'unique_number',
  text: `Напишите функуцию, которая принимает массив из одинаковых цифр, кроме одной и выводит эту цифру`,
  languagesSpecificData: {
    'javascript': {
      inputFormat: '[1, 1, 1, 2, 1, 1]',
      outputFormat: '2',
      exampleSolution: `function solution(arr){
                          return arr.find(n => arr.indexOf(n) === arr.lastIndexOf(n));
                        }`,
      inputFillFunction: () => {
        let randomInt = utils.random(1, 99)
        let array = Array(utils.random(5, 10)).fill(randomInt)
        array.push(utils.random(1, 99), [randomInt])
        return '['+utils.shuffle(array).join(', ')+']'
      }
    },
    'python': {
      inputFormat: '[1, 1, 1, 2, 1, 1]',
      outputFormat: '2',
      exampleSolution: dedent(`
                        def listRightIndex(alist, value):
                          return len(alist) - alist[-1::-1].index(value) -1

                        def solution(arr):
                          for i in arr:
                            if arr.index(i) == listRightIndex(arr, i):
                              return i`),
      inputFillFunction: () => {
        let randomInt = utils.random(1, 99)
        let array = Array(utils.random(5, 10)).fill(randomInt)
        array.push(utils.random(1, 99, [randomInt]))
        return '['+utils.shuffle(array).join(', ')+']'
      }
    }
  }
}

export default unique_number