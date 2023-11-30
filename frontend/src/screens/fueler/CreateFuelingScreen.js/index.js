import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Screen from 'components/Screen'
import VehicleModal from './VehicleModal'
import Option from 'components/Option'
import TextInput from 'components/TextInput'
import { Button } from 'react-native-paper'
import { useFueler } from 'context/FuelerProvider'
import { useAlert } from 'context'
import DriverModal from './DriverModal'
// import CostModal from './CostModal'
// import VolumeModal from './VolumeModal'
// import StationModal from './StationModal'

const CreateFuelingScreen = () => {
    const { createFueling } = useFueler()
    const { activateLoading, stopLoadingAndShowAlert } = useAlert()

    const [driver, setDriver] = useState(null)
    const [vehicle, setVehicle] = useState(null)
    const [cost, setCost] = useState('')
    const [volume, setVolume] = useState('')
    const [station, setStation] = useState('')

    const [vehicleModalVisible, setVehicleModalVisible] = useState(false)

    const [driversVisible, setDriversVisible] = useState(false)
    const [vehiclesFound, setVehiclesFound] = useState(false)
    const btnDisabled = !(vehicle != null && cost && volume && station)

    useEffect(() => {
        console.log([vehicle, cost, volume])
    }, [vehicle, cost, volume])

    const create = () => {
        activateLoading()

        const fueling = {
            vehicle: vehicle._id,
            station, volume, cost
        }
        createFueling(fueling).then(() => {
            console.log('a fueling created!')
            stopLoadingAndShowAlert(true, 'The fueling is successfully created!')
        }).catch(err => {
            console.error(err)
            stopLoadingAndShowAlert(false, err)
        })
    }

    return (
        <Screen>
            <DriverModal
                visible={driversVisible}
                setVisible={setDriversVisible}
                setDriver={setDriver}
            />
            <Option
                onPress={() => { setDriversVisible(true) }}
            >
                {driver == null
                    ? 'Choose a driver'
                    : `${driver.name} ${driver.surname}`}
            </Option>
            {driver &&
                <>
                    <VehicleModal
                        visible={vehicleModalVisible}
                        setVisible={setVehicleModalVisible}
                        driver={driver}
                        setVehicle={setVehicle}
                        setVehiclesFound={setVehiclesFound}
                    />
                    <Option style={styles.option} onPress={() => { setVehicleModalVisible(true) }}>
                        {vehiclesFound
                            ? vehicle == null
                                ? 'Choose a vehicle'
                                : `${vehicle.brand} ${vehicle.model}`
                            : 'No vehicles found'}
                    </Option>
                </>
            }
            <TextInput
                label='Cost'
                state={cost}
                onChangeText={text => setCost(text)}
            />
            <TextInput
                label='Volume'
                state={volume}
                onChangeText={text => setVolume(text)}
            />
            <TextInput
                label='Station'
                state={station}
                onChangeText={text => setStation(text)}
            />
            <Button
                mode='contained'
                onPress={create}
                disabled={btnDisabled}
                style={styles.btn}
            >Create</Button>
        </Screen>
    )
}

const styles = StyleSheet.create({
    createButton: {
        marginTop: 20,
        backgroundColor: '#808080',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
})

export default CreateFuelingScreen
