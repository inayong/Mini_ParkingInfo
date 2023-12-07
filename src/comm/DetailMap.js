import React, { useEffect, useRef } from 'react';

const DetailMap = ({ addr, name }) => {
    const mapContainer = useRef(null);

    // console.log(addr)

    const address = addr.split(",")[0];
    // console.log(address)

    const rename = name.replace('주차장', '');
    // console.log(rename)

    useEffect(() => {
        const container = mapContainer.current;
        const options = {
            center: new window.kakao.maps.LatLng(35.22047, 129.086585),
            level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        const geocoder = new window.kakao.maps.services.Geocoder();

        const imageSrc = 'https://i.ibb.co/cXKry8p/free-icon-location-pointer-2098567.png';
        const imagesSize = new window.kakao.maps.Size(50,50);
        const imageOption = {offset: new window.kakao.maps.Point(27, 50)};
        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imagesSize, imageOption);

        geocoder.addressSearch(address, function(result, status) {

            if (status === window.kakao.maps.services.Status.OK) {
                const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);


                const marker = new window.kakao.maps.Marker({
                    map: map,
                    position: coords,
                    image: markerImage,
                });

                var infowindow = new window.kakao.maps.InfoWindow({
                    content: `<div style="width:150px;text-align:center;font-family: 'NanumSquareNeo-Variable';padding:6px 0;">${rename}</div>`
                });
                infowindow.open(map, marker);
                
                // marker.setMap(map);
                map.setCenter(coords)
            }
        })

        // const markerPosition = new window.kakao.maps.LatLng(35.22047, 129.086585);



    })


  return (
    <div className='pt-10 pb-5'>
        <div id='map' style={{ width:'1000px', height: '500px'}} ref={mapContainer}></div>
    </div>
  )
}

export default DetailMap;