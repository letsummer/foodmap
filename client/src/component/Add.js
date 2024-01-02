import axios from "axios";
import { useState, useEffect } from "react"
import Map from "./Map.js";

function test(){
    const url = "https://twitter.com/youaremywiz/status/1704132099043934339";
    fetch("https://twitter.com/youaremywiz/status/1704132099043934339",{
        method:"GET"
    })
    .then((res) => {
        console.log(res.status)
    });
    // axios(url)
    // .then((res)=>{
    //     console.log(res.json());
    // })   
}

function Twit(){
    test();

    return(
        <div>Twitter링크
            <input type="text" />
            <button>미리보기</button>
        </div>
    );
}

function Add(){
    const [search, setSearch] = useState("");
    const [place, setPlace] = useState("");

    const onChange = (e) => {
        setSearch(e.target.value);
        console.log(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setPlace(search);
        setSearch("");
        console.log(`clicked handleSubmit!`);
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                키워드: <input type="text" onChange={onChange} value={search} id="keyword" size="15"/>
                <button type="submit">검색</button>
            </form>
            <hr />
            <Map searchPlace={place}></Map>
            <Twit></Twit>
            <blockquote class="twitter-tweet">
                <a href="https://twitter.com/youaremywiz/status/1704132099043934339"></a>
            </blockquote>
        </div>
    );
}

export default Add;