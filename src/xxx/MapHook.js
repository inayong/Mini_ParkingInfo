import React, { useEffect, useRef } from 'react';

const MapHook = () => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, []);
}

export default MapHook;