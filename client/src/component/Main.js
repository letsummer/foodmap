// import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Map from "./Map.js";
import Add from "./Add.js";
import List from "./List.js";
import Place from "./Place.js";

function Main(){
    return(
        <div>
            <Router>
                <nav>
                    <ul>
                        <li><Link to="/">홈</Link></li>
                        <li><Link to="/admin/add">요청</Link></li>
                        <li><Link to="/admin/list">목록</Link></li>
                        {/* <li><Link to="/"></Link></li> */}
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Map/>}/>
                    <Route path="/place/:id" element={<Place/>}/>
                    <Route path="/admin/add" element={<Add/>}/>
                    <Route path="/admin/list" element={<List/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default Main;