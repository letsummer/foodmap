import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    
    const changeId = (e) =>{
        setUserId(e.target.value);
    }

    const changePw = (e) =>{
        setPassword(e.target.value);
    }

    const useData = {
        userId,
        password
    }
    const login = async (e) =>{
        e.preventDefault();

        await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/login`,{
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(useData),
        })        
        .then((res)=> {
            if(res.status===200){
                console.log("###성공!###");
                console.log(res.json());
                console.log(res.body);
                navigate("/");
            }
            else{
                alert("에러 발생!");
                console.log(`에러`);
                console.log(res.text());
                console.log(res.json());
                console.log(res.body);
            }
        })
        .catch((err)=>console.log(`error: `, err))
        }
        // .then((res)=>(res.json()))
        // .then((data)=> {
        //     console.log(data.isAdmin);
        //     console.log(data.userAuth);

        //     navigate("/");
        // })}
    
    

    return(
        <div>
            <form onSubmit={login}>
                아이디: <input type="text" value={userId} onChange={changeId} required/>
                비밀번호: <input type="password" value={password} onChange={changePw} required/>
                <button type="submit">로그인</button>
            </form>
        </div>
    )
}

export default Login;