import React from 'react'
import utils from '../../utils.js'

class Excercise1 extends React.Component {
  constructor (props){
    super(props);

    this.generateExcerciseData()
  }

  generateExcerciseData(){
    this.list = utils.randomItem([
      {
        common: 'животные',
        subject: 'название животного',
        items: {
          2: ['ёж', 'уж', 'як'],
          3: ['кот', 'пёс', 'рак'],
          4: ['осёл', 'удав', 'овца'],
          5: ['песец', 'олень', 'хомяк'],
          6: ['сайгак', 'свинья', 'собака'],
          7: ['альпака', 'носорог', 'утконос'],
          8: ['крокодил', 'хамелеон', 'шимпанзе'],
          9: ['аллигатор', 'горностай', 'иглошерст']
        }
      },
      {
        common: 'города',
        subject: 'название города',
        items: {
          3: ['Уфа', 'Бор', 'Шуя'],
          4: ['Ухта', 'Чита', 'Сочи'],
          5: ['Томск', 'Ревда', 'Псков'],
          6: ['Самара', 'Москва', 'Рязань'],
          7: ['Сызрань', 'Балашов', 'Саранск'],
          8: ['Тольятти', 'Владимир', 'Улан-Удэ'],
          9: ['Астрахань', 'Череповец', 'Ярославль'],
          10: ['Красноярск', 'Ставрополь', 'Кисловодск']
        }
      },
      {
        common: 'игры',
        subject: 'название игры',
        items: {
          3: ['NBA', 'WWE'],
          4: ['DayZ', 'Doom', 'FIFA'],
          5: ['Knack', 'Metro', 'Sonic'],
          6: ['FarCry', 'MadMax', 'Mortal'],
          7: ['Outlast', 'Horizon', 'Hotline'],
          8: ['Broforce', 'Terraria', 'GodOfWar'],
          9: ['Minecraft', 'Days_Gone', 'Destiny_2'],
          10: ['Dead_Space', 'Dishonored', 'BioShock_2']
        }
      }
    ])

    let _symbolEncodingSizeInt = Math.pow(2, Math.ceil(Math.random()*4))
    let _symbolEncodingSizeType = utils.randomItem(['битами', 'байтами'])
    this.symbolEncodingSize = `${_symbolEncodingSizeInt} ${_symbolEncodingSizeType}`
    this.symbolEncodingSizeInBits = _symbolEncodingSizeType==='битами'?_symbolEncodingSizeInt:_symbolEncodingSizeInt*8
    let min = Object.keys(this.list.items)[0], max = Object.keys(this.list.items).last()
    this.symbolsRemoved = utils.random(Number(min), Number(max))

    let itemsList = []
    for (let possibleWords of Object.values(this.list.items)) {
      itemsList.push(utils.randomItem(possibleWords))
    }
    itemsList[0] = utils.capitalize(itemsList[0])

    this.answer = itemsList.filter(item => item.length === this.symbolsRemoved)[0]
    this.removedNameBits = (this.symbolsRemoved+2)*this.symbolEncodingSizeInBits
    const commaAndSpaceSymbols = 2
    this.symbolsRemoved += commaAndSpaceSymbols
    this.writtenText = `${itemsList.join(', ')} – ${this.list.common}`

    this.answer = utils.encodeAnswer(1, this.answer)
  }

  render(){
    return (
      <div>
        <p>В одной из кодировок Unicode каждый символ кодируется {this.symbolEncodingSize}.
          Ученик написал текст (в нём нет лишних пробелов):</p>
        <pre>{this.writtenText}</pre>
        <p>Ученик удалил из списка {this.list.subject}, а также лишние запятую и
          пробел – два пробела не должны идти подряд.</p>
        <p>При этом размер нового предложения в данной кодировке оказался на {this.removedNameBits+' '}
          бит меньше, чем размер исходного предложения. Напишите в ответе
          удалённое {this.list.subject}.</p>
      </div>
    )
  }
}

export default Excercise1