import React, { useState } from 'react'
import utils from '../../utils.js'
import ryba from 'ryba-js'
import { Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody } from 'reactstrap'
import {Controlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/material-ocean.css'

let tasksTemplates = [
  {
    type: 'find_multiple_number',
    multiple: undefined,
    non_multiple: undefined,
    text: `Напишите функцию, которая в последовательности натуральных чисел определяет количество чисел,\
           кратных %multiple%, но не кратных %non_multiple%. Программа получает на вход количество чисел в последовательности,\
           а затем сами числа. В последовательности всегда имеется число, кратное %multiple% и не кратное %non_multiple%.\
           Количество чисел не превышает 1000. Введённые числа не превышают 30 000.

           Программа должна вывести одно число: количество чисел, кратных %multiple%, но не кратных %multiple%.`,
    inputFormat: '[4, 16, 28]',
    outputFormat: '2',
    exampleSolution: `function solution(array){
                        let multiple = %multiple%
                        let non_multiple = %non_multiple%
                        return array.filter(input => {return (input%multiple===0)&&(input%non_multiple!==0)}).length
                      }`,
    inputFillFunction: () => '['+Array(5).fill('').map(() => utils.random(0,100)).join(', ')+']'
  },
  {
    type: 'reversed_words',
    limit: undefined,
    text: `Напишите функцию, которая получает одно или больше слов, и возвращает строку, в которой все слова, в
           которых больше %limit% букв перевернуты.`,
    inputFormat: '[\'Привет\', \'мир\']',
    outputFormat: '\'тевирП рим\'',
    exampleSolution: `function solution(string){
                        let limit = %limit%
                        return string.split(' ').map(word => (word.length<%limit% ? word : word.split('').reverse().join(''))).join(' ')
                      }`,
    inputFillFunction: () => '\''+Array(5).fill('').map(() => utils.wordsLimit(utils.toPureLabel(ryba(1)), 1)).join(' ')+'\''
  },
  {
    type: 'repeating_characters',
    text: `Напишите функцию, которая возвращает количество повторяюшихся буквенных символов (не чувствительных к регистру)\
           и цифр.`,
    inputFormat: '\'testcase\'',
    outputFormat: '3',
    exampleSolution: `function solution(text){
                        return text.toLowerCase().split('').filter(function(val, i, arr){
                          return arr.indexOf(val) !== i && arr.lastIndexOf(val) === i;
                        }).length
                      }`,
    inputFillFunction: () => 'hello world'
  },
  {
    type: 'phone_number',
    text: `Напишите функуцию, которая принимает массив из 10 цифр (от 0 до 9) и возвращает строку \
           из этих цифр в формате телефонного номера.`,
    inputFormat: '[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]',
    outputFormat: '\'+7 (123) 456-78-90\'',
    exampleSolution: `function solution(numbers){
                        let format = "+7 (xxx) xxx-xx-xx";
                        for(let i = 0; i < numbers.length; i++) {
                          format = format.replace('x', numbers[i]);
                        }
                        return format;
                      }`,
    inputFillFunction: () => '['+Array(10).fill().map(digit => utils.random(0, 9)).join(', ')+']'
  },
  {
    type: 'unique_number',
    text: `Напишите функуцию, которая принимает массив из одинаковых цифр, кроме одной и выводит эту цифру`,
    inputFormat: '[1, 1, 1, 2, 1, 1]',
    outputFormat: '2',
    exampleSolution: `function solution(arr){
                        return arr.find(n => arr.indexOf(n) === arr.lastIndexOf(n));
                      }`,
    inputFillFunction: () => {
      let array = Array(utils.random(5, 10)).fill(utils.random(1, 99))
      array.push(utils.random(1, 99))
      return '['+utils.shuffle(array).join(', ')+']'
    }
  }
]
class Excercise15 extends React.Component {
  constructor (props){
    super(props);

    this.codemirrorRef = React.createRef()

    this.task = this.generateDataForTask(tasksTemplates[4])//utils.randomItem(tasksTemplates))
    const defaultCode = `function solution(input){\n  // формат входных данных: ${this.task.inputFormat}\n  // формат выходных данных: ${this.task.outputFormat}\n  let output\n  return output\n}`
    this.defaultCode = defaultCode
    this.state = {
      value: defaultCode,
      resetConfirmationModalOpen: false,
      execution_input: 'Здесь появится ввод в вашу программу',
      execution_output: 'Здесь появится вывод вашей программы',
      execution_output_type: 'default'
    }
    this.generateExcerciseData()
  }

  generateDataForTask(_task) {
    let task = Object.assign({}, _task)
    switch(task.type){
      case 'find_multiple_number':
        task.multiple = utils.random(2, 8)
        task.non_multiple = utils.random(2, 8, task.multiple)
        task.exampleSolution = task.exampleSolution.replace(/%multiple%/g, task.multiple)
                                                   .replace(/%non_multiple%/g, task.non_multiple)
        task.text = task.text.replace(/%multiple%/g, task.multiple)
                             .replace(/%non_multiple%/g, task.non_multiple)
        break;

      case 'reversed_words':
        task.limit = utils.random(5, 9)
        task.exampleSolution = task.exampleSolution.replace(/%limit%/g, task.limit)
        task.text = task.text.replace(/%limit%/g, task.limit)
        break;

      case 'phone_number':
      case 'repeating_characters':
      case 'unique_number':
        // nothing to change
        break;
    }
    return task
  }

  generateExcerciseData(){
    let [input, output] = this.test(this.task.exampleSolution.toString())
    this.example_input = this.formatInput(input)
    this.example_output = output
  }

  execute(){
    let [input, output] = this.test(this.state.value)
    this.setState({ execution_input: this.formatInput(input), execution_output: output || (output===0?output:'Пусто') })
  }

  formatInput(string){
    return (string.split !== undefined?string.split(', ').join('\n').slice(1,-1):string)
  }

  test(f, specified_input = undefined, display_output = true){
    let input = specified_input || this.task.inputFillFunction()
    let executed_code = `${f}\n solution(${input})`
    let output;
    try {
      output = eval(executed_code)
      if(display_output)
        this.setState({execution_output_type: [undefined, null, ''].includes(output)?'empty':'default'})
      output = output || (output===0?output:'Пусто')
    } catch (e) {
      output = 'Ошибка:\n'+e
      if(display_output)
        this.setState({execution_output_type: 'error'})
    }
    //input = input.split(',')
    return [input, output]
  }

  toggle(){
    this.setState({resetConfirmationModalOpen: false})
  }

  handleReset(){
    this.setState({value: this.defaultCode})
    this.toggle()
  }

  testUserSolution(){
    let userSolution = this.state.value
    for (var i = 0; i < 10; i++) {
      let [inputToUserSolution, outputFromUserSolution] = this.test(userSolution, undefined, false)
      let [, correctOutput] = this.test(this.exampleSolution.toString(), inputToUserSolution.split(' \n'), false)
      if(outputFromUserSolution != correctOutput) return false
    }
    return true
  }

  render(){
    const tdstyles = {flex: 0, padding: 0, paddingRight: '15px'}

    return (
      <div style={{overflow: 'auto'}}>
        <p>
          {this.task.text}
        </p>
        <b>Пример работы программы:</b>{'\n'}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Входные данные</th>
              <th scope="col">Выходные данные</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{maxWidth: '30vw', overflowX: 'auto'}}><pre>{this.example_input}</pre></td>
              <td><pre>{this.example_output}</pre></td>
            </tr>
          </tbody>
        </table>
        <Card>
          <CardBody>
            <table style={{width: '100%'}}>
              <tbody>
                <tr>
                  <td colspan={2} style={{paddingBottom: '15px'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={tdstyles}>
                          <Button color='danger' onClick={() => this.setState({resetConfirmationModalOpen: true})}>Восстановить </Button>
                          <ResetConfirmationModal open={this.state.resetConfirmationModalOpen}
                                                  toggle={() => this.toggle()}
                                                  handleReset={() => this.handleReset()}/>
                        </div>
                        <div style={tdstyles}>
                          <Button color="primary" onClick={() => this.execute()}>Запустить</Button>
                        </div>
                        <div style={{...tdstyles, flex: 1}}>
                          <label className="text-muted">Количество запусков не влияет на оценку</label>
                        </div>
                    </div>
                  </td>
                </tr>
                <tr style={{verticalAlign: 'top', height: '50%'}}>
                  <td rowspan={2} className='col-6' style={{paddingLeft: 0, width: '50%'}}>
                    <div style={{width: '30vw'}}>
                      <CodeMirror
                        value={this.state.value}
                        options={{
                          mode: 'javascript',
                          theme: 'material-ocean',
                          lineNumbers: true
                        }}
                        onBeforeChange={(editor, data, value) => {
                          this.setState({value});
                        }}
                        ref={this.codemirrorRef}
                      />
                    </div>
                  </td>
                  <td style={{display: 'inline-block', maxWidth: '30vw', overflowX: 'auto'}}>
                    <b>Входные данные:</b>
                    <pre>{this.state.execution_input}</pre>
                  </td>
                </tr>
                <tr style={{verticalAlign: 'top', height: '50%'}}>
                  <td>
                    <b>Выходные данные:</b>
                    <pre style={{fontStyle: this.state.execution_output_type==='empty'?'italic':'normal',
                                 color: this.state.execution_output_type==='empty'?'#999':
                                 (this.state.execution_output_type==='error'?'#f00':'revert')}}>{this.state.execution_output}</pre>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    )
  }
}

class ResetConfirmationModal extends React.Component {
  constructor (props){
    super(props);
  }

  render(){
    return (
      <Modal isOpen={this.props.open} toggle={() => this.props.toggle()}>
        <ModalHeader toggle={() => this.props.toggle()}>Вы уверены?</ModalHeader>
        <ModalBody>
          Вы действительно хотите вернуть поле для ввода кода в исходное состояние?
        </ModalBody>
        <ModalFooter>
          <Button color="light" onClick={() => this.props.toggle()}>Нет</Button>{' '}
          <Button color="secondary" onClick={() => this.props.handleReset()}>Да</Button>
        </ModalFooter>
      </Modal>
    )
  }
}


export default Excercise15