import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [todos,setTodos] = useState([
    {
      title: "Gym",
      description: "Hit the gym"
    },
    {
      title: "Book",
      description: "Read a book"
    }
  ])

  return (
    <>
    <button onClick={()=>setCount((count)=>count+1)}>count is {count}</button>
    {todos.map((item)=>{
      return <Todo title={item.title} description={item.description}/>
    })}
    </>
  )
}

function Todo(props){
  return (
    <>
      <h1>{props.title}</h1>
      <h1>{props.description}</h1>
    </>
  )
}

export default App
