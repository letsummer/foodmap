import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Grid({item}) {

    const urls = ["https://twitter.com/youaremywiz/status/1704132099043934339", 
    "https://twitter.com/dalgingO227/status/1701981015340953813",
    "https://twitter.com/dalgingO227/status/1701981015340953813",
    ];

    useEffect(()=>{
        console.log(`useEffect!`);    
    });

    // console.log(urls);
    console.log(item);
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

function Admin() {
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const clkSubmit = ()=>{
        console.log(`click!`);
        
        return navigate("/admin/checklist");
    }
    
    const testFunc = (e)=>{
        setContent(e.target.value);
        console.log(e.target.value);
    }
    
    return(
        <div>
            {/* <form> */}
                아이디: <input type="text" />
                패스워드: <input type="password" />
                <button onClick={clkSubmit} type="submit">제출</button>
                <input type="text" value={content} onChange={testFunc}/>
            {/* </form> */}
            <Grid item={content}></Grid>
        </div>
    )
}

export default Admin;