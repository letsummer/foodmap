import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tweets from "./Tweets";
import styles from "../css/Place.module.css";

function Place(){
    const { id } = useParams();
    // console.log(`id: `, {id});
    // Tweets(id);
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
        <div className={styles.tableCase}>
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
                    <th>링크</th>
                    <td className={styles.mapLink}><a href={detail.info}>{detail.info}</a></td>
                </tr>
                <tr>
                    <th>추천트윗</th>
                    <td><Tweets id={id}></Tweets></td>
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