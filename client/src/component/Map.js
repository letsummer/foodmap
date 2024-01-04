import { useEffect, useState } from "react";
const { kakao } = window;

function Map(){

    const [positions, setPosition] = useState([]);

    const getData = async () => {
        const json = await (
          await fetch(
            `http://localhost:5000/api/list`
          )
        ).json();
        
        json.map((item, index)=>{
            const result = {
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
    
    console.log(`useState로 생성한 positions: `, positions);

    useEffect(() => {
        // const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
        const container = document.getElementById("map");
        const options = {
            center: new kakao.maps.LatLng(37.41675241461202, 126.88494020113373),
            level: 5,
        }
        const map = new kakao.maps.Map(container, options);

        // 마커 이미지의 이미지 주소입니다
        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
        
        for (var i = 0; i < positions.length; i ++) {
            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(24, 35); 
            
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