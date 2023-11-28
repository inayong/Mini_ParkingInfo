import React, { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Link } from 'react-router-dom';

// const { kakao } = window;

const KakaoMap = () => {

    const [isOpen, setIsOpen] = useState(false);

//     const map = new kakao.maps.Map(mapContainer, mapOption); 
//     const geocoder = new kakao.maps.services.Geocoder();

// // 주소로 좌표를 검색합니다
// geocoder.addressSearch('부산광역시 연제구 연산동 420-4', function(result, status) {

//     // 정상적으로 검색이 완료됐으면 
//      if (status === kakao.maps.services.Status.OK) {

//         const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

//         // 결과값으로 받은 위치를 마커로 표시합니다
//         const marker = new kakao.maps.Marker({
//             map: map,
//             position: coords
//         });

//         // 인포윈도우로 장소에 대한 설명을 표시합니다
//         const infowindow = new kakao.maps.InfoWindow({
//             content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
//         });
//         infowindow.open(map, marker);

//         // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
//         map.setCenter(coords);
//     } 
// }); 

    return (
        <Map
            center={{ lat: 35.157759003, lng: 129.059317193 }}   // 지도의 중심 좌표
            style={{ width: '100%', height: '450px' }} // 지도 크기
            level={3}                                   // 지도 확대 레벨
        >
            <MapMarker
                position={{ lat: 35.157759003, lng: 129.059317193 }}
                clickable={true}
                onClick={() => setIsOpen(true)}
            >
                {isOpen && (
                    <div style={{ minWidth: "150px" }}>
                        <img
                            alt="close"
                            width="14"
                            height="13"
                            src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
                            style={{
                                position: "absolute",
                                right: "5px",
                                top: "5px",
                                cursor: "pointer",
                            }}
                            onClick={() => setIsOpen(false)}
                        />
                        <div style={{ padding: "5px", color: "#000" }}><Link to='/parkinginfo'>서면역</Link></div>
                    </div>
                )}
            </MapMarker>
        </Map>
    );

}

export default KakaoMap;