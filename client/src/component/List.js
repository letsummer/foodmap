import { useState, useEffect } from "react";

function DataTable(){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/list`)
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