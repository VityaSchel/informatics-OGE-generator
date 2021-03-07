import Table from '@editorjs/table'
import Underline from '@editorjs/underline'
import Paragraph from '@editorjs/paragraph'

export const EDITOR_JS_TOOLS = {
  underline: {
    class: Underline,
    inlineToolbar: true,
    shortcut: 'CMD+U'
  },
  table: {
    class: Table,
    inlineToolbar: true,
    config: {
      rows: 2,
      cols: 3,
    },
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  }
}