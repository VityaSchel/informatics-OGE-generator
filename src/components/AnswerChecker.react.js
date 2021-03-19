import React, { useState } from 'react'
import { BsHash, BsCheck, BsX } from "react-icons/bs"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Fade } from 'reactstrap'
import utils from '../utils.js'

let _setModal;
let _validate;
const ModalValidate = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  _setModal = setModal
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Сдать вариант?</ModalHeader>
        <ModalBody>
          Вы уверены, что хотите сдать вариант? Вы не сможете изменить свои ответы.
        </ModalBody>
        <ModalFooter>
          <Button color="light" onClick={toggle}>Отмена</Button>{' '}
          <Button color="primary" onClick={_validate}>Сдать вариант</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

class AnswerChecker extends React.Component {
  constructor (props){
    super(props);

    this.state = {
      validationStarted: false,
      validationEnded: false,
      validationData: undefined
    }
    this.revalidationProtection = false

    _validate = () => {
      this.setState({validationStarted: true})
      this.checkAnswers()
    }
  }

  validate(){
    _setModal(true)
  }

  checkAnswers(){
    function check13excercise(){
      let score = window.appData.components[13].ref.current.testUserInput()
      return {
        index: 13,
        isCorrect: score > 0,
        score: score
      }
    }

    function check14excercise(){
      let correctAnswer14_1 = window.appData.components[14].ref.current.answer14_1
      let userAnswer14_1 = window.appData.answers[14.1] ?? ''
      userAnswer14_1 = utils.encodeAnswer(14.1, userAnswer14_1, true)

      let correctAnswer14_2 = window.appData.components[14].ref.current.answer14_2
      let userAnswer14_2 = window.appData.answers[14.2] ?? ''
      userAnswer14_2 = utils.encodeAnswer(14.2, userAnswer14_2, true)

      let isCorrect14_1 = correctAnswer14_1===userAnswer14_1
      let isCorrect14_2 = correctAnswer14_2===userAnswer14_2
      return {
        index: 14,
        isCorrect14_1: isCorrect14_1,
        isCorrect14_2: isCorrect14_2,
        isCorrect: isCorrect14_1+isCorrect14_2 > 0
      }
    }

    function check15excercise(){
      let tests = window.appData.components[15].ref.current.testUserSolution()
      let testCorrect = Boolean(tests)
      return {index: 15, isCorrect: testCorrect, allTestsPassing: tests===true}
    }

    if(this.revalidationProtection){ return; }
    this.revalidationProtection = true;
    _setModal(false)

    let data = [];
    for (let i = 1; i <= 12; i++){
      let correctAnswer = window.appData.components[i].ref.current.answer
      let userAnswer = window.appData.answers[i] ?? ''
      userAnswer = utils.encodeAnswer(i, userAnswer, true)
      let isCorrect = false
      if(Array.isArray(correctAnswer)){
        console.log('Array', correctAnswer, userAnswer)
        isCorrect = correctAnswer.some(ans => ans===userAnswer)
      } else {
        isCorrect = correctAnswer===userAnswer
      }
      data.push({index: i, isCorrect: isCorrect})
    }

    data.push(check13excercise())
    data.push(check14excercise())
    data.push(check15excercise())

    this.setState({validationEnded: true, validationData: data})
  }

  render(){
    const outerStyles = {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '50px'
    }

    return (
      <div style={outerStyles}>
        <Button color='primary' onClick={() => this.validate()} disabled={this.state.validationStarted}>Сдать вариант</Button>
        <ModalValidate />
        {this.state.validationEnded?
          <ValidationResults provider={this.state.validationData}/>
        :<></>}
      </div>
    )
  }
}

class ValidationResults extends React.Component {
  constructor (props){
    super(props);
  }

  render(){
    const indicator = {
      'padding': '3px',
      'border-radius': '999px',
      'display': 'flex',
      'justify-content': 'center',
      'align-items': 'center',
      'color': '#fff',
      'width': '22px',
      'margin-right': '5px'
    }
    const correct = {
      ...indicator,
      'background-color': '#03b903'
    }
    const incorrect = {
      ...indicator,
      'background-color': '#b90c03'
    }
    const semiCorrectIndicator = {
      ...indicator,
      'background-color': '#b99b03'
    }

    const oneScoredExcercises = 12

    let excercises = []
    let score = 0
    for (let excercise of this.props.provider) {
      let excerciseIndex = excercise.index
      let isCorrect = excercise.isCorrect
      let semiCorrect = undefined
      if(isCorrect){
        if(excerciseIndex <= oneScoredExcercises){
          score += 1
        } else if (excerciseIndex == 13) {
          score += excercise.score
          if(excercise.score == 1){
            semiCorrect = true
          }
        } else if (excerciseIndex == 14) {
          score += 1
          if(excercise.isCorrect14_1){
            score += 1
          }
          if(excercise.isCorrect14_2){
            score += 1
          }
          if(excercise.isCorrect14_1+excercise.isCorrect14_2 === 1){
            semiCorrect = true
          }
        } else if (excerciseIndex == 15) {
          score += 1
          if(excercise.allTestsPassing){
            score += 1
          } else {
            semiCorrect = true
          }
        }
      }

      let validationStatus = (isCorrect ?
                                (semiCorrect?
                                  (<div key={excerciseIndex} style={semiCorrectIndicator}><BsHash /></div>)
                                :
                                  (<div key={excerciseIndex} style={correct}><BsCheck /></div>)
                                )
                             :
                             (<div key={excerciseIndex} style={incorrect}><BsX /></div>))
      excercises.push(
        <tr>
          <td>{validationStatus}</td>
          <td style={{padding: '0 20px'}}>{excerciseIndex}</td>
          <td>Ваш ответ {isCorrect?(semiCorrect?'частично ':''):'не'}правильный</td>
        </tr>
      )
    }
    const maxScore = 19
    let scoreLabel = `${score} балл${utils.ending(score)} из ${maxScore}`
    let grade = 0
    let percentage = score/maxScore*100

    // В соответствии с https://ru.wikipedia.org/wiki/Система_оценивания_знаний#Россия
    if (percentage >= 85) {
      grade = 5
    } else if (percentage >= 65) {
      grade = 4
    } else if (percentage >= 45) {
      grade = 3
    } else {
      grade = 2
    }

    return (
      <>
        <Fade in={true} tag="div" style={{'margin-top': '25px'}}>
          <div>
            <table borderless>
              <tbody>
                {excercises}
                <tr>
                  <td colSpan={3} style={{
                      'padding-top': '20px',
                      'color': '#0d6efd',
                      'text-align': 'center'
                    }}>
                    {scoreLabel} (Оценка {grade})
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Fade>
      </>
    )
  }
}

export default AnswerChecker