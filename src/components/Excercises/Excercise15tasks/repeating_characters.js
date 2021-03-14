import dedent from 'dedent-js'

let repeating_characters = {
  type: 'repeating_characters',
  text: `Напишите функцию, которая возвращает количество повторяюшихся буквенных символов (не чувствительных к регистру)\
         и цифр.`,
   languagesSpecificData: {
     'javascript': {
       inputFormat: '\'testcase\'',
       outputFormat: '3',
       exampleSolution: `function solution(text){
                           return text.toLowerCase().split('').filter(function(val, i, arr){
                             return arr.indexOf(val) !== i && arr.lastIndexOf(val) === i;
                           }).length
                         }`,
       inputFillFunction: () => '\'hello world\''
     },
     'python': {
       inputFormat: '\'testcase\'',
       outputFormat: '3',
       inputFillFunction: () => '\'hello world\'',
       exampleSolution: dedent(`
                         i = -1
                         array = []

                         def listRightIndex(alist, value):
                           return len(alist) - alist[-1::-1].index(value) -1

                         def index(array, x, reverse = False):
                           if x in array:
                             if reverse:
                               return listRightIndex(array, x)
                             else:
                               return array.index(x)
                           else:
                             return -1

                         def repeats(x):
                           global i
                           global array
                           i += 1
                           return ((index(array, x) != i) and (index(array, x, True) == i))

                         def solution(text):
                           global array
                           array = list(text.lower())
                           return len(list(filter(repeats, array)))
                           `)
     }
   }
}

export default repeating_characters