import React, { useEffect, useRef } from 'react';

const KakaoMap = () => {

    const mapContainer = useRef(null);

    useEffect(() => {

        const container = document.getElementById('map');
        const options = {
            center: new window.kakao.maps.LatLng(35.157759003, 129.059317193),
            level: 5,
        };
        const map = new window.kakao.maps.Map(container, options);

        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch('부산광역시 연제구 연산동 2122-12', function(
            result,
            status
        ) {
            // console.log(status, window.kakao.maps.services.Status.OK) 
            if (status === window.kakao.maps.services.Status.OK) {
                const coords = new window.kakao.maps.LatLng(
                    result[0].y,
                    result[0].x
                )

                const marker = new window.kakao.maps.Marker({
                    map: map,
                    position: coords
                });

                const infowindow = new window.kakao.maps.InfoWindow({
                    content: '<div style="width:150px;text-align:center;padding:6px 0;">연미 공영주차장</div>',
                });
                infowindow.open(map, marker);

                map.setCenter(coords);
            }
        })
    }, []);

    return (
        <div>
            <div>KakaoMap2</div>
            <div id="map" style={{width:'500px', height:'400px'}} ref={mapContainer}></div>
        </div>
    )
}

export default KakaoMap;