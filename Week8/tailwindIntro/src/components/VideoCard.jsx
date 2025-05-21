import React from "react"

export default function VideoCard(props){

    return(
        <div className="p-1 cursor-pointer">
            <img src={props.image} className="w-full rounded-2xl"></img>
            <div className="grid grid-cols-12 pt-2 pl-2">
                <div className="col-span-2 flex justify-center">
                    <img src={props.thumbImage} className="rounded-full text-center"></img>
                </div>
                <div className="col-span-10">
                    <div>
                        {props.title}
                    </div>
                    <div className="text-gray-400 text-sm">
                        {/* Starter Story */}
                        {props.channelName}
                    </div>
                    <div className="text-gray-400 text-sm">
                        {props.views} | {props.timestamp}
                    </div>
                </div>
            </div>
        </div>
    )
}