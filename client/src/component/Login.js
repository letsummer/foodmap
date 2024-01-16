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
                "content-type": "application/json",
            },
            body: JSON.stringify(useData),
        })        
        .then((res)=>(res.json()))
        .then((data)=> {
            console.log(data.isAdmin);
            console.log(data.userAuth);

            navigate("/");
        })}
    
    const logout = async () =>{
        await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/logout`,{
            method: "POST",
            credentials: "include",
        })
        .then((result)=>{
            if(result.status === 200){
                console.log(`logout 됐습니다.`);
                // setIsLogin(false);
            }
        });
    }

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