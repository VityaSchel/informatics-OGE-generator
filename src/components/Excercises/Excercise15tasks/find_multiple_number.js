import dedent from 'dedent-js'
import utils from '../../../utils.js'

let find_multiple_number = {
  type: 'find_multiple_number',
  multiple: undefined,
  non_multiple: undefined,
  text: `Напишите функцию, которая в последовательности натуральных чисел определяет количество чисел,\
         кратных %multiple%, но не кратных %non_multiple%. Программа получает на вход количество чисел в последовательности,\
         а затем сами числа. В последовательности всегда имеется число, кратное %multiple% и не кратное %non_multiple%.\
         Количество чисел не превышает 1000. Введённые числа не превышают 30 000.

         Программа должна вывести одно число: количество чисел, кратных %multiple%, но не кратных %multiple%.`,
  languagesSpecificData: {
    'javascript': {
      inputFormat: '[4, 16, 28]',
      outputFormat: '2',
      inputFillFunction: () => '['+Array(5).fill('').map(() => utils.random(0,100)).join(', ')+']',
      exampleSolution: `function solution(array){
                          let multiple = %multiple%
                          let non_multiple = %non_multiple%
                          return array.filter(input => {return (input%multiple===0)&&(input%non_multiple!==0)}).length
                        }`
    },
    python: {
      inputFormat: '[4, 16, 28]',
      outputFormat: '2',
      inputFillFunction: () => '['+Array(5).fill('').map(() => utils.random(0,100)).join(', ')+']',
      exampleSolution: dedent(`
                        multiple = %multiple%
                        non_multiple = %non_multiple%

                        def multiples(input):
                          global multiple
                          global non_multiple
                          return ((input%multiple==0) and (input%non_multiple!=0))

                        def solution(array):
                          return len(list(filter(multiples, array)))`),
    }
  }
}

export default find_multiple_number