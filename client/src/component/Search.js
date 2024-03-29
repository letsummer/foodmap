import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Twitter from "./Twitter.js";
import styles from "../css/Add.module.css";
const { kakao } = window;

function Map (){
    return(
        <div id="map" style={{"width": "100vw", "height": "80vh"}}>
        </div>
    );
}
function Search({isCheck, searchPlace}){
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [address, setAddr] = useState("");
    const [phone, setPhone] = useState("");
    const [coord, setCoord] = useState([]);
    const [category, setCategory] = useState("");
    const [info, setInfo] = useState("");
    const [tweet, setTweet] = useState("");
    const [list, setList] = useState([]);
    const [currentLoc, setCurrentLoc] = useState([]);
    
    // const selectList = ["음식점", "간식", "카페", "술집"];
    // const [, setSelected] = useState("");

    // console.log(`isChecked? `, isCheck);
    const useData = {
        name,
        address,
        phone,
        coord,
        category,
        info,
        twit:list,
    };



    const onChangeTweet = (e)=>{
        setTweet(e.target.value);
        console.log(e.target.value);
    }
    const addBtn = ()=>{
        if(tweet==="")
            return alert("링크를 입력해주세요.");
        // console.log(`clicked!`);
        setList([...list, tweet]);
        setTweet("");
    }
    const deleteBtn = (key) =>{
        // console.log(`key: `, key);
        setList(list.filter((item, listIndex) => key !== listIndex));
        // console.log(`list: `, list);
    }
    // console.log(`list: `, list);

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangePhone = (e) => {
        setPhone(e.target.value);
    }

    const submitBtn = (e) =>{
        e.preventDefault();
        // console.log(`clicked 제출`);
        
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/confirm/`,{
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(useData),
        })
        .then((res) => res.json());
        
        return navigate("/");
    }

    const allowLocation = ()=>{
        navigator.geolocation.watchPosition((position)=>{
            setCurrentLoc([position.coords.latitude, position.coords.longitude]);
        })
    }

    const errorLocation = () =>{
        setCurrentLoc([37.49121497148213, 126.87031273426075]);   
    }

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(allowLocation, errorLocation);
        const container = document.getElementById('map');
        
        const lat = currentLoc[0];
        const lon = currentLoc[1];

        const options = {
            center: new kakao.maps.LatLng(lat, lon),
            level: 3,
        }
        new kakao.maps.Map(container, options)

    }, [currentLoc]);

    const searchingPlacename = ()=>{
        const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
        const container = document.getElementById('map');
        
        const lat = currentLoc[0];
        const lon = currentLoc[1];

        const options = {
            center: new kakao.maps.LatLng(lat, lon),
            level: 3,
        }
        const map = new kakao.maps.Map(container, options)
        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(searchPlace, placesSearchCB);
    
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
                // console.log(`장소 정보: `, place);
                const str = place.category_name;
                const detailCategory = str.split(" > ")[1];
                // console.log(`장소 정보: `, str);
                // console.log(`문자열 자르기:`, str.split(" > ")[1]);

                setName(place.place_name);
                setAddr(place.road_address_name);
                setPhone(place.phone);
                setCoord([place.x, place.y]);
                setCategory(detailCategory);
                // setCategory(place.category_group_name);
                setInfo(place.place_url);
            });
            
        }
    }
    const searchingAddress = () =>{
        const container = document.getElementById('map');

        const lat = currentLoc[0];
        const lon = currentLoc[1];

        const options = {
                center: new kakao.maps.LatLng(lat, lon), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
        };  

        // 지도를 생성합니다    
        const map = new kakao.maps.Map(container, options)

        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();

        // 지도를 클릭한 위치에 표출할 마커입니다
        var marker = new kakao.maps.Marker({ 
            // 지도 중심좌표에 마커를 생성합니다 
            position: map.getCenter() 
        }); 
        // 지도에 마커를 표시합니다
        // marker.setMap(map);

        // 지도에 클릭 이벤트를 등록합니다
        // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
        kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
            
            // 클릭한 위도, 경도 정보를 가져옵니다 
            var latlng = mouseEvent.latLng; 
            
            // 마커 위치를 클릭한 위치로 옮깁니다
            marker.setPosition(latlng);
            let lat = latlng.getLat();
            let lng = latlng.getLng();
            var coord = new kakao.maps.LatLng(lat, lng);
            var callback = function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    // console.log(`주소: `, result[0].address);
                    // setName(result[0].address.region_3depth_name);
                    setAddr(result[0].address.address_name);
                    // setPhone("");
                    setCoord([lng, lat]);
                    // setInfo("");
                }
            };

            geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);

        });
    }

    const searchingType = () =>{
        if(isCheck===true)
            searchingAddress();
        else
            searchingPlacename();
        setName("");
        setAddr("");
        setPhone("");
        setTweet("");
        // console.log(`searchingType이 작동했음!`);
    }
    useEffect(() => {
        searchingType();
    }, [searchPlace, isCheck]);

    const selectChange = (e)=>{
        // console.log(`select change!!!`);
    }

    return(
        <div>
            {/* <hr/> */}
            {/* <Twitter></Twitter> */}
                <div className={styles.addTweets}>
                    <div>트윗 링크 추가</div>
                    <input type="text" onChange={onChangeTweet} value={tweet} 
                        placeholder="예) https://twitter.com/username/status/1234567890"/>
                    <button className={styles.addBtn} onClick={addBtn}>추가</button>
                </div>
                {list.map((item, index)=>
                    <div className={styles.tweetsList} key={index}>
                        <span>{item}</span>
                        <button onClick={()=>deleteBtn(index)}>삭제</button>
                    </div>
                )}
            <form id="addform" method="post" onSubmit={submitBtn}>
                <input id="name" type="text" placeholder="가게명" onChange={onChangeName}
                    value={name} disabled={!isCheck}/>
                <input id="addr" type="text" placeholder="도로명 주소" 
                    value={address} disabled/>
                <input id="phone" type="text" placeholder="연락처" onChange={onChangePhone}
                    value={phone} disabled={!isCheck}/>
                <button className={styles.submitBtn} type="submit">요청</button>
            </form>
            <Map></Map>
        </div>
    );
}

export default Search;