import { useContext } from "react"
import { UserContext } from "./UserContext"

export default function UserAddress(){
    const {name, address} = useContext(UserContext)
    return(
        <div>
            Hi {name}, you stay in {address}
        </div>
    )
}