import React from 'react'
import ReactDOMServer from 'react-dom/server'
import styles from '../styles/GeneratedResultsScreen.style.js'
import { BsClipboard } from "react-icons/bs"
import { Alert, Button, Card, CardBody } from 'reactstrap'
import Excercises from './Excercises.react.js'

let seed;

class GeneratedResultsScreen extends React.Component {
  constructor (props){
    super(props);

    seed = this.props.seed;
  }

  render(){
    return (
      <>
        <Header />
        <GeneratedExcercises />
      </>
    )
  }
}

class Header extends React.Component {
  constructor (props){
    super(props);
  }

  render(){
    return (
      <div styles={styles.header}>
        <label>сид рандомайзера: {seed} <Copy /></label>
      </div>
    )
  }
}

class Copy extends React.Component {
  constructor (props){
    super(props);
  }

  copySeed(){
    alert(seed)
  }

  render(){
    return (
      <Button color="light" onClick={() => this.copySeed()}>
        <BsClipboard />
      </Button>
    )
  }
}

class GeneratedExcercises extends React.Component {
  constructor (props){
    super(props);
  }

  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col">{' '}</div>
            <div className="col-10">
              <Section number={1} />
              <Section number={2} />
            </div>
          <div className="col">{' '}</div>
        </div>
      </div>
    )
  }
}

const sections_excersices = {1: {start: 1, end: 10}, 2: {start: 11, end: 15}}
class Section extends React.Component {
  constructor (props){
    super(props);
  }

  render(){
    const excercisesIndexes = sections_excersices[this.props.number]

    return (
      <>
        <SectionName {...this.props}/>
        <SectionInstructions {...this.props}/>
        <Excercises start={excercisesIndexes['start']} end={excercisesIndexes['end']} />
      </>
    )
  }
}

class SectionName extends React.Component {
  constructor (props){
    super(props);
  }

  render(){
    return (
      <div className="row justify-content-center">
        <h2>Часть {this.props.number}</h2>
      </div>
    )
  }
}

const section1_instructions = 'Ответами к заданиям 1–10 являются число, слово, последовательность букв или цифр.\
                               Ответы укажите в поле для ответов под заданием рядом с текстом задания на этой же\
                               страницы, введя ответ с клавиатуры, без пробелов, запятых и других дополнительных\
                               символов.'

const section2_instructions = 'Задания этой части (11–15) решаются вами на компьютере. Для выполнения заданий\
                               11, 12 вам нужно будет выбрать один из способов представленных ниже. Ответами\
                               к заданиям 11, 12 являются слово или число, которые следует записать в поле для\
                               ответов. Результатом выполнения заданий 13–15 является отдельный файл\
                               (для одного задания – один файл).\
                               Файл проверяется системой на правильность после сдачи.'

const sectionInstructionsText = {
  1: section1_instructions,
  2: section2_instructions
}

class SectionInstructions extends React.Component {
  constructor (props){
    super(props);
  }

  render(){
    return (
      <>
        <Alert color="primary">
          {sectionInstructionsText[this.props.number]}
        </Alert>
        {this.props.number === 2?(<ExtraFiles />):(<></>)}
      </>
    )
  }
}

class ExtraFiles extends React.Component {
  constructor(props){
    super(props)
  }

  loaded(){
    this.size = '1 МБ'
    let downloadButton = <Button color='success'>Скачать [{this.size}]</Button>
    let downloaderButton = document.querySelector('#accordion').contentDocument.querySelector('#button-downloader')
    downloaderButton.outerHTML = ReactDOMServer.renderToString(downloadButton)

    let startButton = <Button color='success'>Запустить браузер (вы не сможете вернуться)</Button>
    let buttonStarter = document.querySelector('#accordion').contentDocument.querySelector('#button-browser')
    buttonStarter.outerHTML = ReactDOMServer.renderToString(startButton)
  }

  render(){
    return (
      <>
        <Card>
          <CardBody>
            <div>
              <p>Для выполнения заданий 11, 12 выберете один из двух вариантов:</p>
              <iframe src="/accordion.html" width='100%' height='250px' id='accordion' onLoad={() => this.loaded()}/>
            </div>
          </CardBody>
        </Card>
        <p></p>
      </>
    )
  }
}

export default GeneratedResultsScreen;