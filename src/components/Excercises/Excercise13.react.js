import React, { useEffect, useMemo, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import utils from '../../utils.js'
import ryba from 'ryba-js'
import ReactMarkdown from 'react-markdown'
import underline from 'remark-underline'
import html from 'remark-html'
import html2canvas from 'html2canvas'
import { Card, CardBody } from 'reactstrap'
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from './jseditor_tools'
import stringSimilarity from 'string-similarity'
import equal from 'fast-deep-equal/react'

class Excercise13 extends React.Component {
  constructor (props){
    super(props);

    this.userInput = [undefined, undefined]
    this.srcText = React.createRef()
  }

  testUserInput(){
    function validateParagraph(userInput, correctOutput){
      function format(input){
        return input.replace(/<u ?class="cdx-underline">(.*?)<\/u>/gui, '<u>$1</u>').
                     replace(/&nbsp;/gui, '').
                     replace(/<br>/gui, '').
                     replace(/<strong>(.*?)<\/strong>/gui, '<b>$1</b>').
                     replace(/ /gui, '').
                     replace(/<em>(.*?)<\/em>/gui, '<i>$1</i>').
                     replace(/\./gui, '')
      }

      if(userInput.type !== 'paragraph') { return; }
      else { userInput = userInput.data.text }

      let userInputParagraph = format(userInput)
      let correctOutputParagraph = format(correctOutput)

      let similiarity = stringSimilarity.compareTwoStrings(userInputParagraph, correctOutputParagraph);
      const maxScorePercentage = 0.85
      const minScorePercentage = 0.65

      return (similiarity >= maxScorePercentage ? 1.5 : (similiarity >= minScorePercentage ? 0.5 : 0))
    }

    function validateTable(userInput, correctOutput){

      if(userInput.type !== 'table') { return; }
      else { userInput = userInput.data.content }

      return equal(userInput, correctOutput) ? 0.5 : 0
    }


    if(this.userInput === undefined || !Array.isArray(this.userInput) || this.userInput.length == 0 || this.userInput[0] == undefined){ return 0; }
    let paragraphValidation = validateParagraph(this.userInput[0], this.srcText.current.correctOutputParagraph)

    let tableValidation;
    if(this.userInput.length == 1){ tableValidation = 0 }
    else { tableValidation = validateTable(this.userInput[1], this.srcText.current.correctOutputTable) }

    /* ┌────────────────────────────────────┐
    *  │               Scores               │
    *  ├──────────────────┬─────────────────┤
    *  │ Table is correct │ Text similarity │
    *  ├──────────────────┼────────┬────────┤
    *  │                  │ >= 65% │ >= 85% │
    *  │       +0.5       ├────────┼────────┤
    *  │                  │  +0.5  │   +1   │
    *  ├──────────────────┴────────┴────────┤
    *  │             Math.floor()           │
    *  ├───────────────────────────┬────────┤
    *  │          Result: 1        │ XXXXXX │
    *  ├──────────────────┬────────┼────────┤
    *  │     Result: 1    │ XXXXXX │        │
    *  ├──────────────────┼────────┴────────┤
    *  │ XXXXXXXXXXXXXXX  │    Result: 1    │
    *  ├──────────────────┴─────────────────┤
    *  │              Result: 2             │
    *  └────────────────────────────────────┘
    */

    return Math.floor(paragraphValidation + tableValidation)
  }

  handleSave(){
    this.editorInstance.save().then((outputData) => {
      this.userInput = outputData.blocks
    }).catch((error) => {
      console.log('Ошибка при получении информации из редактора: ', error)
    });
  }

  render(){
    const tdstyles = {flex: 0, padding: 0, paddingRight: '15px'}

    return (
      <div style={{overflow: 'auto'}}>
        <p>
          Создайте в текстовом редакторе документ и напишите в нём следующий текст, точно воспроизведя
          всё оформление текста, имеющееся в образце. Данный текст должен быть набран шрифтом обычного
          размера. Отступ первой строки первого абзаца основного текста – 8 пробелов.
          Расстояние между строками текста — одинарный межстрочный интервал.
        </p>
        <p>
          Основной текст выровнен по ширине; заголовок и текст в ячейках таблицы – по центру. В основном
          тексте и таблице есть слова, выделенные полужирным или курсивным шрифтом.
        </p>
        <p>
          Интервал между текстом и таблицей не более 1 межабзацного интервала
        </p>
        <Card>
          <CardBody>
            <Text ref={this.srcText} />
          </CardBody>
        </Card>
        <p></p>
        <Card>
          <CardBody>
            <EditorJs logLevel='ERROR'
                      tools={EDITOR_JS_TOOLS}
                      instanceRef={instance => this.editorInstance = instance}
                      onChange={() => this.handleSave()}
                      inlineToolbar={['bold','italic','underline']}
              i18n={{
                messages: {
                  toolNames: {
                    "Bold": "Жирный",
                    "Italic": "Курсив",
                    "Underline": "Подчеркивание",
                    "Table": "Таблица",
                    "Text": "Абзац"
                  },
                  ui: {
                    "blockTunes": {
                      "toggler": {
                        "Click to tune": "Нажмите, чтобы настроить",
                        "or drag to move": "или перетащите"
                      },
                    },
                    "toolbar": {
                      "toolbox": {
                        "Add": "Добавить"
                      }
                    }
                  },
                  blockTunes: {
                    "delete": {
                      "Delete": "Удалить"
                    },
                    "moveUp": {
                      "Move up": "Переместить вверх"
                    },
                    "moveDown": {
                      "Move down": "Переместить вниз"
                    }
                  }
                }
              }}
              placeholder='Введите текст здесь...'/>
          </CardBody>
        </Card>
      </div>
    )
  }
}

class Text extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      text: 'Загрузка...',
      canvas: <span></span>
    }
    this.markdownRef = React.createRef()

    this.generateRandomTable()
  }

  generateRandomTable(){
    this.row = utils.randomItem(
      [
        [
          ['Вещество', 'Плотность', 'Теплоемкость'],
          ['Графит', '2100', '700'],
          ['Алмаз', '3500', '1000']
        ],
        [
          ['Регион', 'З/П учителей', 'З/П докторов'],
          ['Волгоград', '16.8', '17.4'],
          ['Краснодар', '18.3', '19.6']
        ],
        [
          ['Продукт', 'Стоимость', 'Количество КГ'],
          ['Сыр', '43', '2'],
          ['Яблоки', '56', '3']
        ]
      ]
    )
  }

  componentDidMount(){
    this.fetchRandomText()
  }

  fetchRandomText(){
    const max_length = 400
    let text = ryba(10).replace(/либидо/i, 'произношение').substring(0, max_length).split('.')
    text.pop()
    text = text.join('.')+'.'
    const border = '1px solid #dbdbe2'
    const cell = {
      borderTop: border,
      borderLeft: border,
      padding: '10px'
    }
    this.update(ReactDOMServer.renderToString(
      <div id='render-it'>
        <ReactMarkdown allowDangerousHtml>{this.format(text)}</ReactMarkdown>
        <table style={{width: '100%', borderBottom: border, borderRight: border, borderRadius: '5px 5px 5px 5px'}}>
          <tr>
            <th style={{...cell, borderRadius: '5px 0 0 0'}}>{this.row[0][0]}</th>
            <th style={cell}>{this.row[0][1]}</th>
            <th style={{...cell, borderRadius: '0 5px 0 0'}}>{this.row[0][2]}</th>
          </tr>
          <tr>
            <td style={cell}>{this.row[1][0]}</td>
            <td style={cell}>{this.row[1][1]}</td>
            <td style={cell}>{this.row[1][2]}</td>
          </tr>
          <tr>
            <td style={{...cell, borderRadius: '0 0 0 5px'}}>{this.row[2][0]}</td>
            <td style={cell}>{this.row[2][1]}</td>
            <td style={{...cell, borderRadius: '0 0 5px 0'}}>{this.row[2][2]}</td>
          </tr>
        </table>
      </div>))
  }

  format(text) {
    let textSplitted = text.split(' ')
    for (let i = 0; i < Math.ceil(Math.random()*5); i++) {
      let word_index = Math.floor(Math.random()*textSplitted.length)
      if(!/^\*([^\*]*)\*$/.test(textSplitted[word_index]))
        textSplitted[word_index] = `*${textSplitted[word_index]}*`
    }
    for (let i = 0; i < Math.ceil(Math.random()*5); i++) {
      let word_index = Math.floor(Math.random()*textSplitted.length)
      if(!/^\*\*([^\*]*)\*\*$/.test(textSplitted[word_index]))
        textSplitted[word_index] = `**${textSplitted[word_index]}**`
    }
    for (let i = 0; i < Math.ceil(Math.random()*5); i++) {
      let word_index = Math.floor(Math.random()*textSplitted.length)
      if(!/^__([^_]*)__$/.test(textSplitted[word_index]))
        textSplitted[word_index] = `<u>${textSplitted[word_index]}</u>`
    }
    return textSplitted.join(' ')
  }

  update(renderedMarkdown) {
    let component = document.querySelector('#react-markdown')
    let componentMarkdown = document.createElement('p')
    component.appendChild(componentMarkdown)
    componentMarkdown.outerHTML = renderedMarkdown
    let componentContent = document.querySelector('#react-markdown > div#render-it')
    let componentCanvas = document.querySelector('#react-markdown > canvas')
    let currentScroll = window.scrollY
    window.scrollTo({top:0,behavior: 'instant'})
    window.document.body.style.overflow = 'hidden'
    this.correctOutputParagraph = componentContent.querySelector('p').innerHTML
    this.correctOutputTable = this.row.map((h, i) => h.map(cell => i==0?`<b>${cell}</b>`:cell))
    html2canvas(componentContent, {logging: false}).then(function(canvas) {
      component.appendChild(canvas)
      componentContent.remove()
      window.scrollTo({top:currentScroll, behavior: 'instant'})
      window.document.body.style.overflow = 'auto'
    });
  }

  render(){
    return (
      <p className='utils--no-margin-bottom' id='react-markdown'>

      </p>
    )
  }
}

export default Excercise13