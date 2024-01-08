import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DataTable(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const deletePlace = (item)=>{
        console.log(`clicked!: `, item);
        if(window.confirm("지도에서 삭제하시겠습니까?")){
            if(window.confirm("삭제 후 복구가 어렵습니다.")){
                fetch(`${process.env.REACT_APP_SERVER_URL}/api/list/`,{
                    method: "delete",
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
        // <div>
        //     {/* <h1>The Data! {loading ? "":  `(${data.length})`}</h1> */}
        //     {loading? 
        //         (<strong>Loading . . .</strong>):
        //         (<ul>
        //             {data.map((d)=>(
        //                 <li>
        //                     {d.name}
        //                 </li>
        //             ))}
        //         </ul>)
        //     }
        // </div>
        <table>
            <thead>
                <tr>
                    <th>가게명</th>
                    <th>주소</th>
                    <th>연락처</th>
                    <th>트윗개수</th>
                    <th>카카오맵 정보</th>
                    <th>수정</th>
                    <th>제거</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((item, index)=>(
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.address}</td>
                            <td>{item.phone}</td>
                            <td>-</td>
                            <td><a href={item.info}>카맵에서</a></td>
                            <td><button id={item._id} onClick={()=>updatePlace(item)} >수정</button></td>
                            <td><button id={item._id} onClick={()=>deletePlace(item)} >삭제</button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

function List(){
    return(
        <div>isLoading 해줘야 함
            <DataTable></DataTable>
        </div>
    );
}

export default List;