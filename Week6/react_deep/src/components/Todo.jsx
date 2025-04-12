import { useEffect, useState } from "react"


export default function TodoItem({id}){

    const [todo,setTodo]=useState({
        title: "temp",
        desc: "test"
    })

    // not recommended to make such an async call inside useEffect like this one.
    useEffect(()=>{
        const fetchData = async ()=>{
            const res = await fetch(`http://localhost:3000/getTodo?id=${id}&username=username&password=password`,{method:"GET"})
            const parsedRes = await res.json()
            if(parsedRes.data){
                setTodo(parsedRes.data[0])
            }
        }
        if(id){
            fetchData()
        }
    },[id])

    useEffect(()=>{
        console.log("todo 1",todo);
    },[todo])

    return(
        <>
            <div style={{backgroundColor:"purple"}}>
                <div>{todo.title}</div>
                <div>{todo.desc}</div>
            </div>
        </>
    )
}