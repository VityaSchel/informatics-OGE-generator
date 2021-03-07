import React, { useState } from 'react'
import utils from '../../utils.js'
import { Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody } from 'reactstrap'
import {Controlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/material-ocean.css'

const defaultCode = `function solution(input){\n  // формат входных данных: [4,16,28]\n  let output\n  return output\n}`
class Excercise15 extends React.Component {
  constructor (props){
    super(props);

    this.codemirrorRef = React.createRef()

    this.state = {
      value: defaultCode,
      resetConfirmationModalOpen: false,
      execution_input: 'Здесь появится ввод в вашу программу',
      execution_output: 'Здесь появится вывод вашей программы',
      execution_output_type: 'default'
    }
    this.generateExcerciseData()
  }

  generateExcerciseData(){
    this.multiple = utils.random(2, 8)
    this.non_multiple = utils.random(2, 8, this.multiple)

    const exampleSolution = `solution(array){
      let multiple = ${this.multiple}
      let non_multiple = ${this.non_multiple}
      return array.filter(input => {return (input%multiple===0)&&(input%non_multiple!==0)}).length
    }`
    let [input, output] = this.test('function '+exampleSolution.toString())
    this.example_input = input
    this.example_output = output
  }

  execute(){
    let [input, output] = this.test(this.state.value)
    this.setState({execution_input: input, execution_output: output || (output===0?output:'Пусто')})
  }

  test(f){
    let input = Array(5).fill('').map(random => utils.random(0,100))
    let executed_code = `${f}\n solution([${input.join(', ')}])`
    let output;
    try {
      output = eval(executed_code)
      this.setState({execution_output_type: [undefined, null, ''].includes(output)?'empty':'default'})
      output = output || (output===0?output:'Пусто')
    } catch (e) {
      output = 'Ошибка:\n'+e
      this.setState({execution_output_type: 'error'})
    }
    input = input.join(' \n')
    return [input, output]
  }

  toggle(){
    this.setState({resetConfirmationModalOpen: false})
  }

  handleReset(){
    this.setState({value: defaultCode})
    this.toggle()
  }

  render(){
    const tdstyles = {flex: 0, padding: 0, paddingRight: '15px'}

    return (
      <div style={{overflow: 'auto'}}>
        <p>
          Напишите программу, которая в последовательности натуральных чисел определяет количество чисел,
          кратных {this.multiple}, но не кратных {this.non_multiple}. Программа получает на вход количество чисел в последовательности,
          а затем сами числа. В последовательности всегда имеется число, кратное {this.multiple} и не кратное {this.non_multiple}.
          Количество чисел не превышает 1000. Введённые числа не превышают 30 000.
        </p>
        <p>
          Программа должна вывести одно число: количество чисел, кратных {this.multiple}, но не кратных {this.non_multiple}.
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
              <td><pre>{this.example_input}</pre></td>
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
                  <td style={{display: 'inline-block'}}>
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