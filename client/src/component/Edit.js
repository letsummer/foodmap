import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "./Form.js";
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
        <div>
        {
            tweets.map((item, index)=>(
                <div>
                    <blockquote id="tweets" class="twitter-tweet">
                        <a href={item}></a>
                    </blockquote>
                </div>
            ))
        }
        </div>
        
    );
}
function Edit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [edit, setEdit] = useState([]);

    const [name, setName] = useState(edit.name);
    const [addr, setAddr] = useState(edit.address);
    const [phone, setPhone] = useState(edit.phone);
    const [coord, setCoord] = useState(edit.coord);
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
        .then((json) => setEdit(json))
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
    

    useEffect(() => {
        getEditpage();
    }, []);
    return(
        <div>Place!
            <table>
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
                    <th>카카오맵 정보</th>
                    <td><a href={edit.info}>{edit.info}</a></td>
                </tr>
                <tr>
                    <th>추천트윗</th>
                    <Url></Url>
                </tr>
                <tr>
                    <th>생성일</th>
                    <td></td>
                </tr>
                <tr>
                    <button onClick={()=>submitBtn(edit)}>제출</button>
                </tr>
            </table>
            {/* <Form></Form> */}
        </div>
    );
}

export default Edit;