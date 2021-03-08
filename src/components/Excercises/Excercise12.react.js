import React, { useEffect, useMemo, useState } from 'react'
import utils from '../../utils.js'

function Excercise12(props) {
  let [extraFiles, setExtraFiles] = React.useState(false)
  window.genCallback = setExtraFiles

  return (
    <>
      { !extraFiles ?
        (
          <p className="text-warning">Выберете выше вариант решения задач</p>
        )
        :
        (
          <Text />
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
    this.extension = utils.randomItem(window.appData.extraFileExtensions)
    this.topFolder = utils.randomItem(Object.keys(window.appData.extraFiles))
    let subFolders = window.appData.extraFiles[this.topFolder]
    this.answer = 0
    for (let folder of Object.keys(subFolders)){
      let filenames = Object.keys(subFolders[folder])
      let regex = new RegExp('^.*\\'+this.extension+'$')
      this.answer += filenames.filter(filename => regex.test(filename)).length
    }
  }

  render(){
    return (
      <p>
        Сколько файлов с расширением {this.extension} содержится в подкаталогах каталога
        {' '}<b>{this.topFolder}</b>? В ответе укажите только число.
      </p>
    )
  }
}

export default Excercise12