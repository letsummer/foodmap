import axios from "axios";
import { useState, useEffect, createElement } from "react"
import Form from "./Form.js";
import Test from "./Test.js";

function Url(){
    const urls = ["https://twitter.com/youaremywiz/status/1704132099043934339", 
        "https://twitter.com/dalgingO227/status/1701981015340953813"];

    urls.forEach((link)=>{
        console.log(link);
    });

    return(
        urls.map((item, index)=>(
            <blockquote id="tweets" class="twitter-tweet">
                <a href={item}></a>
            </blockquote>
        ))
    );
}

function Twit(){
    const url = "https://twitter.com/youaremywiz/status/1704132099043934339";
    fetch(url, {
        method: 'GET',
    })
  .then(response => {
    if (response.ok) {
        console.log(`response: `, response);
      console.log('Image URL is valid');
    } else {
        console.log(`response: `, response);
        console.log('Image URL is invalid');
    }
  })
  .catch(error => {
    console.error('Error validating image URL:', error);
  });
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
    const [isCheck, setCheck] = useState(false);

    const onChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setPlace(search);
        setSearch("");
    }

    const isChecked = (e) =>{
        setCheck(e.target.checked);
    }

    return(
        <div>
            <form id="keywordSearch" onSubmit={handleSubmit}>
                키워드: <input type="text" onChange={onChange} value={search} id="keyword" size="15"/>
                <button type="submit">검색</button>
            </form>
            <span>직접 지정할게요. <input type="checkbox" name="" id="" onClick={isChecked}/></span>
            <Form isCheck={isCheck} searchPlace={place}></Form>
            <hr /> 
            {/* <Test isCheck={isCheck}></Test>         */}
            {/* <Twit></Twit> */}
        </div>
    );
}

export default Add;