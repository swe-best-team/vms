import React, { memo, useCallback, useState } from 'react'

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const center = {
    lat: 51.1655,
    lng: 71.4272
}

const MapModal = ({ visible, close }) => {
    const [markers, setMarkers] = useState([])
    const [selectSecond, setSelectSecond] = useState(false)

    const btnDisabled = markers.length !== 2

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyDttb_xbpmptvSZJi_xf0o8pycQ_3us04w'
    })

    const onLoad = useCallback(function callback(map) {
        map.setZoom(13)
    }, [])

    const onMapClick = e => {
        const coordinate = {
            latitude: e.latLng.lat(),
            longitude: e.latLng.lng()
        }
        if (markers.length === 2) {
            if (selectSecond)
                setMarkers([
                    markers[0],
                    coordinate
                ])
            else
                setMarkers([
                    coordinate,
                    markers[1]
                ])
            return setSelectSecond(!selectSecond)
        }

        setMarkers([
            ...markers,
            coordinate
        ])
    }

    return isLoaded ? (
        <Modal
            open={visible}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Box sx={styles.modal}>
                <Typography variant='h6' component='h2' sx={{ mb: 3 }}>
                    Plot a route
                </Typography>
                <GoogleMap
                    mapContainerStyle={styles.map}
                    center={center}
                    zoom={10}
                    onLoad={onLoad}
                    onClick={onMapClick}
                >
                    {markers.map((m, i) =>
                        <Marker
                            key={i}
                            position={{ lat: m.latitude, lng: m.longitude }}
                            icon={'http://maps.google.com/mapfiles/ms/icons/green-dot.png'}
                        />
                    )}
                </GoogleMap>
                <Button
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                    disabled={btnDisabled}
                    onClick={() => {
                        close({
                            start: markers[0],
                            end: markers[1]
                        })
                    }}
                >Done</Button>
            </Box>
        </Modal>
    ) : <></>
}

const styles = {
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        textAlign: 'center'
    },
    map: {
        width: '100%',
        height: '400px'
    }
}

export default memo(MapModal)