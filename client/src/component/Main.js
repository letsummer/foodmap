// import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Map from "./Map.js";
import Add from "./Add.js";
import List from "./List.js";
import Checklist from "./Checklist.js";
import Place from "./Place.js";
import Edit from "./Edit.js";
import Admin from "./Admin.js";

console.log(`Main: `, process.env.REACT_APP_PUBLIC_URL);

function Main(){
    return(
        <div>
            <Router>
                <nav>
                    <ul>
                        <li><Link to={`${process.env.REACT_APP_PUBLIC_URL}`}>홈</Link></li>
                        <li><Link to={`${process.env.REACT_APP_PUBLIC_URL}/admin/add`}>요청</Link></li>
                        <li><Link to={`${process.env.REACT_APP_PUBLIC_URL}/admin/list`}>목록</Link></li>
                        <li><Link to={`${process.env.REACT_APP_PUBLIC_URL}/admin/checklist`}>요청목록(미등록상태)</Link></li>
                        {/* <li><Link to="/"></Link></li> */}
                    </ul>
                </nav>
                <Routes>
                    <Route path={`${process.env.REACT_APP_PUBLIC_URL}`} element={<Map/>}/>
                    <Route path="/place/:id" element={<Place/>}/>
                    <Route path="/place/:id/edit" element={<Edit/>}/>
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="/admin/add" element={<Add/>}/>
                    <Route path="/admin/list" element={<List/>}/>
                    <Route path="/admin/checklist" element={<Checklist/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default Main;