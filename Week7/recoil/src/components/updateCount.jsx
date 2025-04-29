import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { countAtom } from "../stores/atoms/countAtom";

export default function UpdateCount(){
    const setCount = useSetRecoilState(countAtom)
    console.log("re-rendering buttons !!");

    return(
        <>
            <div>
                <button onClick={()=>setCount(count=>count-1)}>Decrement Count</button>
                <button onClick={()=>setCount(count=>count+1)}>Increment Count</button>
            </div>
        </>
    )
}