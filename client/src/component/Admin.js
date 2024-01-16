import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

function Grid({item}) {

    const urls = ["https://twitter.com/youaremywiz/status/1704132099043934339", 
    "https://twitter.com/dalgingO227/status/1701981015340953813",
    "https://twitter.com/dalgingO227/status/1701981015340953813",
    ];

    // useEffect(()=>{
    //     // console.log(`useEffect!`);    
    // });

    // console.log(urls);
    // console.log(item);
    return (
        // urls.map((item, index)=>(
            <div>
                <blockquote id="tweets" class="twitter-tweet">
                    <a href={item}></a>
                </blockquote>
            </div>
        // ))
    )
}


function Admin({isLogin}) {
    
    return(
        <div>
            {isLogin? 
                <div>HI!</div>
            : <Login/>}
        </div>
    )
}

export default Admin;