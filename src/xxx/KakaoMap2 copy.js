import React, { useState } from 'react';

const KakaoMap2 = () => {
    const [map, setMap] = useState();
    const [marker, setMarker] = useState();

    const kakaoMap = () => {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        const map = new kakao.maps.Map(container, options);
      };

    
    // const options = { //지도를 생성할 때 필요한 기본 옵션
    //     center: new kakao.maps.LatLng(), //지도의 중심좌표.
    //     level: 3 //지도의 레벨(확대, 축소 정도)
    // };

    // const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴/

    return (
        <body>
            <div>KakaoMap2</div>
            <div id="map" style="width:500px;height:400px;">{map}</div>
        </body>
    )
}

export default KakaoMap2;