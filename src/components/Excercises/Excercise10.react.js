import React from 'react'
import randomWords from 'random-words'
import utils from '../../utils.js'

class Excercise10 extends React.Component {
  constructor (props){
    super(props);

    this.generateExcerciseData()
  }

  generateExcerciseData(){
    let decodedIntegers = Array(3).fill(Math.floor(Math.random()*1000))
    let notations
    this.integers = []
    for (let integer of decodedIntegers){
      let integerNotation = utils.random(2, 16)
      this.integers.push({
                          integer: integer.toString(integerNotation),
                          notation: integerNotation
                        })
    }
    this.integers = utils.shuffle(this.integers)

    this.answer = Math.max(...decodedIntegers)
    this.answer = utils.encodeAnswer(this.answer)
  }

  render(){
    return (
      <div>
        <p>
          Среди приведённых ниже трёх чисел, записанных в различных системах счисления,
          найдите максимальное и запишите его в ответе в десятичной системе счисления.
          В ответе запишите только число, основание системы счисления указывать не нужно.</p>
        <pre>
          <IntegerNotation provider={this.integers} />
        </pre>
      </div>
    )
  }
}

class IntegerNotation extends React.Component {
  constructor (props){
    super(props);
  }

  render(){
    const listItems = this.props.provider.map((item, i, array) => { return (
      <span key={i}>
        <label>{item.integer}
                        <sub>{item.notation}</sub>
                                                  {i !== array.length-1 ? ', ' : ''}
        </label>
      </span>
    )})
    return (
      <div>{listItems}</div>
    )
  }
}

export default Excercise10