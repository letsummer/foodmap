import { useState, useEffect } from "react";
const { kakao } = window;

function Map({searchPlace}){
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
                // let resultDiv = document.getElementById('result'); 
                // resultDiv.innerHTML = place.place_name;
                
                let formContent = document.getElementById("addform");
                formContent.name.value = place.place_name;
                formContent.addr.value = place.road_address_name;
                formContent.phone.value = place.phone;
                // formContent.innerHTML = place.place_name;

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
            <form id="addform" action="">
                <input id="name" type="text" placeholder="가게명" disabled/>
                <input id="addr" type="text" placeholder="도로명 주소" disabled/>
                <input id="phone" type="text" placeholder="연락처" disabled/>
            </form>
            
            {/* <input type="text" value={searchPlace}/> */}
        </div>
    );
}

export default Map;