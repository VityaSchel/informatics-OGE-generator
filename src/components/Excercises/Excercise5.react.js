import React from 'react'
import utils from '../../utils.js'

class Excercise5 extends React.Component {
  constructor (props){
    super(props);

    this.generateExcerciseData()
  }

  generateExcerciseData(){
    this.startNumber = Math.floor(Math.random() * 10)
    const min = 2, max = 5
    this.answer = utils.random(min, max)
    this.algorithm = ''

    this.endNumber = this.startNumber
    for (let i = 0; i < 5; i++) {
      let operation = Math.ceil(Math.random()*2)
      if(i === 5-1 && !this.algorithm.includes('2')){
        operation = 2;
      }
      this.algorithm += operation
      if(operation == 1){
        this.endNumber += 1
      } else {
        this.endNumber *= this.answer
      }
    }
  }

  render(){
    return (
      <div>
        <p>У исполнителя Альфа две команды, которым присвоены номера:</p>
        <pre>1. прибавь 1</pre>
        <pre>2. умножь на b</pre>
        <p>(b – неизвестное натуральное число; b ≥ 2).</p>
        <p>Первая из них увеличивает число на экране на 1,
           вторая умножает его на b ({this.answer}).
           Алгоритм для исполнителя Альфа – это последовательность номеров команд.
           Найдите значение числа b, при котором из <b>числа {this.startNumber}</b>{' '}
           по <b>алгоритму {this.algorithm}</b> будет получено <b>число {this.endNumber}</b>.</p>
      </div>
    )
  }
}

export default Excercise5