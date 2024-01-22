import { useState } from "react"
import styles from "../css/Edit.module.css";

function Twitter(){
    const [tweet, setTweet] = useState("");
    const [list, setList] = useState([]);

    const onChangeTweet = (e)=>{
        setTweet(e.target.value);
        console.log(e.target.value);
    }
    const addBtn = ()=>{
        
        setList([...list, tweet]);
    }
    const deleteBtn = (key) =>{
        // console.log(`key: `, key);
        setList(list.filter((item, listIndex) => key !== listIndex));
        // console.log(`list: `, list);
    }
    // console.log(`list: `, list);

    return(
        <div className={styles.addTweets}>
            <input type="text" onChange={onChangeTweet} value={tweet} placeholder="예) https://twitter.com/username/status/1234567890"/>
            <button onClick={addBtn}>추가</button>
                {list.map((item, index)=>
                    <div key={index}>
                        <span>{item}</span>
                        <button onClick={()=>deleteBtn(index)}>삭제</button>
                    </div>
                )}
        </div>
    )
}

export default Twitter;