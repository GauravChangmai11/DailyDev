import React from 'react'
import './App.css'
import VideoGrid from './components/VideoGrid'
import { AppBar } from './components/AppBar'

function App() {

  return (
    <>
      <div className='flex justify-around'>
        <div style={{background:"green"}}>Lorem ipsum dolor sit amet.</div>
        <div style={{background:"red"}}>Lorem ipsum dolor sit amet.</div>
        <div style={{background:"pink"}}>Lorem ipsum dolor sit amet.</div>
      </div>
      <br/>
      <div className='grid grid-cols-6 gap-2'>
        <div className='col-span-2 bg-green-300'>Lorem ipsum dolor sit amet.</div>
        <div className='col-span-2 bg-red-400'>Lorem ipsum dolor sit amet.</div>
        <div className='col-span-1 bg-yellow-400'>Lorem ipsum dolor sit amet.</div>
      </div>
      <div className='text-center sm:text-right bg-slate-500 text-blue-300 text-lg border-lg'>Testing Responsiveness</div>
      <br/>
      <br/>
      <br/>
      <AppBar/>
      <VideoGrid/>
   </>
  )
}

export default App
