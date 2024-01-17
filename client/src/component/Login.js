import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "dotenv/config";

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
        // .then((res)=> res.json())
        // .then((data)=>{
        //     console.log(`process.env.REACT_APP_SERVER_URL: `, process.env.REACT_APP_SERVER_URL);
        //     console.log(data);
        // })
        // .catch((err)=>console.log(`###error###\n`, err));
        // // .catch((err)=>console.log(`error: `, err))
        // }
        .then((res)=>(res.json()))
        .then((data)=> {
            console.log(`###data###`);
            console.log(data);
            console.log(`###req.session###`);
            console.log(data.session);
            navigate("/");
        })}
    
    

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