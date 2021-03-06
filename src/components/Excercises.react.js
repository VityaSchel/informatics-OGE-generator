import React from 'react'
import { Button, InputGroup, InputGroupText, Input } from 'reactstrap'
import styles from '../styles/Excercises.style.js'
import '../styles/Excercises.css'
import Excercise1 from './Excercises/Excercise1.react.js'
import Excercise2 from './Excercises/Excercise2.react.js'
import Excercise3 from './Excercises/Excercise3.react.js'
import Excercise4 from './Excercises/Excercise4.react.js'
import Excercise5 from './Excercises/Excercise5.react.js'
import Excercise6 from './Excercises/Excercise6.react.js'
import Excercise7 from './Excercises/Excercise7.react.js'
import Excercise8 from './Excercises/Excercise8.react.js'
import Excercise9 from './Excercises/Excercise9.react.js'
import Excercise10 from './Excercises/Excercise10.react.js'
import Excercise11 from './Excercises/Excercise11.react.js'
import Excercise12 from './Excercises/Excercise12.react.js'
import Excercise13 from './Excercises/Excercise13.react.js'
import Excercise14 from './Excercises/Excercise14.react.js'
import Excercise15 from './Excercises/Excercise15.react.js'

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

const hideAnswerInput = [13, 14, 15]
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
          {!hideAnswerInput.includes(this.props.number)?(<ExcerciseAnswer number={this.props.number} />):(<></>)}
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
    let e = getExcercise(this.props.number)
    window.appData.components[this.props.number] = e
    return e
  }
}

window.appData = {}
window.appData.components = Array(16).fill().map(r => React.createRef())
function getExcercise(number){
  switch(number){
    case 1:
      return <Excercise1 ref={window.appData.components[1]}/>

    case 2:
      return <Excercise2 ref={window.appData.components[2]}/>

    case 3:
      return <Excercise3 ref={window.appData.components[3]}/>

    case 4:
      return <Excercise4 ref={window.appData.components[4]}/>

    case 5:
      return <Excercise5 ref={window.appData.components[5]}/>

    case 6:
      return <Excercise6 ref={window.appData.components[6]}/>

    case 7:
      return <Excercise7 ref={window.appData.components[7]}/>

    case 8:
      return <Excercise8 ref={window.appData.components[8]}/>

    case 9:
      return <Excercise9 ref={window.appData.components[9]}/>

    case 10:
      return <Excercise10 ref={window.appData.components[10]}/>

    case 11:
      return <Excercise11 ref={window.appData.components[11]}/>

    case 12:
      return <Excercise12 ref={window.appData.components[12]}/>

    case 13:
      return <Excercise13 ref={window.appData.components[13]}/>

    case 14:
      return <Excercise14 ref={window.appData.components[14]}/>

    case 15:
      return <Excercise15 ref={window.appData.components[15]}/>

    default:
      return <p>?</p>
  }
}

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
        <InputGroupText>??????????</InputGroupText>
        <Input onInput={e => this.handleInput(e)}/>
      </InputGroup>
    )
  }
}

export default Excercises;