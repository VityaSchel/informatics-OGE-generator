import React from 'react'
import randomWords from 'random-words'
import utils from '../../utils.js'
import '../../canvas-arrow.js'

const pointNames = 'АБВГДЕЖЗИКЛМНОПРСТ'.split('')
class Excercise9 extends React.Component {
  constructor (props){
    super(props);
    this.canvasRef = React.createRef()
    this.canvasWidth = 800
    this.canvasHeight = 200
    this.verticalOffset = 20
    this.horizontalOffset = 20

    this.state = {
      generated: false
    }
  }

  componentDidMount(){
    this.canvasContext = this.canvasRef.current.getContext('2d')
    this.generateExcerciseData()
    this.setState({generated: true})
    this.answer = utils.encodeAnswer(this.answer)
  }

  generateInput(){
    const format = [
                    [{point: 'A', ref: ['B', 'D']}],
                    [{point: 'B', ref: ['E']}, {point: 'C', ref: ['E']}, {point: 'D', ref: ['C', 'E']}],
                    [{point: 'E', ref: ['F', 'G']}, {point: 'G', ref: ['F']}],
                    [{point: 'F', ref: []}]
                   ]
    let pointIndex = -1
    let inputLen = utils.random(4,6)
    let input = Array(inputLen).fill().map((col, i) => {
      return Array((i==0 || i == inputLen-1) ? 1 : utils.random(2,4)).fill().map(p => {
        pointIndex++
        return {point: pointNames[pointIndex], ref: []}
      })
    })

    input.map((col, colIndex, colArray) => {
      col.map(point => {
        if(colIndex !== inputLen-1){
          point.ref.push(utils.randomItem(colArray[colIndex+1]).point)
        }
      })
      if(utils.random(0, 1) && col.length >= 2){
        let point1Index = utils.random(0, col.length-1)
        let randomSameColPoint1 = col[point1Index]
        let randomSameColPoint2 = col[point1Index+1]
        if(point1Index+1 >= col.length){
          randomSameColPoint2 = col[point1Index-1]
        }
        randomSameColPoint1.ref.push(randomSameColPoint2.point)
      }
    })

    return input
  }

  generateExcerciseData(){
    this.drawEllipses()
  }

  drawEllipses(){
    let radius = 5
    this.canvasContext.font = "bold 9px sans-serif";
    let input = this.generateInput()
    let dataCopy = Object.assign({}, input)
    let cols = input.length
    let colsInterval = (this.canvasWidth-(this.horizontalOffset*2)) / cols
    for (let [colIndex, col] of Object.entries(input)){
      let x = colsInterval*colIndex+this.horizontalOffset
      let points = col.length
      let pointsInterval = ((this.canvasHeight - (2 * this.verticalOffset)) / (points + 1))
      for (let [pointIndex, point] of Object.entries(col)){
        pointIndex = Number(pointIndex)
        let y = this.verticalOffset + (pointsInterval * (pointIndex+1))

        this.canvasContext.fillStyle = 'black'
        this.canvasContext.beginPath()
        this.canvasContext.ellipse(x, y, radius, radius, Math.PI / 4, 0, 2 * Math.PI)
        this.canvasContext.fill()
        dataCopy[colIndex][pointIndex].coordinates = [x, y]

        this.canvasContext.fillStyle = 'white'
        this.canvasContext.fillText(point.point, x-3, y+3);
      }
    }
    this.data = Object.values(dataCopy)
    this.drawArrows()
  }

  drawArrows(){
    let dataCopy = this.data
    for (let col of dataCopy){
      for (let point of col){
        let refs = point.ref ?? []
        for (let ref of refs){
          let refPoint = this.getPoint(ref)
          if(refPoint !== undefined){
            var coordinates = point.coordinates
            var refCoordinates = refPoint.coordinates
            var [coordinates, refCoordinates] = utils.closePoints(coordinates, refCoordinates, 0.15)

            this.canvasContext.fillStyle = 'black'
            this.canvasContext.beginPath()
            this.canvasContext.arrow(...coordinates, ...refCoordinates, [0, 1, -10, 1, -10, 5])
            this.canvasContext.fill()
          }
        }
      }
    }
  }

  getPoint(pointName){
    let points = this.getPoints()
    return points.filter(point => point.point === pointName)[0]
  }

  getPoints(){
    return this.data.reduce((curCol, prev) => prev.concat(curCol), []).reverse()
  }

  render(){
    return (
      <div>
       {this.state.generated?
         <>
           <p>
             На рисунке – схема дорог, связывающих города {pointNames.slice(0, this.getPoints().length).join(', ')}.
             По каждой дороге можно двигаться только в одном направлении, указанном
             стрелкой. Сколько существует различных путей из города {this.getPoints()[0].point} в город {this.getPoints().last().point}?
           </p>
         </>
       :<></>}
       <canvas width={this.canvasWidth+'px'} height={this.canvasHeight+'px'} ref={this.canvasRef}></canvas>
      </div>
    )
  }
}

export default Excercise9