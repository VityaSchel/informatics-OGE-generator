import React, { useState } from 'react'
import utils from '../../utils.js'
import ryba from 'ryba-js'
import { Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody,
         Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import {Controlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/python/python'
import 'codemirror/theme/material-ocean.css'
import tasksTemplates from './Excercise15tasks/index.js'

const defaultCode = {
  'javascript': `function solution(input){\n  // формат входных данных: %%input%%\n  // формат выходных данных: %%output%%\n  let output\n  return output\n}`,
  'python': `def solution(input):\n  # формат входных данных: %%input%%\n  # формат выходных данных: %%output%%\n  output = ''\n  return output`,
}
const languageNames = {
  'javascript': 'ECMAScript 6 (JS)',
  'python': 'Python 3.8'
}
const defaultLanguage = 'javascript'

class Excercise15 extends React.Component {
  constructor (props){
    super(props);

    this.sourceTask = utils.randomItem(tasksTemplates)

    let ref = this
    this.cachedTasksData = {}
    tasksTemplates.forEach(t => {
      ref.cachedTasksData[t.type] = {}
      for (let languageName of Object.keys(languageNames)){
        ref.cachedTasksData[t.type][languageName] = undefined
      }
    })

    this.state = {
      task: this.generateDataForTask(this.sourceTask, defaultLanguage, this),
      language: defaultLanguage,
      defaultCode: undefined,
      dropdownOpen: false,
      pythonCompilerLoading: 'none',

      value: undefined,
      resetConfirmationModalOpen: undefined,
      execution_input: undefined,
      execution_output: undefined,
      execution_output_type: undefined
    }

    this.codemirrorRef = React.createRef()
  }

  componentDidMount(){
    this.generateExcerciseData()
    let ref = this
    window.addEventListener('keydown', event => {
      if(event.key === 'Enter'){
        if(event.metaKey || event.ctrlKey){
          document.querySelector('#execute_excercise15').click()
        }
      }
    })
  }

  generateExcerciseData(){
    let _defaultCode = this.getDefaultCode(defaultLanguage)

    this.setState({
      value: _defaultCode,
      resetConfirmationModalOpen: false,
      execution_input: 'Здесь появится ввод в вашу программу',
      execution_output: 'Здесь появится вывод вашей программы',
      execution_output_type: 'default'
    }, this.exampleTest)
  }

  getDefaultCode(language){
    return defaultCode[language].replace(/%%input%%/g, this.state.task.languagesSpecificData[language].inputFormat).replace(/%%output%%/g, this.state.task.languagesSpecificData[language].outputFormat)
  }

  generateDataForTask(_task, language, ref) {
    let cachedTask = ref.cachedTasksData[_task.type][language]
    if(cachedTask){
      return cachedTask
    }

    let task = Object.assign({}, _task)
    switch(task.type){
      case 'find_multiple_number':
        task.multiple = utils.random(2, 8)
        task.non_multiple = utils.random(2, 8, task.multiple)
        task.languagesSpecificData[language].exampleSolution = task.languagesSpecificData[language].
                                                                  exampleSolution.replace(/%multiple%/g, task.multiple)
                                                                  .replace(/%non_multiple%/g, task.non_multiple)
        task.text = task.text.replace(/%multiple%/g, task.multiple)
                             .replace(/%non_multiple%/g, task.non_multiple)
        break;

      case 'reversed_words':
        task.limit = utils.random(5, 9)
        task.languagesSpecificData[language].exampleSolution = task.languagesSpecificData[language].
                                                                      exampleSolution.replace(/%limit%/g, task.limit)
        task.text = task.text.replace(/%limit%/g, task.limit)
        break;

      case 'phone_number':
      case 'repeating_characters':
      case 'unique_number':
        // nothing to change
        break;
    }

    ref.cachedTasksData[_task.type][language] = task

    return task
  }

  exampleTest(){
    let [input, output] = this.test(this.state.task.languagesSpecificData[this.state.language].exampleSolution)
    this.setState({example_input: this.formatInput(input),
                   example_output: output})
  }

  test(f, specified_input = undefined, display_output = true){
    let input = undefined, output = undefined;
    switch(this.state.language){
      case 'javascript':
        [input, output] = this.runcode(f, (executed_code) => eval(executed_code), specified_input, display_output)
        break;

      case 'python':
        [input, output] = this.runcode(f, (executed_code) => window.python_compile(executed_code), specified_input, display_output)
        break;
    }
    return [input, output]
  }

  runcode(f, compiler, specified_input = undefined, display_output = true){
    let input = specified_input ?? this.state.task.languagesSpecificData[this.state.language].inputFillFunction()
    let executed_code = {
      'javascript': `${f}\n solution(${input})`,
      'python': `${f}\n__OUTPUT__ = solution(${input})`
    }[this.state.language]
    let output;
    try {
      output = compiler(executed_code)
      if(display_output)
        this.setState({execution_output_type: [undefined, null, ''].includes(output)?'empty':'default'})
      output = this.formatOutput(output)
    } catch (e) {
      output = 'Ошибка:\n'+e
      if(display_output)
        this.setState({execution_output_type: 'error'})
    }
    return [input, output]
  }

  handleExecute(){
    let [input, output] = this.test(this.state.value)
    this.setState({ execution_input: this.formatInput(input), execution_output: this.formatOutput(output) })
  }

  formatInput(string){
    return (string !== undefined && string.split !== undefined?string.split(', ').join('\n').slice(1,-1):string)
  }

  formatOutput(string){
    if(string === '')
      return 'Пусто'
    else
      return string ?? 'Пусто'
  }

  testUserSolution(){
    let failedTests = 0
    let userSolution = this.state.value
    for (var i = 0; i < 10; i++) {
      let [inputToUserSolution, outputFromUserSolution] = this.test(userSolution, undefined, false)
      let [, correctOutput] = this.test(this.state.task.languagesSpecificData[this.state.language].exampleSolution.toString(),
                                          inputToUserSolution.split(' \n'), false)
      if(outputFromUserSolution != correctOutput) failedTests++
    }
    if(failedTests === 0) {
      return true
    } else if(failedTests === 10){
      return false
    } else {
      return 'tests failed: '+failedTests
    }
  }

  resetModalToggle(){
    this.setState({resetConfirmationModalOpen: false})
  }

  handleResetOffer(){
    if(this.hasDefaultValue()){
      this.resetToDefault()
    } else {
      this.setState({resetConfirmationModalOpen: true})
    }
  }

  handleReset(){
    this.resetModalToggle()
    this.resetToDefault()
  }

  resetToDefault(){
    this.setState({value: this.getDefaultCode(this.state.language)})
  }

  dropDownToggle(){
    this.setState({dropdownOpen: !this.state.dropdownOpen})
  }

  setLanguage(language){
    if(language != this.state.language){
      if(language == 'python' && !window.plugins_loaded){
        this.setState({
          pythonCompilerLoading: 'flex'
        })
        let ref = this
        window.python_load_compiler()
        let intervalLoop = setInterval(() => {
          if(window.plugins_loaded){
            ref.setLanguageState(language)
            ref.setState({
              pythonCompilerLoading: 'none'
            })
            clearInterval(intervalLoop)
          }
        }, 10)
      } else {
        this.setLanguageState(language)
      }
    }
  }

  setLanguageState(language){
    let setDefaultCode = {}
    if(this.hasDefaultValue()){
      setDefaultCode.value = this.getDefaultCode(language)
    }

    this.setState({
        task: this.generateDataForTask(this.sourceTask, language, this),
        language: language,
        ...setDefaultCode
      }, this.exampleTest)
  }

  hasDefaultValue(){
    return this.getDefaultCode(this.state.language) == this.state.value
  }

  render(){
    const tdstyles = {flex: 0, padding: 0, paddingRight: '15px'}
    const compilerLoaderStyles = {position: 'absolute',
                                  width: '100%',
                                  height: '100%',
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  backgroundColor: '#eeeeee',
                                  zIndex: 9}

    return (
      <div style={{position: 'relative'}}>
        <div style={{...compilerLoaderStyles, display: this.state.pythonCompilerLoading}}>
          <h3>Загрузка компилятора Python...</h3>
          <p className='text-muted'>Это может занять некоторое время</p>
        </div>
        <div style={{overflow: 'auto'}}>
          <p>
            {this.state.task.text}
          </p>
          <p>
            <b>Пример работы программы:</b>
          </p>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Входные данные</th>
                <th scope="col">Выходные данные</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{maxWidth: '30vw', overflowX: 'auto'}}><pre>{this.state.example_input}</pre></td>
                <td><pre>{this.state.example_output}</pre></td>
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
                          <Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.dropDownToggle()}>
                            <DropdownToggle caret style={{backgroundColor: '#6f42c1'}} className='dropdown-purple'>
                              {languageNames[this.state.language]}
                            </DropdownToggle>
                            <DropdownMenu dark>
                              <DropdownItem header>Язык компиляции</DropdownItem>
                              <DropdownItem onClick={() => this.setLanguage('javascript')}>{languageNames['javascript']}</DropdownItem>
                              <DropdownItem onClick={() => this.setLanguage('python')}>{languageNames['python']}</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                        <div style={tdstyles}>
                          <Button color='danger' onClick={() => this.handleResetOffer()}>Восстановить </Button>
                          <ResetConfirmationModal open={this.state.resetConfirmationModalOpen}
                                                  toggle={() => this.resetModalToggle()}
                                                  handleReset={() => this.handleReset()}/>
                        </div>
                        <div style={tdstyles}>
                          <Button color="primary" onClick={() => this.handleExecute()} style={{width: 'max-content'}} id='execute_excercise15'>Запустить <kbd><kbd>{navigator.userAgent.includes('Mac OS X')?'⌘':'Ctrl'}</kbd> + <kbd>Enter</kbd></kbd></Button>
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
                            mode: this.state.language,
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
                                   (this.state.execution_output_type==='error'?'#f00':'revert'),
                                   maxWidth: '30vw', overflowX: 'auto'}}>{this.state.execution_output}</pre>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>
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
        <ModalHeader toggle={() => this.props.toggle()}>Восстановить код?</ModalHeader>
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