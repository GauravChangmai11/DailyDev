import { useEffect, useState } from 'react'
import './App.css'
import { connect_db } from './utils'

function App() {
  const [count, setCount] = useState(0)

  const connect_to_db = async ()=>{
    const db = await connect_db()
    return db
  }

  useEffect(()=>{
    const db = connect_to_db()
  },[])

  return (
   <>
   </>
  )
}

export default App
