import JSZip from 'jszip'
import utils from './utils.js'
import ryba from 'ryba-js'
import { saveAs } from 'file-saver';

const folderNames = ['видения', 'новелла', 'ода', 'опус', 'очерк', 'поэма', 'повесть',
'пьеса', 'рассказ', 'роман', 'скетч', 'эпопея', 'эпос', 'эссе', 'комедия', 'фарс', 'водевиль',
'интермедия', 'скетч', 'пародия', 'комедия положений', 'комедия характеров', 'трагедия', 'драма',
'ужасы', 'эпические', 'басня', 'аполог', 'былина', 'баллада', 'миф', 'новелла', 'повесть', 'рассказ',
'роман', 'роман-эпопея', 'сказка', 'эпопея', 'лирические', 'ода', 'послание', 'элегия', 'эпиграмма',
'лиро-эпические', 'стансы', 'баллада', 'поэма', 'драматические', 'драма', 'комедия', 'трагедия']

const extensions = ['.txt', '.text', '.rtf', '.html', '.log']

const ExtraFiles = {
  startGeneration: function(){
    window.appData.extraFilesSetState('loading')

    window.appData.extraFilesDownloading = {
      timerOut: false,
      generated: false
    }

    setTimeout(() => {
      window.appData.extraFilesDownloading.timerOut = true
      this.endGeneration()
    }, 1000)

    this.generate().then(() => {
      window.appData.extraFilesDownloading.generated = true
      this.endGeneration()
    })
  },

  endGeneration: function(){
    if(window.appData.extraFilesDownloading.timerOut && window.appData.extraFilesDownloading.generated){
      this.download()
      window.appData.extraFilesSetState('downloaded')
    }
  },

  generate: function(){
    window.appData.extraFileExtensions = extensions
    return new Promise((resolve, reject) => {
      if(!window.appData.extraFiles){
        window.appData.extraFiles = {}
        let topFolders = Array(utils.random(3, 6)).fill('').map(el => utils.capitalize(utils.randomItem(folderNames)))
        for (let topFolderName of topFolders){
          window.appData.extraFiles[topFolderName] = {}
          let topFolderRef = window.appData.extraFiles[topFolderName]

          let subFolders = Array(utils.random(4, 12)).fill('').map(el => {
            let subFolderName = ryba(1)
            subFolderName = utils.capitalize(subFolderName)
            subFolderName = utils.toPureLabel(subFolderName)
            subFolderName = utils.wordsLimit(subFolderName, 1)
            return subFolderName
          })
          for (let subFolderName of subFolders){
            topFolderRef[subFolderName] = {}
            let subfolderRef = topFolderRef[subFolderName]

            let files = Array(utils.random(5, 15)).fill('').map(el => {
              let filename = ryba(1)
              filename = utils.capitalize(filename)
              filename = utils.toPureLabel(filename)
              filename = utils.wordsLimit(filename, utils.random(1, 3))
              filename = filename.replace(/ /gu, '_')
              filename += utils.randomItem(extensions)
              return filename
            })
            for (let fileName of files) {
              let fileContent = ryba(utils.random(10, 50))
              subfolderRef[fileName] = fileContent
            }
          }
        }
        window.genCallback(true)
        window.genCallback2(true)
        resolve()
      } else {
        reject()
      }
    });
  },

  download: function(){
    let zip = new JSZip();
    for (let [topFolderName, subFolders] of Object.entries(window.appData.extraFiles)){
      let topFolderRef = zip.folder(topFolderName)
      for (let [subFolderName, subFolderContent] of Object.entries(subFolders)){
        let subFolderRef = topFolderRef.folder(subFolderName)
        for (let [fileName, fileContent] of Object.entries(subFolderContent)){
          subFolderRef.file(fileName, `${fileContent}\n`)
        }
      }
    }
    zip.generateAsync({type:"blob"})
    .then(function(content) {
        saveAs(content, "Дополнительные_Файлы.zip");
    });
  }
}

window.ExtraFiles = ExtraFiles

export default {}