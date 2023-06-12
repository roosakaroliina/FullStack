import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = props => {
  if (props.text=='positive'){
    return(
      <table>
        <tbody>
          <tr><td>{props.text} {props.number} %</td></tr> 
        </tbody>
      </table>  
    )
  }
  return (
    <table>
    <tbody>
      <tr><td>{props.text} {props.number}</td></tr> 
    </tbody>
  </table>  
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
      <StatisticLine text='good' number={props.clicks.good}/>
      <StatisticLine text='neutral' number={props.clicks.neutral}/>
      <StatisticLine text='bad' number={props.clicks.bad} />
      <StatisticLine text='all' number={sum}/>
      <StatisticLine text='average' number={(props.clicks.good*1 + props.clicks.bad*(-1))/(sum)}/>
      <StatisticLine text='positive' number={(props.clicks.good)/(sum)*100} />
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