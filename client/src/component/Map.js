import { useEffect, useState } from "react";
import pinIcon from "../css/pin.png";
import styles from "../css/Map.module.css";
const { kakao } = window;

function Map(){

    const [positions, setPosition] = useState([]);
    const [currentLoc, setCurrentLoc] = useState([]);
    let isFloat = false;

    const getData = async () => {
        const json = await (
          await fetch(
            `${process.env.REACT_APP_SERVER_URL}/api/list`
          )
        ).json();
        
        json.map((item, index)=>{
            const result = {
                id: item._id,
                name: item.name,
                address: item.address,
                phone: item.phone,
                coord: new kakao.maps.LatLng(item.coord[1], item.coord[0]),
                info: item.info
            };
            setPosition((position)=>[...position, result]);
        });
    }

    useEffect(()=>{
        getData();
    },[]);
    
    // console.log(`useState로 생성한 positions: `, positions);

    navigator.geolocation.watchPosition((position)=>{
        // console.log(`positions: `, position.coords.latitude, position.coords.longitude);
        setCurrentLoc([position.coords.latitude, position.coords.longitude]);
    });
    // console.log(`currentLoc: `, currentLoc);

    useEffect(() => {
        // const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
        let infowindow = [];
        const container = document.getElementById("map");

        // const lat = 37.49121497148213;
        // const lon = 126.87031273426075;

        const lat = currentLoc[0];
        const lon = currentLoc[1];

        const options = {
            center: new kakao.maps.LatLng(lat, lon),
            level: 5,
        }

        // console.log(`lat: ${lat}, lon: ${lon}`);
        const map = new kakao.maps.Map(container, options);

        // 마커 이미지의 이미지 주소입니다
        var imageSrc = pinIcon; 
        
        // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
        function clickMarker(map, marker, infowindow) {
            return function() {
                if(isFloat === false){ // default
                    infowindow.open(map, marker);
                    isFloat = true;
                }
                else{
                    infowindow.close();
                    isFloat = false;
                }
            };
        }

        for (var i = 0; i < positions.length; i ++) {
            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(30, 30); 
            
            // 마커 이미지를 생성합니다    
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
            
            // console.log(`for문에서의 [${i}]번째 positions: `, positions);
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].coord, // 마커를 표시할 위치
                title : positions[i].name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image : markerImage // 마커 이미지 
            });
            const isValidInfo = (positions[i].info=="")? "" : `<p><a href=${positions[i].info} target="_blank">카카오맵에서 보기</a></p>`;
            // console.log(positions[i], isValidInfo);
            let content =
                `<div style="padding:5px; width:300px; height:150px;">
                    <strong><a href="/place/${positions[i].id}" target="_blank">${positions[i].name}</a></strong>
                    <p>${positions[i].address}</p>
                    <p>${positions[i].phone}</p>
                ` + isValidInfo +
                `</div>`;
            
            
            
            
                let iwPosition = new kakao.maps.LatLng(33.450701, 126.570667); //인포윈도우 표시 위치입니다

            // 인포윈도우를 생성합니다
            infowindow = new kakao.maps.InfoWindow({
                content : content,
                position : iwPosition, 
                // disableAutoPan: true,
                zIndex: 1
                // removable: true
            });
                
            infowindow.close();
            
            kakao.maps.event.addListener(marker, 'click', clickMarker(map, marker, infowindow));

        }        
    });

    return(
        <div id="map" style={{
            width: "500px",
            height:"500px"
        }}>
        </div>
    );
}

export default Map;