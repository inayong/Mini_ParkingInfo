import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

// const { kakao } = window;

const KakaoMap = () => {


    return (
        <Map
            center={{ lat: 35.157759003, lng: 129.059317193 }}   // 지도의 중심 좌표
            style={{ width: '100%', height: '600px' }} // 지도 크기
            level={3}                                   // 지도 확대 레벨
        >
            <MapMarker position={{ lat: 35.157759003, lng: 129.059317193 }}></MapMarker>
        </Map>
    );

}

export default KakaoMap;