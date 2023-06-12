import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Stats = props => {
  if (props.text=='positive'){
    return(
    <div>
      <p>{props.text} {props.number} %</p>
    </div>    
    )
  }
  return (
    <div>
      <p>{props.text} {props.number}</p>
    </div>
  )
}

const Statistics = (props) => {
  const sum = props.clicks.good + props.clicks.neutral + props.clicks.bad
  console.log(props)
  if (sum==0){
    return (
      <div>
      <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <Stats text='good' number={props.clicks.good}/>
      <Stats text='neutral' number={props.clicks.neutral}/>
      <Stats text='bad' number={props.clicks.bad} />
      <Stats text='all' number={sum}/>
      <Stats text='average' number={(props.clicks.good*1 + props.clicks.bad*(-1))/(sum)}/>
      <Stats text='positive' number={(props.clicks.good)/(sum)*100} />
    </div>
  )
}


const App = () => {
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const handleGoodClick = () => {
    setClicks({ ...clicks, good: clicks.good + 1 })
  }

  const handleNeutralClick = () => {
    setClicks({ ...clicks, neutral: clicks.neutral + 1 })
  }

  const handleBadClick = () => {
    setClicks({ ...clicks, bad: clicks.bad + 1 })
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <h1>Statistics</h1>
      <Statistics clicks={clicks}/>
    </div>
  )
}

export default App