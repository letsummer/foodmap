import { useState, useEffect } from "react"
import Map from "./Map.js";

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
        </div>
    );
}

export default Add;