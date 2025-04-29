import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div style={{}}>
        <div style={{background:"green"}}>Lorem ipsum dolor sit amet.</div>
        <div style={{background:"red"}}>Lorem ipsum dolor sit amet.</div>
        <div style={{background:"pink"}}>Lorem ipsum dolor sit amet.</div>
      </div>
   </>
  )
}

export default App
