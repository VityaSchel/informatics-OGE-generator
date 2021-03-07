import React from 'react'
import utils from '../../utils.js'

class Excercise6 extends React.Component {
  constructor (props){
    super(props);

    this.generateExcerciseData()
  }

  generateExcerciseData(){
    const comparionTypes = ['>', '>=', '<', '<=', '==']
    const min = -5, max = 20

    this.condition1 = {
      comparison: comparionTypes[Math.floor(Math.random()*5)],
      with: utils.random(min, max)
    }

    this.condition2 = {
      comparison: comparionTypes[Math.floor(Math.random()*5)],
      with: utils.random(min, max)
    }

    this.conditionsComparison = ['and', 'or'][Math.floor(Math.random()*2)]

    this.neededOutput = ['YES', 'NO'][Math.floor(Math.random()*2)]

    this.executionsCount = utils.random(5, 15)
    this.executions = Array(this.executionsCount).fill([])
    this.executionsOutput = []
    for(let i = 0; i < this.executions.length; i++){
      let input1 = utils.random(min, max)
      let input2 = utils.random(min, max)
      this.executions[i] = [input1, input2]

      let condition1true = eval(input1 + this.condition1.comparison + this.condition1.with);
      let condition2true = eval(input2 + this.condition2.comparison + this.condition2.with);

      if (this.conditionsComparison === 'and'){
        if (condition1true && condition2true){
          this.executionsOutput.push('YES')
        } else {
          this.executionsOutput.push('NO')
        }
      } else if (this.conditionsComparison === 'or'){
        if (condition1true || condition2true){
          this.executionsOutput.push('YES')
        } else {
          this.executionsOutput.push('NO')
        }
      }
    }
    this.answer = this.executionsOutput.filter(output => output === this.neededOutput).length
    this.executions = this.executions.map(execution => `(${execution[0]}, ${execution[1]})`).join('; ')
  }

  render(){
    return (
      <div>
        <p>Ниже приведена программа, записанная на трёх языках программирования.</p>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Алгоритмический язык</th>
              <th scope="col">Pascal</th>
              <th scope="col">Python</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <pre><code>
                        алг
                  {'\n'}нач
                  {'\n'}цел s, t
                  {'\n'}ввод s
                  {'\n'}ввод t
                  {'\n'}если s {this.condition1.comparison} {this.condition1.with} {this.conditionsComparison==='and'?'и':'или'} t {this.condition2.comparison} {this.condition2.with}
                  {'\n'}то вывод "YES"
                  {'\n'}иначе вывод "NO"
                  {'\n'}все
                  {'\n'}кон
                </code></pre>
              </td>
              <td>
                <pre><code>
                        var s, t: integer;
                  {'\n'}begin
                  {'\n'}readln(s);
                  {'\n'}readln(t);
                  {'\n'}if (s {this.condition1.comparison} {this.condition1.with}) {this.conditionsComparison} (t {this.condition2.comparison} {this.condition2.with})
                  {'\n'}then
                  {'\n  '}writeln("YES")
                  {'\n'}else
                  {'\n  '}writeln("NO")
                  {'\n'}end.
                </code></pre>
              </td>
              <td>
                <pre><code>
                        s = int(input())
                  {'\n'}t = int(input())
                  {'\n'}if (s {this.condition1.comparison} {this.condition1.with}) {this.conditionsComparison} (t {this.condition2.comparison} {this.condition2.with}):
                  {'\n  '}print("YES")
                  {'\n'}else:
                  {'\n  '}print("NO")
                </code></pre>
              </td>
            </tr>
          </tbody>
        </table>
        <p>Было проведено {this.executionsCount} запусков программы, при которых в качестве значений переменных вводились следующие пары чисел (s, t):</p>
        <p>{this.executions}. Сколько было запусков, при которых программа напечатала «{this.neededOutput}»?</p>
      </div>
    )
  }
}

export default Excercise6