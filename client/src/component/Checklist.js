import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/List.module.css";
// import "dotenv/config";
// require("dotenv").config();

// console.log(process.env.REACT_APP_SERVER_URL);

function Btn({content}){
    const clkTest = (e)=>{
        // console.log(`click id: `, content);
    }
    return(
        <td><button onClick={clkTest} id={content._id}>클릭</button></td>
    ); 
}

function Checklist(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
        
    const addPlace = (item)=>{
        // console.log(`clicked!: `, item);

        if(window.confirm("지도에 추가하시겠습니까?")){
            // console.log(`data: `, item.name);
            fetch(`${process.env.REACT_APP_SERVER_URL}/api/list/`,{
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(item),
            })
            .then((res) => res.json());
            // console.log(`confirm: `, item);
            return navigate("/admin/list");
        }
    }
    const rejectPlace = (item) =>{
        // console.log(`item: `, item._id);
        if(window.confirm("반려하시겠습니까?")){
        //     // console.log(`data: `, item.name);
            fetch(`${process.env.REACT_APP_SERVER_URL}/api/reject/`,{
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(item),
            })
            .then((res) => res.json());
            return navigate(0);
        }
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/confirm`)
          .then((response) => response.json())
          .then((json) => {
            setData(json);
            setLoading(false);
          });
      }, []);

    return(
        <div>
            {/* <form action=""> */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>가게명</th>
                        <th>카테고리</th>
                        <th>주소</th>
                        <th>연락처</th>
                        <th>링크</th>
                        <th>수락</th>
                        <th>거절</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        data.map((item, index)=>(
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>{item.address}</td>
                                <td>{item.phone}</td>
                                {/* <td>-</td> */}
                                <td><a href={item.info}>리뷰</a></td>
                                {/* <Btn content={item}></Btn> */}
                                <td><button id={item._id} onClick={()=>addPlace(item)} >추가</button></td>
                                <td><button className={styles.deleteBtn} id={item._id} onClick={()=>rejectPlace(item)} >반려</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {/* </form> */}
        </div>
    );
}

export default Checklist;