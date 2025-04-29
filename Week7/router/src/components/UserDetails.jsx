import { useContext } from "react"
import { UserContext } from "./UserContext"

export default function UserDetails(){
    const {name} = useContext(UserContext)
    return(
        <div>
            Hello There {name}
            
        </div>
    )
}