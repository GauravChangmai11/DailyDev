import { createContext } from "react";

export const UserContext = createContext({
    name:"",
    address:"",
    setName: ()=>{},
    setAddress: ()=>{}
})