import { useEffect, useMemo, useState} from "react";

export default function Assignment2(){
    const words = ['Hi', 'sunny', 'cat', 'mouse', 'buffalo', 'yes', 'ok']
    const totalLines = 100
    const lines = useMemo(()=>{
        let result=[]
        for(let i=0;i<totalLines;i++){
            let sentence=""
            for(let j=0;j<words.length;j++){
                sentence+=words[Math.floor(Math.random()*words.length)]
                sentence+=" "
            }
            result.push(sentence)
        }
        return result
    },[])

    const [filter,setFilter]=useState("")
    const [filteredSentences,setFilteredSentences]=useState([])

    useEffect(()=>{
        setFilteredSentences(lines.filter((line=>line.toLowerCase().includes(filter.toLowerCase()))))
    },[filter])


    const [items, setItems] = useState([
        {
            name:"apple",price:2
        },
        {
            name:"mango",price:3
        },
        {
            name:"litchi",price:5
        },
        {
            name:"melon",price:2
        },
    ])

    const total = useMemo(items.reduce((sum,item)=>sum+item.price,0),[])
    console.log("total ", total);
    return(
        <>
            <input type="text" placeholder="Enter filter ..." value={filter} onChange={(e)=>setFilter(e.target.value)}/>
            {
                filter && filter!=""? 
                <div>
                    {filteredSentences.map((line,index)=>
                        <div>
                            {line}
                        </div>
                    )}
                </div>
                :
                <div>
                    {lines.map((line,index)=>
                        <div>
                            {line}
                        </div>
                    )}
                </div>
            }    
        </>
    )
}