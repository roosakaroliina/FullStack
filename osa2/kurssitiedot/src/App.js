const Course = (props) => {
  const header = props.course.name
  const parts = props.course.parts
  return (
    <div>
      <Header course={header} />
      {parts.map(part => 
        <Content key={part.id} part={part} />
      )}
    </div>
  )
}

const Header = (props) => {
  //console.log(props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

// const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        {props.name} {props.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <Part name={props.part.name} exercises={props.part.exercises} />
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Test course',
        exercises: 12,
        id: 4
      },
      {
        name: 'Test course ',
        exercises: 3,
        id: 5
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App