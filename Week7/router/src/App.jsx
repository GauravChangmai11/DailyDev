import React ,{ Suspense, useState } from 'react'
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'
const LazyUserDetails = React.lazy(()=>import ('./components/UserDetails'))
const LazyUserAddress = React.lazy(()=> import("./components/UserAddress"))
import { UserContext } from './components/UserContext'

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState("Rahul Gogoi")
  const [address, setAddress] = useState("Mumbai")

  // const routes = [{
  //   route:"/user",
  //   Component: UserDetails
  // }]

  return (
    <>
      <BrowserRouter>
          <UserContext.Provider value={{name, address}}>
        <AppNavigation/>
        <Routes>
            <Route path='/' element={<Suspense fallback={"Loading User Details ..."}><LazyUserDetails name={"Raju"}/></Suspense>}/>
            <Route path='/address' element={<Suspense fallback={"Loading Address ..."}><LazyUserAddress name={"Raju"} address={"Narengi"}/></Suspense>}/>
        </Routes>
        </UserContext.Provider>
      </BrowserRouter> 
    </>
  )
}

function AppNavigation(){
  const navigate = useNavigate()
  return(
    <div>
      <button onClick={()=>navigate("/")}>Navigate to Home</button>
      <button onClick={()=>navigate("/address")}>Navigate to Address</button>
    </div>
  )
}

export default App
