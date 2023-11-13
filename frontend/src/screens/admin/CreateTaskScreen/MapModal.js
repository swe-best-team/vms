import Screen from 'components/Screen'
import React, { useRef, useState } from 'react'

import { Modal, StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { Button } from 'react-native-paper'

const initialRegion = {
    latitude: 51.1655,
    longitude: 71.4272,
    latitudeDelta: 0.0001,
    longitudeDelta: 0.1
}

const MapModal = ({ visible, close }) => {
    const map = useRef(null)

    const [markers, setMarkers] = useState([])
    const [selectSecond, setSelectSecond] = useState(false)

    const btnDisabled = markers.length != 2

    const onMapPress = e => {
        const coordinate = e.nativeEvent.coordinate
        if (markers.length == 2) {
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
    const zoomIn = () =>
        map?.current?.getCamera().then(cam => {
            if (cam?.altitude)
                cam.altitude /= 2
            if (cam?.zoom)
                cam.zoom += 1
            map?.current?.animateCamera(cam)
        })
    const zoomOut = () =>
        map?.current?.getCamera().then(cam => {
            if (cam?.altitude)
                cam.altitude *= 2
            if (cam?.zoom && cam.zoom > 1)
                cam.zoom -= 1
            map?.current?.animateCamera(cam)
        })

    return (
        <Modal
            animationType='slide'
            visible={visible}
        >
            <Screen>
                <MapView
                    style={styles.map}
                    ref={map}
                    initialRegion={initialRegion}
                    onPress={onMapPress}
                >
                    {markers.map((coordinate, i) =>
                        <Marker
                            key={i}
                            coordinate={coordinate}
                        />
                    )}
                </MapView>
                <View style={styles.zoomView}>
                    <Button
                        mode='contained'
                        style={styles.zoom}
                        onPress={zoomIn}
                    >+</Button>
                    <Button
                        mode='contained'
                        style={styles.zoom}
                        onPress={zoomOut}
                    >-</Button>
                </View>
                <Button
                    mode='contained'
                    style={styles.close}
                    disabled={btnDisabled}
                    onPress={() => {
                        close({
                            start: markers[0],
                            end: markers[1]
                        })
                    }}
                >Choose the route</Button>
            </Screen>
        </Modal>
    )
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        flex: 1
    },
    zoomView: {
        position: 'absolute',
        top: '50%',
        right: 10
    },
    zoom: {
        display: 'block',
        marginVertical: 10
    },
    close: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center'
    }
})

export default MapModal