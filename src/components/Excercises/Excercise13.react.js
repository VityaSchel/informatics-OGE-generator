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

class Excercise13 extends React.Component {
  constructor (props){
    super(props);

    this.generateExcerciseData()
    this.answer = utils.encodeAnswer(this.answer)
  }

  generateExcerciseData(){

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
            <Text />
          </CardBody>
        </Card>
        <p></p>
        <Card>
          <CardBody>
            <EditorJs logLevel='ERROR' tools={EDITOR_JS_TOOLS} inlineToolbar={['bold','italic','underline']}
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
  }

  componentDidMount(){
    this.fetchRandomText()
  }

  fetchRandomText(){
    const max_length = 400
    let text = ryba(10).substring(0, max_length).split('.')
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
            <th style={{...cell, borderRadius: '5px 0 0 0'}}>Вещество</th>
            <th style={cell}>Плотность</th>
            <th style={{...cell, borderRadius: '0 5px 0 0'}}>Теплоемкость</th>
          </tr>
          <tr>
            <td style={cell}>Графит</td>
            <td style={cell}>2100</td>
            <td style={cell}>700</td>
          </tr>
          <tr>
            <td style={{...cell, borderRadius: '0 0 0 5px'}}>Алмаз</td>
            <td style={cell}>3500</td>
            <td style={{...cell, borderRadius: '0 0 5px 0'}}>1000</td>
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
    window.rer = html2canvas
    let component = document.querySelector('#react-markdown')
    let componentMarkdown = document.createElement('p')
    component.appendChild(componentMarkdown)
    componentMarkdown.outerHTML = renderedMarkdown
    let componentContent = document.querySelector('#react-markdown > div#render-it')
    let componentCanvas = document.querySelector('#react-markdown > canvas')
    let currentScroll = window.scrollY
    window.scrollTo({top:0,behavior: 'instant'})
    window.document.body.style.overflow = 'hidden'
    html2canvas(componentContent).then(function(canvas) {
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