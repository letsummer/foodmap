import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "dotenv/config"
const { kakao } = window;

function Form({searchPlace}){
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [address, setAddr] = useState("");
    const [phone, setPhone] = useState("");
    const [coord, setCoord] = useState([]);
    const [info, setInfo] = useState("");

    const useData = {
        name,
        address,
        phone,
        coord,
        info
    };
    const submitBtn = (e) =>{
        e.preventDefault();
        fetch("http://localhost:5000/api/list/",{
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(useData),
        })
        .then((res) => res.json());
        
        return navigate("/");
    }
    useEffect(() => {
        const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
        const container = document.getElementById('map')
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
        }
        const map = new kakao.maps.Map(container, options)
        const ps = new kakao.maps.services.Places()
        ps.keywordSearch(searchPlace, placesSearchCB)
    
        function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                let bounds = new kakao.maps.LatLngBounds()
        
                for (let i = 0; i < data.length; i++) {
                    displayMarker(data[i])
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
                }
                map.setBounds(bounds)
            }
        }
    
        function displayMarker(place) {
            let marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x),
            });
    
            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'mouseover', ()=>{
                // 마커위에 마우스를 올리면면 장소명이 인포윈도우에 표출됩니다
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                infowindow.open(map, marker);
                
            });

            kakao.maps.event.addListener(marker, 'click', ()=>{
                console.log(`장소 정보: `, place);

                setName(place.place_name);
                setAddr(place.road_address_name);
                setPhone(place.phone);
                setCoord([place.x, place.y]);
                setInfo(place.place_url);

            });
            
        }
        
    }, [searchPlace]);

    

    return(
        <div>
            <hr />
            <div
                id="map"
                style={{
                    width: '500px',
                    height: '200px',
                }}>
            </div>
            <form id="addform" method="post" onSubmit={submitBtn}>
                <input id="name" type="text" placeholder="가게명" 
                    value={name} disabled/>
                <input id="addr" type="text" placeholder="도로명 주소" 
                    value={address} disabled/>
                <input id="phone" type="text" placeholder="연락처" 
                    value={phone} disabled/>
                <button type="submit">제출</button>
            </form>
        </div>
    );
}

export default Form;