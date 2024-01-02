import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Map from "./Map.js";
import Add from "./Add.js";

function Main(){
    return(
        <div>
            Main!
            <Router>
                <Routes>
                    <Route path="/admin/add" element={<Add/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default Main;