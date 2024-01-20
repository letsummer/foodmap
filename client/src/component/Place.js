import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../css/Place.module.css";

function Url(){
    const { id } = useParams();
    // let tweets = [];
    const [tweets, setTweets] = useState([]);

    const placePage = async () =>{
        await fetch(`${process.env.REACT_APP_SERVER_URL}/api/place/${id}`)
        .then((response) => response.json())
        .then((data) => {
            // console.log(`data twit: `, data.twit);
            setTweets(data.twit);
            // return tweets.splice(0, 0, data.twit);
        })
        .catch((error)=>console.log(error));
    }
    useEffect(()=>{
        placePage();
    }, []);

    console.log(`tweets: `, tweets);
    
    const urls = ["https://twitter.com/youaremywiz/status/1704132099043934339", 
    "https://twitter.com/dalgingO227/status/1701981015340953813",
    "https://twitter.com/dalgingO227/status/1701981015340953813",
    ];
    console.log(`url: `, urls);

    // urls.forEach((link)=>{
    //     // console.log(link);
    // });


    
    return(
        <div className={styles.twitGrid}>
        {
            tweets.map((item, index)=>(
                <div className={styles.innerTweets}>
                    <blockquote id="tweets" class="twitter-tweet">
                        <a href={item}></a>
                    </blockquote>
                </div>
            ))
        }
        </div>
        
    );
}

function Place(){
    const { id } = useParams();
    const [detail, setDetail] = useState([]);

    const placePage = () =>{
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/place/${id}`)
        .then((response) => response.json())
        .then((json) => setDetail(json))
        .catch((error)=>console.log(error));
    }

    // console.log(information.name);

    useEffect(() => {
        placePage();
    }, []);
    return(
        <div>Place!
            <table>
                <tr>
                    <th>가게명</th>
                    <td>{detail.name}</td>
                </tr>
                <tr>
                    <th>주소</th>
                    <td>{detail.address}</td>
                </tr>
                <tr>
                    <th>연락처</th>
                    <td>{detail.phone}</td>
                </tr>
                <tr>
                    <th>카카오맵 정보</th>
                    <td><a href={detail.info}>{detail.info}</a></td>
                </tr>
                <tr>
                    <th>추천트윗</th>
                    <td><Url></Url></td>
                </tr>
                <tr>
                    <th>생성일</th>
                    <td></td>
                </tr>
            </table>
        </div>
    );
}

export default Place;