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
        // console.log("daaa", parkData.address)
        if (parkData.length > 0) {
            const container = mapContainer.current;
            const options = {
                center: new window.kakao.maps.LatLng(35.157759003, 129.059317193),
                level: 8,
            };
            const map = new window.kakao.maps.Map(container, options);

            parkData.forEach((item) => {
                const geocoder = new window.kakao.maps.services.Geocoder();

                geocoder.addressSearch(item.address, function (
                    result,
                    status
                ) {
                    // console.log(status, window.kakao.maps.services.Status.OK) 
                    if (status === window.kakao.maps.services.Status.OK) {
                        // console.log("d", mapAddr)
                        const coords = new window.kakao.maps.LatLng(
                            result[0].y,
                            result[0].x
                        )

                        const marker = new window.kakao.maps.Marker({
                            map: map,
                            position: coords,
                            title: item.prkPlaceNm
                        });

                        const infowindow = new window.kakao.maps.InfoWindow({
                            content: `<div style="width:150px;text-align:center;padding:6px 0;">${item.prkPlaceNm}</div>`,
                        });
                        infowindow.open(map, marker);

                        map.setCenter(coords); //첫 번째 요소의 주소를 검색하여 해당 위치를 지도의 중심으로 설정하고, 해당 위치에 마커를 추가합니다. 주소를 검색하여 좌표를 찾을 때마다 지도의 중심을 그 좌표로 설정하게 됩니다.
                    }
                });
            });
        }
    }, [parkData]);

    return (
        <div>
            <div>KakaoMap2</div>
            <div id="map" style={{ width: '1000px', height: '900px' }} ref={mapContainer}></div>
        </div>
    )
}

export default KakaoMap;