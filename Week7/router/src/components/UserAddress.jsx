import { useContext, useState } from "react"
import { UserContext } from "./UserContext"

export default function UserAddress(){
    const {name, address, setAddress} = useContext(UserContext)
    const [newAddress, setNewAddress] = useState("")

    const changeAddress = (e)=>{
        if(e.key==="Enter"){
            setAddress(e.target.value)
            setNewAddress("")
        }
    }
    return(
        <div>
            <div>
                Hi {name}, you stay in {address}
            </div>
            <input placeholder="Enter new Address" onKeyDown={(e)=>changeAddress(e)} value={newAddress} onChange={(e)=>setNewAddress(e.target.value)}/>
        </div>
    )
}