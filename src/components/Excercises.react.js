import React from 'react'
import { InputGroup, InputGroupText, Input } from 'reactstrap'
import styles from '../styles/Excercises.style.js'
import Excercise1 from './Excercises/Excercise1.react.js'
import Excercise2 from './Excercises/Excercise2.react.js'
import Excercise3 from './Excercises/Excercise3.react.js'
import Excercise5 from './Excercises/Excercise5.react.js'
import Excercise6 from './Excercises/Excercise6.react.js'

class Excercises extends React.Component {
  constructor (props){
    super(props);
  }

  render(){
    let excercisesComponents = []
    for (let i = this.props.start; i <= this.props.end; i++) {
      excercisesComponents.push(<Excercise number={i} key={i}/>)
    }

    return (
      <div>
        {excercisesComponents}
      </div>
    )
  }
}

class Excercise extends React.Component {
  constructor (props){
    super(props);
  }

  render(){
    return (
      <div style={styles.excerciseOuter}>
        <div style={styles.excerciseIndex}>{this.props.number}</div>
        <div style={styles.excerciseInner}>
          <ExcerciseText number={this.props.number} />
          <ExcerciseAnswer number={this.props.number} />
        </div>
      </div>
    )
  }
}

class ExcerciseText extends React.Component {
  constructor (props){
    super(props);
  }

  render(){
    switch(this.props.number){
      case 1:
        return <Excercise1 />

      case 2:
        return <Excercise2 />

      case 3:
        return <Excercise3 />

      case 5:
        return <Excercise5 />

      case 6:
        return <Excercise6 />

      default:
        return <p>?</p>
    }
  }
}

window.appData = {}
window.appData.answers = {}
class ExcerciseAnswer extends React.Component {
  constructor (props){
    super(props);
  }

  handleInput(e){
    window.appData.answers[this.props.number] = e.currentTarget.value
  }

  render(){
    return (
      <InputGroup>
        <InputGroupText>Ответ</InputGroupText>
        <Input onInput={e => this.handleInput(e)}/>
      </InputGroup>
    )
  }
}

export default Excercises;