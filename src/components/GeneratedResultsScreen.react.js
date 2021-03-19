import React from 'react'
import ReactDOMServer from 'react-dom/server'
import styles from '../styles/GeneratedResultsScreen.style.js'
import { BsCheck, BsClipboard } from "react-icons/bs"
import { Alert, Button, Card, CardBody, Progress } from 'reactstrap'
import Excercises from './Excercises.react.js'
import AnswerChecker from './AnswerChecker.react.js'
import '../extraFiles.js'
import utils from '../utils.js'

let seed;

class GeneratedResultsScreen extends React.Component {
  constructor (props){
    super(props);

    seed = this.props.seed;
  }

  render(){
    return (
      <>
        <Header seedRef={this.props.seedRef}/>
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
      <div style={styles.header}>
        <Seed seedRef={this.props.seedRef}/>
      </div>
    )
  }
}

class Seed extends React.Component {
  constructor (props){
    super(props);

    this.ref = React.createRef()

    this.src = <>
        <label id='seed-label'>Сид рандомайзера: {seed}</label>
        <label className="text-danger">
          {this.props.seedRef?.current?.value !== ''?
            (<span style={{marginLeft: '5px'}}>{'(установлен вручную)'}</span>)
          :''}
        </label>
      </>
  }

  componentDidMount(){
    this.installObserver()
  }

  installObserver(){
    let _globalThis = this
    const callback = function(mutationsList, observer) {
      _globalThis.observer.disconnect()
      _globalThis.ref.current.innerHTML = ReactDOMServer.renderToString(_globalThis.src)
      _globalThis.installObserver()
    };

    this.observer = new MutationObserver(callback);
    this.observer.observe(this.ref.current, { attributes: true, childList: true, subtree: true });
  }

  componentWillUnmount(){
    this.observer.disconnect();
  }

  render(){
    return (
      <div>
        <div ref={this.ref} style={{display: 'inline-block'}}>
          {this.src}
        </div>
        <div style={{display: 'inline-block'}}>
          <Copy seed={seed}/>
        </div>
      </div>
    )
  }
}

class Copy extends React.Component {
  constructor (props){
    super(props);

    this.state = {
      copied: false
    }
  }

  copySeed(e){
    this.setState({copied: true})
    utils.copyText(this.props.seed)
  }

  render(){
    return (
      <div style={styles.button}>
        <Button color="light" onClick={e => this.copySeed(e)}>
          {this.state.copied?<BsCheck />:<BsClipboard />}
        </Button>
      </div>
    )
  }
}

class GeneratedExcercises extends React.Component {
  constructor (props){
    super(props);
  }

  render(){
    return (
      <div className="container" style={{'margin-top': '1em'}}>
        <div className="row">
          <div className="col">{' '}</div>
            <div className="col-10">
              <Section number={1} />
              <Section number={2} />
              <AnswerChecker />
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

    this.state = {
      windowPhase: 'default'
    }
    window.appData.extraFilesSetState = (value) => this.setState({windowPhase: value})
  }

  loaded(){
    this.size = '1 МБ'
    let downloadButton = <Button color='success' id='button-downloader' extra-files-action-button>Скачать zip</Button>
    let downloaderButton = document.querySelector('#accordion').contentDocument.querySelector('#button-downloader')
    downloaderButton.outerHTML = ReactDOMServer.renderToString(downloadButton)
    downloaderButton = document.querySelector('#accordion').contentDocument.querySelector('#button-downloader')
    downloaderButton.setAttribute('onclick', '__medprovider__(\'download\')')

    let startButton = <Button color='success' id='button-browser' extra-files-action-button>Запустить браузер</Button>
    let buttonStarter = document.querySelector('#accordion').contentDocument.querySelector('#button-browser')
    buttonStarter.outerHTML = ReactDOMServer.renderToString(startButton)
    buttonStarter = document.querySelector('#accordion').contentDocument.querySelector('#button-browser')
    buttonStarter.setAttribute('onclick', '__medprovider__(\'start_browser\')')
  }

  render(){
    return (
      <>
        <Card>
          <CardBody>
            <div>
              {this.state.windowPhase === 'default' ?
                (
                  <>
                    <p>Для выполнения заданий 11, 12 выберете один из двух вариантов. Вы можете выбрать лишь один раз.</p>
                    <iframe src="/accordion.html" width='100%' height='270px' id='accordion' onLoad={() => this.loaded()}/>
                  </>
                )
                :
                (
                  this.state.windowPhase === 'loading' ?
                    (
                      <div>
                        <p>Архив создается и запаковывается...</p>
                        <Progress value={0} />
                      </div>
                    )
                    :
                    (
                      this.state.windowPhase === 'browser' ?
                        (
                          <p> todo: file browser </p>
                        )
                        :
                        (
                          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <label>Вы выбрали <b>Скачать архив</b>. </label>
                            <Button color='primary' onClick={() => window.ExtraFiles.download()}>Скачать снова</Button>
                          </div>
                        )
                    )
                )
              }
            </div>
          </CardBody>
        </Card>
        <p></p>
      </>
    )
  }
}

export default GeneratedResultsScreen;