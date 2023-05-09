import { useState } from 'react'


const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value()}</td>
  </tr>
)


const Button = ({ text, state, assign }) => {
  const handler = () => {
    assign(1 + state);
  }
  
  return <button onClick={handler}>{text}</button>
}


const Statistics = ({ states }) => {
  const { good, neutral, bad } = states

  const makeAccessor = (state) => () => state
  const all = () => (good + neutral + bad)
  const average = () => (all() / 3.0)
  const positive = () => (100.0 * good / all() + " %")

  const wrap = (content) => (
    <div>
      <h1>statistics</h1>
      {content}
    </div>
  )

  if (0 === all())
    return wrap(<div>No feedbacks given</div>)
  else
  {
    return wrap(<table>
      <tbody>
        <StatisticLine text="good" value={makeAccessor(good)}/>
        <StatisticLine text="neutral" value={makeAccessor(neutral)}/>
        <StatisticLine text="bad" value={makeAccessor(bad)}/>
        <StatisticLine text="all" value={all}/>
        <StatisticLine text="average" value={average}/>
        <StatisticLine text="positive" value={positive}/>
      </tbody>
    </table>)
  }
}


const GiveFeedback = ({ states }) => {
  const { good, setGood, neutral, setNeutral, bad, setBad } = states
  return <div>
    <h1>give feedback</h1>
    <Button text="good" state={good} assign={setGood}/>
    <Button text="neutral" state={neutral} assign={setNeutral}/>
    <Button text="bad" state={bad} assign={setBad}/>
  </div>
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return <div>
    <GiveFeedback states={{good, setGood, neutral, setNeutral, bad, setBad}}/>
    <Statistics states={{good, neutral, bad}}/>
  </div>
}

export default App
