import Count from "./count";
import { EvenOdd } from "./EvenOdd";
import UpdateCount from "./updateCount";

export default function Game(){
    console.log("renrenderd!!");
    return(
        <>
            <Count/>
            <UpdateCount/>
            <EvenOdd/>
        </>
    )
}