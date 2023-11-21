import React, { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Link } from 'react-router-dom';

// const { kakao } = window;

const KakaoMap = () => {

    const [isOpen, setIsOpen] = useState(false);

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