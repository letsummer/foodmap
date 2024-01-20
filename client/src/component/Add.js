import { useState } from "react"
import Form from "./Form.js";
import Twitter from "./Twitter.js";

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
        </div>
    );
}

export default Add;