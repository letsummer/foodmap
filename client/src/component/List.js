import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/List.module.css";

function DataTable(){
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const deletePlace = (item)=>{
        // console.log(`clicked!: `, item);
        if(window.confirm("지도에서 삭제하시겠습니까?")){
            if(window.confirm("삭제 후 복구가 어렵습니다.")){
                fetch(`${process.env.REACT_APP_SERVER_URL}/api/place/${item._id}/delete`,{
                    method: "post",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(item),
                })
                .then((res) => res.json());
                // console.log(`confirm: `, item);
                return navigate(0);
            }
        }
    }

    const updatePlace = (item)=>{
        // console.log(`clicked!: `, item);
        // navigate(`/place/${item._id}`);
        // if(window.confirm("지도에서 삭제하시겠습니까?")){
        //     if(window.confirm("삭제 후 복구가 어렵습니다.")){
                fetch(`${process.env.REACT_APP_SERVER_URL}/api/place/${item._id}/edit`)
                .then((res) => res.json());
                // console.log(`confirm: `, item);
                return navigate(`/place/${item._id}/edit`);
            // }
        // }
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/list`)
          .then((response) => response.json())
          .then((json) => {
            setData(json);
            setLoading(false);
          });
      }, []);

    return(
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>가게명</th>
                    <th>주소</th>
                    <th>연락처</th>
                    <th>트윗개수</th>
                    <th>링크</th>
                    <th>수정</th>
                    <th>제거</th>
                </tr>
            </thead>
            <tbody>
                { loading? "loading..." :
                    data.map((item, index)=>(
                        <tr key={index}>
                            <td><a href={`/place/${item._id}`}>{item.name}</a></td>
                            <td>{item.address}</td>
                            <td>{item.phone}</td>
                            <td>{item.twit.length}</td>
                            <td><a href={item.info}>카맵에서</a></td>
                            <td><button className={styles.editBtn} id={item._id} onClick={()=>updatePlace(item)} >수정</button></td>
                            <td><button className={styles.deleteBtn} id={item._id} onClick={()=>deletePlace(item)} >삭제</button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

function List(){
    return(
        <div>
            <DataTable></DataTable>
        </div>
    );
}

export default List;