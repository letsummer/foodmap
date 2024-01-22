import { useState } from "react"
import Search from "./Search.js";
import Twitter from "./Twitter.js";
import styles from "../css/Add.module.css";

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
        setPlace("")
    }

    return(
        <div>
            <form className={styles.form} id="keywordSearch" onSubmit={handleSubmit}>
                검색어: <input type="text" onChange={onChange} value={search} id="keyword" size="15"/>
                <button className={styles.searchBtn} type="submit">검색</button>
                <div className={styles.checkbox}><input type="checkbox" name="" id="" onClick={isChecked}/>직접 지정할게요.</div>
            </form>
            <Search isCheck={isCheck} searchPlace={place}></Search>
        </div>
    );
}

export default Add;