import dedent from 'dedent-js'
import utils from '../../../utils.js'
import ryba from 'ryba-js'

let reversed_words = {
  type: 'reversed_words',
  limit: undefined,
  text: `Напишите функцию, которая получает одно или больше слов, и возвращает строку, в которой все слова, в
         которых больше %limit% букв перевернуты.`,
  languagesSpecificData: {
    'javascript': {
      inputFormat: '[\'Привет\', \'мир\']',
      outputFormat: '\'тевирП рим\'',
      exampleSolution: `function solution(string){
                          let limit = %limit%
                          return string.split(' ').map(word => (word.length<=%limit% ? word : word.split('').reverse().join(''))).join(' ')
                        }
                        `,
      inputFillFunction: () => '\''+Array(5).fill('').map(() => utils.wordsLimit(utils.toPureLabel(ryba(1)), 1)).join(' ')+'\''
    },
    'python': {
      inputFormat: '[\'Привет\', \'мир\']',
      outputFormat: '\'тевирП рим\'',
      exampleSolution: dedent(`
                        limit = %limit%

                        def reverse(x):
                          global limit
                          if len(x) > limit:
                            x = x[::-1]
                          return x

                        def solution(string):
                          return ' '.join(list(map(reverse, string.split(' '))))`),
      inputFillFunction: () => '\''+Array(5).fill('').map(() => utils.wordsLimit(utils.toPureLabel(ryba(1)), 1)).join(' ')+'\''
    }
  }
}

export default reversed_words