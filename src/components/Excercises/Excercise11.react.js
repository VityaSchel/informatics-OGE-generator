import React, { useEffect, useMemo, useState } from 'react'
import utils from '../../utils.js'

class Excercise11 extends React.Component {
  constructor (props){
    super(props);

    this.answer = undefined
  }

  render(){
    return (
      <Excercise11Inner {...this.props} setanswer={_answer => this.answer = utils.encodeAnswer(_answer)}/>
    )
  }
}

function Excercise11Inner(props) {
  let [extraFiles, setExtraFiles] = React.useState(false)
  window.genCallback2 = setExtraFiles

  return (
    <>
      { !extraFiles ?
        (
          <p className="text-warning">Выберете выше вариант решения задач</p>
        )
        :
        (
          <Text setanswer={answer => props.setanswer(answer)} />
        )
      }
    </>
  )
}

class Text extends React.Component {
  constructor (props){
    super(props);

    this.generateExcerciseData()
  }

  generateExcerciseData(){
    this.topFolder = utils.randomItem(Object.keys(window.appData.extraFiles))
    let subFolders = window.appData.extraFiles[this.topFolder]
    let subFolderFiles = utils.randomItem(Object.values(subFolders))
    let [answer, fileContent] = utils.randomItem(Object.entries(subFolderFiles))
    this.props.setAnswer(answer)
    this.fileContent = fileContent
    this.quote = utils.randomItem(fileContent.split('. '))
  }

  render(){
    return (
      <p>
        В одном из файлов, текст которого приведён в подкаталоге каталога <b>{this.topFolder}</b>,
        находятся такие слова: «{this.quote}».
        С помощью поисковых средств операционной системы и текстового редактора или браузера
        выясните имя файла без пути к нему, только имя с расширением. Например, <i>example.txt</i>
      </p>
    )
  }
}

export default Excercise11