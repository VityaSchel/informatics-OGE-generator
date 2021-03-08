import React from 'react'
import utils from '../../utils.js'

class Excercise1 extends React.Component {
  constructor (props){
    super(props);

    this.generateExcerciseData()
  }

  generateExcerciseData(){
    let _symbolEncodingSizeInt = Math.pow(2, Math.ceil(Math.random()*4))
    let _symbolEncodingSizeType = utils.randomItem(['битами', 'байтами'])
    this.symbolEncodingSize = `${_symbolEncodingSizeInt} ${_symbolEncodingSizeType}`
    this.symbolEncodingSizeInBits = _symbolEncodingSizeType==='битами'?_symbolEncodingSizeInt:_symbolEncodingSizeInt*8

    this.symbolsRemoved = utils.random(2,8)

    const animalsByCharCount = {
      2: ['ёж', 'уж', 'як'],
      3: ['кот', 'пёс', 'рак'],
      4: ['осёл', 'удав', 'овца'],
      5: ['песец', 'олень', 'хомяк'],
      6: ['сайгак', 'свинья', 'собака'],
      7: ['альпака', 'носорог', 'утконос'],
      8: ['крокодил', 'хамелеон', 'шимпанзе'],
      9: ['аллигатор', 'горностай', 'иглошерст']
    }
    let listOfAnimals = []
    for (let i = 0; i < 8; i++) {
      let _charCount = i+2
      let possibleWords = animalsByCharCount[_charCount]
      listOfAnimals.push(utils.randomItem(possibleWords))
    }
    listOfAnimals[0] = utils.capitalize(listOfAnimals[0])

    this.removedName = listOfAnimals.find(animal => {
      if(animal.length === this.symbolsRemoved){return animal}
    })
    this.removedNameBits = (this.symbolsRemoved+2)*this.symbolEncodingSizeInBits

    const commaAndSpaceSymbols = 2
    this.symbolsRemoved += commaAndSpaceSymbols

    this.writtenText = `${listOfAnimals.join(', ')} – животные`
  }

  render(){
    return (
      <div>
        <p>В одной из кодировок Unicode каждый символ кодируется {this.symbolEncodingSize}.
          Ученик написал текст (в нём нет лишних пробелов):</p>
        <pre>{this.writtenText}</pre>
        <p>Ученик удалил из списка название одного животного, а также лишние запятую и
          пробел – два пробела не должны идти подряд.</p>
        <p>При этом размер нового предложения в данной кодировке оказался на {this.removedNameBits+' '}
          бит меньше, чем размер исходного предложения. Напишите в ответе
          удалённое название животного.</p>
      </div>
    )
  }
}

export default Excercise1