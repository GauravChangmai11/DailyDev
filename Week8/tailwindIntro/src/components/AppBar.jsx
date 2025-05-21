import React from "react"
import { SearchBar } from "./SearchBar"
export const AppBar = ()=>{

    return(
        <div className="flex justify-between">
            <div className="items-center inline-flex pb-2 text-md">
                Youtube Logo
            </div>
            <div>
                <SearchBar/>
            </div>
            <div className="items-center inline-flex pb-2">
                Sign In
            </div>
        </div>
    )
}