import React from 'react'
import randomWords from 'random-words'
import utils from '../../utils.js'

class Excercise6 extends React.Component {
  constructor (props){
    super(props);

    this.generateExcerciseData()
  }

  generateExcerciseData(){
    const extensions = ['txt','doc','pdf','pptx','key']
    const domains = ['gov','obr','state','talk','reg','tan','term']
    const domainZones = ['ru','com','org','net','app']
    const protocol = ['http','https','ftp','ssh']

    this.filename = randomWords({ min: 1, max: 3, join: '_' })+'.'+utils.randomItem(extensions)
    this.servername = utils.randomItem(domains)+'.'+utils.randomItem(domainZones)
    this.protocol = utils.randomItem(protocol)

    this.segments = ['/', '://', ...this.filename.split('.'), ...this.servername.split('.'), this.protocol]
    this.segments[2] += '.'
    this.segments[4] += '.'
    this.segments = utils.shuffle(this.segments)

    this.answer = ''
    this.answer += this.segments.indexOf(this.protocol)+1
    this.answer += this.segments.indexOf('://')+1
    this.answer += this.segments.indexOf(this.servername.split('.')[0]+'.')+1
    this.answer += this.segments.indexOf(this.servername.split('.')[1])+1
    this.answer += this.segments.indexOf('/')+1
    this.answer += this.segments.indexOf(this.filename.split('.')[0]+'.')+1
    this.answer += this.segments.indexOf(this.filename.split('.')[1])+1
    
    this.answer = utils.encodeAnswer(this.answer)
  }

  render(){
    return (
      <div>
        <p>Доступ к файлу <b>{this.filename}</b>, находящемуся на сервере <b>{this.servername}</b>,
           осуществляется по протоколу <b>{this.protocol}</b>. Фрагменты адреса файла закодированы цифрами от 1
           до {this.segments.length}. Запишите в ответе последовательность этих цифр, кодирующую адрес
           указанного файла в сети Интернет.</p>
         <List provider={this.segments} />
      </div>
    )
  }
}

class List extends React.Component {
  constructor (props){
    super(props);
  }

  render(){
    const listItems = this.props.provider.map((item, i) => <li key={i}>{item}</li>)
    return (
      <ol>
        {listItems}
      </ol>
    )
  }
}

export default Excercise6