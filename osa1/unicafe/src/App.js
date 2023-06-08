import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  console.log(props)
  return (
    <div>
      <p>{props.text} {props.number}</p>

    </div>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)


  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)


  }
  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)

  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <h1>Statistics</h1>
      <Statistics text='good' number={good}/>
      <Statistics text='neutral' number={neutral} />
      <Statistics text='bad' number={bad} />
      <Statistics text='all' number={good+neutral+bad}/>
      <Statistics text='average' number={(good*1 + bad*(-1))/(good+neutral+bad)}/>
      <Statistics text='positive' number={(good)/(good+neutral+bad)}/>

    </div>
  )
}

export default App