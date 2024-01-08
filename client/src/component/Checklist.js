import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Btn({content}){
    const clkTest = (e)=>{
        console.log(`click id: `, content);
    }
    return(
        <td><button onClick={clkTest} id={content._id}>클릭</button></td>
    ); 
}

function Checklist(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    // const [name, setName] = useState("");
    // const [address, setAddr] = useState("");
    // const [phone, setPhone] = useState("");
    // const [coord, setCoord] = useState([]);
    // const [category, setCategory] = useState("");
    // const [info, setInfo] = useState("");
    
    // const useData = {
    //     name,
    //     address,
    //     phone,
    //     coord,
    //     category,
    //     info
    // };
    
    const addPlace = (item)=>{
        console.log(`clicked!: `, item);

        if(window.confirm("지도에 추가하시겠습니까?")){
            // console.log(`data: `, item.name);
            fetch("http://localhost:5000/api/list/",{
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

    useEffect(() => {
        fetch(`http://localhost:5000/api/confirm`)
          .then((response) => response.json())
          .then((json) => {
            setData(json);
            setLoading(false);
          });
      }, []);

    return(
        <div>
            {/* <form action=""> */}
            <table>
                <thead>
                    <tr>
                        <th>가게명</th>
                        <th>카테고리</th>
                        <th>주소</th>
                        <th>연락처</th>
                        <th>카카오맵 정보</th>
                        <th>버튼</th>
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
                                <td><a href={item.info}>카맵에서</a></td>
                                {/* <Btn content={item}></Btn> */}
                                <td><button id={item._id} onClick={()=>addPlace(item)} >추가</button></td>
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