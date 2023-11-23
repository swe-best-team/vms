import React, { memo, useCallback, useState } from 'react'

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

const containerStyle = {
    width: '400px',
    height: '400px'
}

const center = {
    lat: 51.1655,
    lng: 71.4272
}

const MapModal = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyDttb_xbpmptvSZJi_xf0o8pycQ_3us04w'
    })

    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>
    ) : <></>
}

export default memo(MapModal)