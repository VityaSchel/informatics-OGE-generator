import React, { useEffect, useMemo, useState } from 'react'
import utils from '../../utils.js'
import { Card, CardBody } from 'reactstrap'
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from './jseditor_tools'

class Excercise13 extends React.Component {
  constructor (props){
    super(props);

    this.generateExcerciseData()
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
          Расстояние между строками текста — одинарный интервал, но не больше строки.
        </p>
        <p>
          Основной текст выровнен по ширине; заголовок и текст в ячейках таблицы – по центру. В основном
          тексте и таблице есть слова, выделенные полужирным или курсивным шрифтом. Ширина таблицы меньше
          ширины основного текста.
        </p>
        <p>
          Интервал между текстом и таблицей не менее 12 пунктов, но не более 24 пунктов.
          Текст сохраните в файле, имя которого Вам сообщат организаторы.
        </p>
        <Card>
          <CardBody>
            <EditorJs logLevel='ERROR' tools={EDITOR_JS_TOOLS} inlineToolbar={['bold','italic','underline']}
              i18n={{
                messages: {
                  toolNames: {
                    "Bold": "Жирный",
                    "Italic": "Курсив",
                    "Underline": "Подчеркивание",
                    "Table": "Таблица"
                  }
                }
              }}/>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default Excercise13