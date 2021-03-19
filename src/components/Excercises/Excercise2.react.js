import React from 'react'
import { Table } from 'reactstrap'
import utils from '../../utils.js'

class Excercise2 extends React.Component {
  constructor (props){
    super(props);

    this.generateExcerciseData()
  }

  generateExcerciseData(){
    this.decodedMessage = ''
    this.encodedMessage = ''

    this.letters = {'А': '01', 'Б': '100', 'К': '101', 'Л': '111', 'О': '00', 'С': '110'}
    for (let i = 0; i < 6; i++) {
      let _letter = Object.keys(this.letters)[Math.floor(Math.random()*6)]
      this.decodedMessage += _letter
      this.encodedMessage += this.letters[_letter]
    }

    let lookForReversed = true
    this.alternativeSolution = this.findAllSolutions(this.encodedMessage, lookForReversed)
    this.answer = [utils.encodeAnswer(2, this.decodedMessage)]
    if(this.alternativeSolution)
      this.answer.push(utils.encodeAnswer(2, this.alternativeSolution))
  }

  findAllSolutions(encodedMessage, lookForReversed = false){
    let letters = {'А': '01', 'Б': '100', 'К': '101', 'Л': '111', 'О': '00', 'С': '110'}
    encodedMessage = encodedMessage.split('')

    if(lookForReversed){
      encodedMessage = encodedMessage.reverse()
    }

    let buffer = ''
    let _alternativeSolution = ''
    for (let digit of encodedMessage){
      buffer += digit
      let _index = Object.values(letters).indexOf(buffer)
      if(_index > -1){
        buffer = ''
        _alternativeSolution += Object.keys(letters)[_index]
      }
    }
    if(buffer.length <= 3){
      let _index = Object.values(letters).indexOf(buffer)
      if(_index > -1){
        buffer = ''
        _alternativeSolution += Object.keys(letters)[_index]
        return _alternativeSolution
      } else if (buffer === ''){
        return _alternativeSolution
      }
    }
    return undefined
  }

  render(){
    return (
      <div>
        <p>От разведчика было получено следующее сообщение</p>
        <pre>{this.encodedMessage}</pre>
        <p>В этом сообщении зашифрован пароль – последовательность русских букв.
          В пароле использовались только буквы А, Б, К, Л, О, С; каждая буква
          кодировалась двоичным словом по следующей таблице.</p>
        <Table className="table table-bordered col-5 text-center">
          <thead>
            <tr>
              <th>А</th>
              <th>Б</th>
              <th>К</th>
              <th>Л</th>
              <th>О</th>
              <th>С</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01</td>
              <td>100</td>
              <td>101</td>
              <td>111</td>
              <td>00</td>
              <td>110</td>
            </tr>
          </tbody>
        </Table>
        <p>Расшифруйте сообщение. Запишите в ответе пароль.</p>
      </div>
    )
  }
}

export default Excercise2