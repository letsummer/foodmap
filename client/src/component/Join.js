import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Join(){
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [username, setUsername] = useState("");

    const changeId = (e) =>{
        setUserId(e.target.value);
    }

    const changePw = (e) =>{
        setPassword(e.target.value);
    }

    const changePw2 = (e) =>{
        setPassword2(e.target.value);
    }

    const changeName = (e) =>{
        setUsername(e.target.value);
    }

    const useData = {
        userId,
        password,
        username
    }

    const clkBtn = (e) =>{
        if(password === password2){
            fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/join`,{
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(useData),
            })
            .then((res) => res.json())
            .then((data)=> {
                // console.log(`data: `,data);
                // e.preventDefault();
                if(data.error_message){
                    alert(data.error_message);
                    e.preventDefault();
                }
                else{
                    console.log(`data: `, data);
                    return navigate("/");
                }
                
            });
            
        }
        else{
            // e.preventDefault();
            return alert("비밀번호가 일치하지 않습니다.");
        }
            
    }
    return(
        <div>
            <form onSubmit={clkBtn}>
                아이디: <input type="text" onChange={changeId} value={userId} required/>
                비밀번호: <input type="password" onChange={changePw} value={password} required/>
                비밀번호 확인: <input type="password" onChange={changePw2} value={password2} required/>
                별명: <input type="text" onChange={changeName} value={username}/>
                <button>가입</button>
            </form>
        </div>
    );
}

export default Join;