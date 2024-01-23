import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tweets from "./Tweets.js";
import Twitter from "./Twitter.js";
import styles from "../css/Place.module.css";
import editStyle from "../css/Edit.module.css";

function Edit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [edit, setEdit] = useState([]);

    const [name, setName] = useState(edit.name);
    const [addr, setAddr] = useState(edit.address);
    const [phone, setPhone] = useState(edit.phone);
    const [coord, setCoord] = useState(edit.coord);
    const [tweets, setTweets] = useState(edit.twit);
    // console.log(edit.coord);
    // console.log(edit.name);

    

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangePhone = (e) => {
        setPhone(e.target.value);
    }

    const updatedData = {
        id,
        name,
        phone
    }

    const getEditpage = () =>{
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/place/${id}`)
        .then((response) => response.json())
        .then((json) => {
            setEdit(json);
            // console.log(`json: `,json.twit);
        })
        .catch((error)=>console.log(error));
    }

    // console.log(information.name);

    const submitBtn = (item)=>{
        // e.preventDefault();
        // console.log(`clicked!`);

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/place/${id}/edit`,{
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(updatedData),
        })
        .then((res) => res.json());
        
        return navigate("/");
    }
    

    console.log(`tweets: `, edit.twit);
    useEffect(() => {
        getEditpage();
    }, []);
    return(
        <div className={styles.tableCase}>
            <table>
                <tr className={editStyle.submitBtn}>
                    <button onClick={()=>submitBtn(edit)}>완료</button>
                </tr>
                <tr>
                    <th>가게명</th>
                    <td><input value={name} placeholder={edit.name} onChange={onChangeName}/></td>
                </tr>
                <tr>
                    <th>주소</th>
                    <td><input value={addr} placeholder={edit.address} disabled/></td>
                </tr>
                <tr>
                    <th>연락처</th>
                    <td><input value={phone} placeholder={edit.phone} onChange={onChangePhone}/></td>
                </tr>
                <tr>
                    <th>링크</th>
                    <td className={styles.mapLink}><a href={edit.info}>{edit.info}</a></td>
                </tr>
                <tr>
                    <th>추천트윗</th>
                    <tr>
                        <Twitter></Twitter>
                        <p className={styles.notice}>&gt; 삭제할 트윗 선택</p>
                        <Tweets id={id} isEdit={true}></Tweets>
                    </tr>
                    {/* <td><Tweets id={id}></Tweets></td> */}
                </tr>
                <tr>
                    <th>생성일</th>
                    <td></td>
                </tr>
                
            </table>
            {/* <Form></Form> */}
        </div>
    );
}

export default Edit;