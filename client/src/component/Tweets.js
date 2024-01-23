import { useState, useEffect, useParams } from "react";
import styles from "../css/Place.module.css";

function Tweets({id, isEdit}){
    // const { id } = useParams();
    // let tweets = [];
    const [loading, setLoading] = useState(false);
    const [tweets, setTweets] = useState([]);
    const [list, setList] = useState([]);

    const placePage = async () =>{
        await fetch(`${process.env.REACT_APP_SERVER_URL}/api/place/${id}`)
        .then((response) => response.json())
        .then((data) => {
            // console.log(`data twit: `, data.twit);
            setTweets(data.twit);
            setLoading(true);
            // return tweets.splice(0, 0, data.twit);
        })
        // .then(()=>setLoading(true))
        .catch((error)=>console.log(error));
    }

    const deleteBtn = (isChecked, id) =>{
        console.log(`id: `, id);
        if(isChecked){
            // console.log(`checked? `, isChecked);
            setList((prev)=>[...prev, id]);
            
        }
        else
            setList(list.filter((index) => index !== id));
    }

    // const deleteBtn = (key) =>{
    //     console.log(`key: `, key);
    //     // setList([...list, key]);
    //     setList(list.filter((item, listIndex) => key !== listIndex));
    // }
    console.log(`list: `, list);

    useEffect(()=>{
        placePage();
        console.log(`loading: `, loading);
    }, []);

    // console.log(`tweets: `, tweets);
    
    // const urls = ["https://twitter.com/youaremywiz/status/1704132099043934339", 
    // "https://twitter.com/dalgingO227/status/1701981015340953813",
    // "https://twitter.com/dalgingO227/status/1701981015340953813",
    // ];
    // console.log(`url: `, urls);

    // urls.forEach((link)=>{
    //     // console.log(link);
    // });
    useEffect(()=>{
        // const script = document.createElement("script");
        // script.src = "https://platform.twitter.com/widgets.js";
        // script.async = true;
        // document.body.appendChild(script);
    });

    
    return(
        <div className={styles.twitGrid}>
        { loading?  
            tweets.map((item, index)=>(
                <div className={styles.innerTweets} key={index}>
                    {isEdit?
                        <input type="checkbox" id={index} onChange={(e)=>deleteBtn(e.target.checked, e.target.id)}/>
                    : ""}
                    
                    <label htmlFor={index} className={styles.innerTweet}>
                        <blockquote id="tweets" class="twitter-tweet">
                            <a href={item}></a>
                        </blockquote>
                    </label>
                </div>
            ))
            : "loading..."
        }
        </div>
        
    );
}

export default Tweets;