import React from "react";

export const SearchBar = ()=>{
    return(
        <div>
            <div className="hidden sm:flex bg-slate-600 rounded-3xl  p-1 pl-5 pr-2 w-[35vw]">
                <input className="w-full outline-none text-white" type="text" placeholder="Search">
                </input>
                <button className="bg-slate-600 text-gray-400 font-bold rounded py-2 px-4 cursor-pointer" onClick={()=>{console.log("clicked");}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </div>
            <div className="block sm:hidden">
                <button className="bg-slate-600 text-gray-400 font-bold rounded py-2 px-4 cursor-pointer" onClick={()=>{console.log("clicked");}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>

            </div>
        </div>
    )
}