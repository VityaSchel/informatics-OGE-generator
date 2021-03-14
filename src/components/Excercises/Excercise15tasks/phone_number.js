import dedent from 'dedent-js'
import utils from '../../../utils.js'

let phone_number = {
  type: 'phone_number',
  text: `Напишите функуцию, которая принимает массив из 10 цифр (от 0 до 9) и возвращает строку \
         из этих цифр в формате телефонного номера.`,
  languagesSpecificData: {
    'javascript': {
      inputFormat: '[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]',
      outputFormat: '\'+7 (123) 456-78-90\'',
      inputFillFunction: () => '['+Array(10).fill().map(digit => utils.random(0, 9)).join(', ')+']',
      exampleSolution: `function solution(numbers){
                          let format = "+7 (xxx) xxx-xx-xx";
                          for(let i = 0; i < numbers.length; i++) {
                            format = format.replace('x', numbers[i]);
                          }
                          return format;
                        }`
    },
    'python': {
      inputFormat: '[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]',
      outputFormat: '\'+7 (123) 456-78-90\'',
      inputFillFunction: () => '['+Array(10).fill().map(digit => utils.random(0, 9)).join(', ')+']',
      exampleSolution: dedent(`
                        def solution(numbers):
                          format = "+7 (xxx) xxx-xx-xx"
                          for i in range(0, len(numbers)):
                            format = format.replace('x', str(numbers[i]))
                          return format`)
    }
  }
}

export default phone_number