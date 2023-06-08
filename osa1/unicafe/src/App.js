import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setAll(bad + neutral + updatedGood)
    setAverage((bad*(-1) + updatedGood * 1)/(all+1))
    setPositive(updatedGood / (all+1) * 100)

  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setAll(bad + updatedNeutral + good)
    setAverage((bad*(-1) + good * 1)/(all+1))
    setPositive(good / (all+1) * 100)

  }
  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setAll(updatedBad + neutral + good)
    setAverage((updatedBad*(-1) + good * 1)/(all+1))
    setPositive(good / (all+1) * 100)

  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p> average {average} </p>
      <p>positive {positive} % </p>
    </div>
  )
}

export default App