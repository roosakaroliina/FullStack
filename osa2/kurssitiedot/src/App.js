const Course = (props) => {
  return (
    <div>
      {props.courses.map(course =>
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
        )}
    </div>
  )
}

const Header = (props) => {
  return (
    <h2>{props.course}</h2>
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
      {props.parts.map((part, id) => 
      <Part key={id} name={part.name} exercises={part.exercises} />
    )}
    </div>
  )
}


const App = () => {
  const courses = [
    {
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
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return (
    <div>
      <Course courses={courses} />
    </div>
  )
}

export default App