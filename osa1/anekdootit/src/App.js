import { useState, useEffect } from 'react'


const Button = (props) => (

  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Anecdotes = (props) => {
  return (
    <p>
      {props.anecdote}</p>
  )
}

const Text = (props) => {
  return(
    <p>{props.text} {props.votes}</p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([])

  useEffect(() => {
  var n = anecdotes.length 
  setPoints(Array(n).fill(0))
  console.log(points)
  }, [])


  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)     
    console.log(copy)
    
  }

  const handleClick = () => {
    setSelected(getRandomInt(8));
  }

  return (
    <div>
      <Anecdotes anecdote={anecdotes[selected]} />
      <Text text="has votes" votes={points[selected]}/>
      <Button handleClick={handleVote} text="vote" votes={points[selected]}/>
      <Button handleClick={handleClick} text="next" points={points}/>
    </div>
  )
}

export default App