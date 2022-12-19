import React from "react";



const LandingFrame = () => {

    return <div className="bg-gradient-to-l md:bg-gradient-to-r h-[100%] w-[100%]"><LandingFrameMessage /></div>
}

const LandingFrameMessage = () => {
    const style = {
        margin: "auto",
        padding: "10% 35% 10% 15%",
        color: "white"
    }
    return <div style={style}>
        
        <div className="font-[96px]">
            Hello World!!
        </div>
        
        <div className="font-[36px]">
            This is the landing page and here's some content.
            How much wood would a woodchuck chuck 
            if a woodchuck would chuck wood?
        </div>
        <br />
    </div>
}

export const Landing = () => {
    return <div>
        <LandingFrame />
    </div>
    
}
