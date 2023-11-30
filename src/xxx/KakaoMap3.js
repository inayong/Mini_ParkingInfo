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


        fetch("http://10.125.121.217:8080/parking/refer")
            .then(resp => resp.json())
            .then(data => {
                if (window.kakao && window.kakao.maps) {
                    const geocoder = new window.kakao.maps.services.Geocoder();
                    const address = data;
                    console.log("add", address)
                    geocoder.addressSearch(address, function (result, status) {
                        // console.log(status, window.kakao.maps.services.Status.OK) 
                        if (status === window.kakao.maps.services.Status.OK) {
                            console.log("add", address)
                            const coords = new window.kakao.maps.LatLng(
                                result[0].y,
                                result[0].x
                            )

                            const marker = new window.kakao.maps.Marker({
                                map: map,
                                position: coords
                            });

                            const infowindow = new window.kakao.maps.InfoWindow({
                                content: '<div style="width:150px;text-align:center;padding:6px 0;">`${data.prkPlaceNm}`</div>',
                            });
                            infowindow.open(map, marker);

                            map.setCenter(coords);
                        }
                    });
                } else {
                    console.error("Kakao Maps API is not loaded yet.")
                }
            })
            .catch(err => {
                console.error('Error fetching', err);
            });
    }, []);

    return (
        <div>
            <div>KakaoMap2</div>
            <div id="map" style={{ width: '500px', height: '400px' }} ref={mapContainer}></div>
        </div>
    )
}

export default KakaoMap;