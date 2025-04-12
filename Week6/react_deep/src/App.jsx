import React, { useEffect } from 'react'
import { useState } from 'react'
import Header2 from "./components/Header"
import TodoItem from './components/Todo'

import './App.css'

function App() {
  const [title, setTitle] = useState("Hello World")
  const [todoId, setTodoId] = useState()

  function updateTitle(){
    setTitle("Your new number is "+ Math.random())
  }

  const [todos,setTodos] = useState([
    {
      id:1,
      title: "Hit Gym",
      description: "stay active"
    },
    {
      id:2,
      title: "Buy groceries",
      description: "food to live"
    },
    {
      id:3,
      title: "Read",
      description: "learn something new"
    },
  ])

  const setTodo = (e)=>{
    if(e.target.value){
    }
    setTodoId(e.target.value)
  }


  return (
    <>
      {/* <button onClick={updateTitle}>Update Todo</button>
      <Header title={title}></Header>
      <Header title="Hello World"></Header>
      <Header title="Hello World"></Header>
      <Header title="Hello World"></Header> */}
      <input placeholder='Enter todo Id' onChange={(e)=>setTodo(e)} value={todoId}/>
      <TodoItem id={todoId}/>
      <Header2/>

      {todos.map((todo)=>
        <Todo key={todo.id} todo={todo}></Todo>
      )}

      <Wrapper>
        <div>{title}</div>
      </Wrapper>
      <Wrapper>
        hi
      </Wrapper>
    </>
  )
}


const Header = React.memo(function Header({title}){
  return(
    <>
      <div>{title}</div>
    </>
  )
})

const Todo=React.memo(function Todo({todo}){
  return(
    <>
      <div>{todo.title}</div>
      <div>{todo.description}</div>
    </>
  )
})

const Wrapper = ({children})=>{
  return(
    <div style={{backgroundColor:"pink", padding:"14px"}}>
      {children}
    </div>
  )
}

export default App
