const Header = (props) => (
  <h1>{props.course.name}</h1>
)


const Part = (props) => (
	<p>{props.partName} {props.exercises}</p>
)


const Content = (props) => (
	props.course.parts.map(x => <Part key={x.name} partName={x.name} exercises={x.exercises}/>)
)


const Total = (props) => (
  <p>Number of exercises {props.course.parts.reduce((acc, curr) => acc + curr.exercises, 0)}</p>
)


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default App
