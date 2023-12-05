import React, { useEffect, useRef, useState } from 'react';

const KakaoMap = () => {

    const mapContainer = useRef(null);
    // let mapAddr
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

    //초기는 한 지역만 정해서 뿌리기

    const addrGu = parkData.filter((item) => item.gu === '금정구')
    console.log(addrGu)

    // useEffect(() => {
    //     mapAddr = parkData.map((item) => item.address);
    //     // console.log("ma", mapAddr)
    // }, [parkData])



    useEffect(() => {
        // console.log("daaa", parkData.address)
        if (addrGu.length > 0) {
            const container = mapContainer.current;
            const options = {
                center: new window.kakao.maps.LatLng(35.22047, 129.086585),  //온천장역
                level: 5,
            };
            const map = new window.kakao.maps.Map(container, options);

            addrGu.forEach((item) => {
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

                        const iwContent = `<div style="width:150px;text-align:center;padding:6px 0;">${item.prkPlaceNm}</div>`;

                        const infowindow = new window.kakao.maps.InfoWindow({
                            content: iwContent
                        });

                        window.kakao.maps.event.addListener(marker, 'mouseover', function () {
                            infowindow.open(map, marker);
                        });

                        window.kakao.maps.event.addListener(marker, 'mouseout', function () {
                            infowindow.close();
                        })

                        window.kakao.maps.event.addListener(marker, 'click', function () {
                             
                        });

                        // map.setCenter(coords); //
                    }
                });
            });
        }
    }, [addrGu]);

    return (
        <div>
            <div>KakaoMap2</div>
            <div id="map" style={{ width: '1500px', height: '900px' }} ref={mapContainer}></div>
        </div>
    )
}

export default KakaoMap;