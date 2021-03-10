import React, { useState } from 'react'
import utils from '../../utils.js'
import { Button, Card, CardBody, InputGroup, InputGroupText, Input } from 'reactstrap'
import { saveAs } from 'file-saver';
import XLSX from 'xlsx'

const subjects = ['Физкультура','Математика','Русский язык','Биология','Обществознание','Информатика']
class Excercise14 extends React.Component {
  constructor (props){
    super(props);
    this.generateExcerciseData()
  }

  generateExcerciseData(){
    const _randomIntegerValue = '/random/'
    const possibleColumns = [
      {
        names: ['Округ', 'Фамилия', 'Предмет', 'Баллы'],
        descriptions: ['код округа, в котором учится ученик', 'фамилия', 'выбранный учеником предмет', 'тестовый балл'],
        possibleColumnsContent: [
          ['С','Ю','З','В','СЗ','СВ','ЮЗ','ЮВ'],
          ['Смирнов','Иванов','Кузнецов','Соколов','Попов','Лебедев','Козлов','Новиков','Морозов','Петров','Волков',
           'Соловьёв','Васильев','Зайцев','Павлов','Семёнов','Голубев','Виноградов','Богданов','Воробьёв','Фёдоров',
           'Михайлов','Беляев','Тарасов','Белов','Комаров','Орлов','Киселёв','Макаров','Андреев','Ковалёв','Ильин'],
          subjects,
          _randomIntegerValue
        ]
      }
    ]
    let columns = utils.randomItem(possibleColumns)
    this.columns = columns
    let data = Array(utils.random(1,10)*100).fill().map(() => {
      let row = []
      for (let col of columns.possibleColumnsContent){
        if(col === _randomIntegerValue){
          row.push(utils.random(1, 1000))
        } else {
          row.push(utils.randomItem(col))
        }
      }
      return row
    })
    data.unshift(columns.names)
    this.data = data

    this.generateTable()
    this.generateTasks()
  }

  generateTable(){
    let columns = this.columns
    let content = []
    let data = this.data
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let i in columns.descriptions){
      let description = columns.descriptions[i]
      let letter = letters.charAt(i)

      content.push(<div key={i}>В столбце {letter} {i==0?'записан':'—'} {description}{i==columns.length-1?'.':';'}</div>)
    }
    this.contentColumns = content
    this.tablePreview = <table className="table table-bordered">
      <thead>
        <tr className='table-light'>
          <th></th>
          {letters.split('').slice(0,columns.names.length).map((el, i) => {return (<th key={i} scope='col'>{el}</th>)})}
        </tr>
      </thead>
      <tbody>
        {
          Array(5).fill().map((el, i) => {
            return (
              <tr>
                <th className='table-light'>{i+1}</th>
                {Array(columns.names.length).fill().map((el, j) => {
                  return (i==0?<th>{data[i][j]}</th>:<td>{data[i][j]}</td>)
                })}
              </tr>
            )
          })
        }
        <tr>
          <td colspan={data[0].length+1}>
            <p className='text-secondary text-center' style={{margin: 0}}>Еще {data.length-1-5} строк...</p>
          </td>
        </tr>
      </tbody>
    </table>
  }

  generateTasks(){
    let data = this.data
    this.condition = [
      {
        subjectName: utils.randomItem(subjects),
        limit: utils.random(1, 1000),
        limitComparison: utils.randomItem('>', '<')
      },
      {
        subjectName: utils.randomItem(subjects)
      }
    ]

    const scoreIndex = 3
    this.condition[0].answer = data.filter(row => {
      if(row[scoreIndex] > this.condition[0].limit) return (this.condition[0].limitComparison === '>')
      if(row[scoreIndex] < this.condition[0].limit) return (this.condition[0].limitComparison === '<')
    }).length

    const subjectIndex = 2
    let students = data.map(row => {
      if(row[subjectIndex] == this.condition[1].subjectName){
        return row[scoreIndex]
      }
    }).filter(row => row !== undefined)
    let studentsSum = students.reduce((last, cur) => last+cur, 0)
    this.condition[1].answer = Math.floor(studentsSum / students.length)

    this.tasks = <ol>
      <li>
        <p>
          Сколько учеников, которые проходили тестирование по предмету {this.condition[0].subjectName},
          набрали {(this.limitComparison==='<'?'менее':'более')} {this.condition[0].limit} баллов?
        </p>
        <Answer number={'14.1'} />
      </li>
      <li style={{marginTop: '20px'}}>
        <p>
          Каков средний тестовый балл учеников, которые проходили тестирование по
          предмету {this.condition[1].subjectName}?
          Ответ округлите до целого числа в меньшую сторону.
        </p>
        <Answer number={'14.2'} />
      </li>
    </ol>
  }

  generateSheet(data){
    let worksheet = XLSX.utils.aoa_to_sheet(this.data)
    let workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Exercise 14");

    let wopts = { bookType: 'xlsx', 
                  bookSST: false, 
                  type: 'array' }
    this.wbout = XLSX.write(workbook, wopts)

    this.download()
  }

  startDownloading(){
    if(this.wbout){
      this.download()
    } else {
      this.generateSheet()
    }
  }

  download(){
    saveAs(new Blob([this.wbout], {type: "application/octet-stream"}), "Exercise14.xlsx")
  }

  render(){
    return (
      <div>
        <Card>
          <CardBody>
            <div style={{display: 'inline-block', verticalAlign: 'middle'}}>Скачайте таблицу для Microsoft Excel для работы с заданием 14:</div>
            {'  '}
            <Button color='primary' onClick={() => this.startDownloading()}>Скачать XLSX</Button>
          </CardBody>
        </Card>
        <p></p>
        <p>
          В электронную таблицу занесли данные о тестировании учеников
          по выбранным ими предметам.
        </p>
        <div>
          {this.tablePreview}
        </div>
        <p>
          {this.contentColumns}
        </p>
        <p>
          Всего в электронную таблицу были занесены данные по {this.data.length-1} учеников.
        </p>
        <p>
          Откройте файл с данной электронной таблицей (скачать его вы можете выше).
          На основании данных, содержащихся в этой таблице, выполните задания.
        </p>
        <div>
          {this.tasks}
        </div>
      </div>
    )
  }
}

class Answer extends React.Component {
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

export default Excercise14