import React from 'react'

class Excercise3 extends React.Component {
  constructor (props){
    super(props);

    this.generateExcerciseData()
  }

  generateExcerciseData(){
    let conditionTypes = ['even', 'odd', 'sameDigits', 'notSameDigits']
    let condition2textTypes = {'even': 'x чётное', 'odd': 'x нечётное',
      'sameDigits': 'цифры x одинаковые', 'notSameDigits': 'цифры x неодинаковые'}

    const min = 20, max = 70
    let condition1 = Math.floor(min + Math.random() * (max + 1 - min))
    let condition2 = conditionTypes[Math.floor(Math.random()*4)]
    let condition2text = condition2textTypes[condition2]

    let _invert = Boolean(Math.floor(Math.random()*2))
    if(_invert){
      if(condition2 === 'even'){ condition2 = 'odd' }
      else if(condition2 === 'sameDigits'){ condition2 = 'notSameDigits' }
    }

    switch(condition2){
      case 'even':
        if((condition1+1) % 2 == 0){
          this.answer = (condition1+1);
        } else {
          this.answer = (condition1+2);
        }
        break;

      case 'odd':
        if((condition1+1) % 2 == 1){
          this.answer = (condition1+1);
        } else {
          this.answer = (condition1+2);
        }
        break;

      case 'sameDigits':
        let i = condition1+1;
        while(String(i)[0] !== String(i)[1]){
          i++
        }
        this.answer = i
        break;

      case 'notSameDigits':
        let _i = condition1+1;
        while(String(_i)[0] === String(_i)[1]){
          _i++
        }
        this.answer = _i
        break;
    }

    this.logicalExpression = `(x > ${condition1}) И ${_invert?'НЕ ':''}(${condition2text})`
  }

  render(){
    return (
      <div>
        <p>Напишите наименьшее число x, для которого истинно высказывание {this.answer}</p>
        <pre>{this.logicalExpression}</pre>
      </div>
    )
  }
}

export default Excercise3