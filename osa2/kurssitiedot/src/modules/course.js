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

export default Course