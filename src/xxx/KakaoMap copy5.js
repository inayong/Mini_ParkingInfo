import React, { useEffect, useRef, useState } from 'react';

const KakaoMap = () => {

    const mapContainer = useRef(null);
    let mapAddr
    const [parkData, setParkData] = useState([]);

    const getData = () => {

        fetch("http://10.125.121.217:8080/parking/refer")
            .then(resp => resp.json())
            .then(data => {
                setParkData(data)
                // console.log(data)
            })
            .catch(err => console.log(err))
    }

    // console.log("da", parkData)

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        mapAddr = parkData.map((item) => item.address);
        // console.log("ma", mapAddr)
    }, [parkData])

    useEffect(() => {
        // if (mapAddr &&) {
        // console.log("daaa", parkData.address)
        const container = mapContainer.current;
        const options = {
            center: new window.kakao.maps.LatLng(35.157759003, 129.059317193),
            level: 8,
        };
        const map = new window.kakao.maps.Map(container, options);

        const geocoder = new window.kakao.maps.services.Geocoder();

        
        geocoder.addressSearch(mapAddr, function (
            result,
            status
        ) {
            // console.log(status, window.kakao.maps.services.Status.OK) 
            if (status === window.kakao.maps.services.Status.OK) {
                console.log("d", mapAddr)
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
        });
        // }
    }, [parkData]);

    return (
        <div>
            <div>KakaoMap2</div>
            <div id="map" style={{ width: '800px', height: '700px' }} ref={mapContainer}></div>
        </div>
    )
}

export default KakaoMap;