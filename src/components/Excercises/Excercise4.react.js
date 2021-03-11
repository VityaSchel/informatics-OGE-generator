import React from 'react'
import utils from '../../utils.js'

class Excercise4 extends React.Component {
  constructor (props){
    super(props);

    this.generateExcerciseData()
  }

  generateExcerciseData(){
    const allPointsNames = 'ABCDEFGH'
    this.pointNames = allPointsNames.substring(0, utils.random(5, 8)).split('')
    this.startingPoint = this.pointNames[0]
    this.mediumPoint = utils.randomItem(this.pointNames)
    this.endingPoint = utils.randomItem(this.pointNames)
    this.solve(this.points, this.startingPoint, this.mediumPoint, this.endingPoint)
  }

  solve(pointsWithRoads, start, medium, end){
    // Формат: {Точка: {НазваниеДругойТочки: Расстояние}, ...}
    // Например: {A: {B: 1, C: 4, D: 3, E: 7}, B: {C: 2, D: 5}, C: {D: 3}, D: {E: 5}}
    const prettyPrintedExample = {
      'A': {
        'B': 1,
        'C': 4,
        'D': 3,
        'E': 7
      },

      'B': {
        'C': 2,
        'D': 5
      },

      'C': {
        'D': 3
      },

      'D': {
        'E': 5
      }
    }

    /*

    Алгоритм решения (только для компьютера):

    1. построить для каждого пункта дороги от него
       (например: пункт А имеет дороги к Е, В, С и количество)

    2. От начального пункта рекурсивно построить все возможные
       дороги (перебором) до конечного, игнорируя дороги через исключаемый

    3. Отсортировать по количеству и взять наименьшую и
       вывести количество

    */

    // ! Нужна помощь с алгоритмом перебора всех возможных путей во всех направлениях !
  }

  render(){
    return (
      <div>
        <p className="text-danger">Это задание еще в разработке</p>
        <p>
          Между населёнными пунктами {this.pointNames.join(', ')} построены дороги, протяжённость которых
          (в километрах) приведена в таблице
        </p>
        <p>
          Определите длину кратчайшего пути между пунктами {this.startingPoint} и {this.endingPoint},
          проходящего через пункт {this.mediumPoint}. Передвигаться можно только по дорогам, протяжённость
          которых указана в таблице. Каждый пункт можно посетить только один раз.
        </p>
      </div>
    )
  }
}

export default Excercise4