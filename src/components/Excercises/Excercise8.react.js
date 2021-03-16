import React from 'react'
import randomWords from 'random-words'
import utils from '../../utils.js'

class Excercise8 extends React.Component {
  constructor (props){
    super(props);

    this.generateExcerciseData()
  }

  generateExcerciseData(){
    const possibleTerms = [['шинель','кофта'],['рыбка','рыбак'],['башня','замок'],['лимон','лайм'],
                          ['аэрофлот','аэропорт'],['банка','банк'],['лунка','луна'],['решето','решетка'],
                          ['блок','блог'],['самара','саратов']]

    let [term1, term2] = possibleTerms[Math.floor(Math.random()*possibleTerms.length)]
    this.term1 = term1
    this.term2 = term2

    this.termShown = Math.floor(Math.random()*2)
    this.requests = [this.term1+' | '+this.term2,
                     (this.termShown?this.term1:this.term2),
                     this.term1+' & '+this.term2]
    this.requests = utils.shuffle(this.requests)

    let pages = []
    let pagesOverall = utils.random(5, 90)
    for (let i = 0; i < pagesOverall; i++) {
      switch(Math.floor(Math.random() * 3)){
        case 0:
          pages.push(this.term1)
          break;

        case 1:
          pages.push(this.term2)
          break;

        case 2:
          pages.push('both')
          break;
      }
    }

    this.responses = []
    for (let request of this.requests) {
      let termFound;
      if(request.includes('|')){
        termFound = pages.filter(page => [this.term1, this.term2, 'both'].includes(page)).length
      } else if(request.includes('&')){
        termFound = pages.filter(page => page === 'both').length
      } else {
        termFound = pages.filter(page => page === request).length
      }
      this.responses.push(termFound*10)
    }

    let or = pages.filter(page => [this.term1, this.term2, 'both'].includes(page)).length
    let both = pages.filter(page => page === 'both').length
    let term = pages.filter(page => page === (this.termShown?this.term1:this.term2)).length
    this.answer = (or - term + both) * 10

    this.answer = utils.encodeAnswer(this.answer)
  }

  render(){
    return (
      <div>
        <p>В языке запросов поискового сервера для обозначения логической операции «ИЛИ»
           используется символ «|», а для обозначения логической операции «И» – символ «&».</p>
        <p>В таблице приведены запросы и количество найденных по ним страниц некоторого сегмента сети Интернет.</p>
        <table className="table table-bordered">
         <thead>
           <tr>
             <th scope="col">Запрос</th>
             <th scope="col">Найдено страниц (в тысячах)</th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <td><pre>{this.requests[0]}</pre></td>
             <td><pre>{this.responses[0]}</pre></td>
           </tr>
           <tr>
             <td><pre>{this.requests[1]}</pre></td>
             <td><pre>{this.responses[1]}</pre></td>
           </tr>
           <tr>
             <td><pre>{this.requests[2]}</pre></td>
             <td><pre>{this.responses[2]}</pre></td>
           </tr>
         </tbody>
       </table>
       <p>Какое количество страниц (в тысячах) будет найдено по запросу {!this.termShown?this.term1:this.term2}?
          Считается, что все запросы выполнялись практически одновременно, так
          что набор страниц, содержащих все искомые слова, не изменялся за
          время выполнения запросов.</p>
      </div>
    )
  }
}

export default Excercise8