import { useEffect, useState } from "react";

export default function Header({children}){
    const [data, setData] = useState("Hello World")
     const updateTitle = ()=>{
        setData("A new Random number is "+Math.random())
     }

     useEffect(()=>{
        // setInterval(()=>{
            fetch("https://daily-dev-gaurav-changmais-projects.vercel.app/sendJson?username=username&password=password")
                .then(async (res)=>{
                const data = await res.json()
                setData("My name is "+data.name+" and total requests made is "+data.requestCount)
            })  
        // },10000)
      },[])

    return(
    <>
        <button onClick={updateTitle}>Click Me</button>
        <div>{data}</div>
        <div>Hello World</div>
    </>
    )
}
