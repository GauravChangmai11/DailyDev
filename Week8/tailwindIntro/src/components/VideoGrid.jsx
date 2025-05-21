import React from "react";
import { useMemo } from "react";
import VideoCard from "./VideoCard";

export default function VideoGrid(){

const Videos = useMemo(()=>[
            {
                image:"vidImage.jpg",
                thumbImage:"thumbnail.jpg",
                title:"Pushing to Ultimate Champion",
                channelName:"Juicy J",
                views:"1.2k views",
                timestamp:"2 hours ago"
            },
            {
                image:"vidImage.jpg",
                thumbImage:"thumbnail.jpg",
                title:"Pushing to Ultimate Champion",
                channelName:"Juicy J",
                views:"1.2k views",
                timestamp:"2 hours ago"
            },
            {
                image:"vidImage.jpg",
                thumbImage:"thumbnail.jpg",
                title:"Pushing to Ultimate Champion",
                channelName:"Juicy J",
                views:"1.2k views",
                timestamp:"2 hours ago"
            },
            {
                image:"vidImage.jpg",
                thumbImage:"thumbnail.jpg",
                title:"Pushing to Ultimate Champion",
                channelName:"Juicy J",
                views:"1.2k views",
                timestamp:"2 hours ago"
            },
            {
                image:"vidImage.jpg",
                thumbImage:"thumbnail.jpg",
                title:"Pushing to Ultimate Champion",
                channelName:"Juicy J",
                views:"1.2k views",
                timestamp:"2 hours ago"
            },
            {
                image:"vidImage.jpg",
                thumbImage:"thumbnail.jpg",
                title:"Pushing to Ultimate Champion",
                channelName:"Juicy J",
                views:"1.2k views",
                timestamp:"2 hours ago"
            },
],[])


return(
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Videos.map((video,index)=>{
            return(
                <div >
                    <VideoCard image={video.image} thumbImage={video.thumbImage} title={video.title} channelName={video.channelName} views={video.views} timestamp={video.timestamp}/>
                </div>
            )
        })}
    </div>
)

}