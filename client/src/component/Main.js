import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Map from "./Map.js";
import Add from "./Add.js";
import List from "./List.js";
import Checklist from "./Checklist.js";
import Place from "./Place.js";
import Edit from "./Edit.js";
import Admin from "./Admin.js";
import Join from "./Join.js";
// import Login from "./Login.js";
import styles from "../css/Main.module.css";
import logo from "../css/logo.png";

function Main(){
    const [user, setUser] = useState("");
    const [isLogin, setIsLogin] = useState(false);
  
    const logout = async () =>{
        await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/logout`,{
            method: "POST",
            credentials: "include",
        })
        .then((result)=>{
            if(result.status === 200){
                console.log(`logout 됐습니다.`);
                window.location.reload();
                // navigate(0);
                // setIsLogin(false);
            }
        });
    }

    useEffect(()=>{
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/login/success`,{
            method: "GET",
            credentials: "include",
      })
      .then((res)=> res.json())
      .then((data)=>{
        // console.log(`login여부: `, data.loggedIn);
        // console.log(`유저정보: `, data.user.userId);
        console.log(`###Main.data###`);
        console.log(data);
        if(data.loggedIn){
            setIsLogin(data.loggedIn);
            setUser(data.user.userId);
        }
      })


    }, []);
    console.log(`login?: `, isLogin);
    console.log(`user: `, user);

    return(
        <div className={styles.main}>
            <nav>
                <ul>
                    <Router>
                        <li><a href="/"><img src={logo} style={{"width":"50%"}}/></a></li>
                        {isLogin? 
                            <>
                                <li><a href={`/admin/add`}>요청</a></li>
                                <li><a href={`/admin/list`}>목록</a></li>
                                <li><a href={`/admin/checklist`}>요청목록(미등록상태)</a></li>
                            </>
                        :""}
                        {isLogin? <button className={styles.logoutBtn} onClick={logout}>로그아웃</button> : ""}
                    </Router>
                </ul>
            </nav>
            <Router>
                <Routes>
                    <Route path="/" element={<Map/>}/>
                    <Route path="/place/:id" element={<Place/>}/>
                    <Route path="/place/:id/edit" element={<Edit/>}/>
                    <Route path="/join" element={<Join/>}/>
                    <Route path="/admin" element={<Admin isLogin={isLogin}/>}/>
                    {isLogin? <>
                            <Route path="/admin/add" element={<Add/>}/>
                            <Route path="/admin/list" element={<List/>}/>
                            <Route path="/admin/checklist" element={<Checklist/>}/>
                    </>
                    :null
                    }
                </Routes>
            </Router>
        </div>
    );
}

export default Main;