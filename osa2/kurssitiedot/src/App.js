const Course = (props) => {
  const header = props.course.name
  const parts = props.course.parts
  return (
    <div>
      <Header course={header} />
      <Content parts={parts} />
      <Total parts={parts} />
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

const Total = (props) => {
  console.log("part",props)
  var totalAmount = props.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      <strong>total of {totalAmount} exercises</strong>
    </div>
  )
}
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
    <div>
      {props.parts.map(({name, exercises, id}) => (
      <Part key={id} name={name} exercises={exercises} />
    ))}
    </div>
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
        name: 'Another test course',
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