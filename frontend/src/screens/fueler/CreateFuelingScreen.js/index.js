import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Screen from 'components/Screen';
import VehicleModal from './VehicleModal';
import Option from 'components/Option';
import CostModal from './CostModal';
import VolumeModal from './VolumeModal';
import StationModal from './StationModal';

const CreateFuelingScreen = () => {
    const [vehicle, setVehicle] = useState(null);
    const [cost, setCost] = useState(null);
    const [volume, setVolume] = useState(null);
    const [station, setStation] = useState(null);

    const [vehicleModalVisible, setVehicleModalVisible] = useState(false);
    const [costModalVisible, setCostModalVisible] = useState(false);
    const [volumeModalVisible, setVolumeModalVisible] = useState(false);
    const [stationModalVisible, setStationModalVisible] = useState(false);

    const [vehiclesFound, setVehiclesFound] = useState(false);

    const handleVehiclePress = () => {
        if (vehiclesFound) {
            setVehicleModalVisible(true);
        }
    };

    const handleCostPress = () => {
        setCostModalVisible(true);
    };

    const handleVolumePress = () => {
        setVolumeModalVisible(true);
    };

    const handleStationPress = () => {
        setStationModalVisible(true);
    };

    const handleCreateFueling = () => {
    };

    return (
        <Screen>
            <VehicleModal
                visible={vehicleModalVisible}
                setVisible={setVehicleModalVisible}
                setVehicle={setVehicle}
                setVehiclesFound={setVehiclesFound}
            />
            <CostModal
                value={cost}
                setValue={setCost}
                visible={costModalVisible}
                setVisible={setCostModalVisible}
            />
            <VolumeModal
                value={volume}
                setValue={setVolume}
                visible={volumeModalVisible}
                setVisible={setVolumeModalVisible}
            />
            <StationModal
                value={station}
                setValue={setStation}
                visible={stationModalVisible}
                setVisible={setStationModalVisible}
            />
            <Option style={styles.option} onPress={handleVehiclePress}>
                {vehiclesFound
                    ? vehicle == null
                        ? 'Choose a vehicle'
                        : `${vehicle.brand} ${vehicle.model}`
                    : 'No vehicles found'}
            </Option>
            <Option style={styles.option} onPress={handleCostPress}>
                {cost == null ? 'Choose cost' : `Cost: ${cost}`}
            </Option>
            <Option style={styles.option} onPress={handleVolumePress}>
                {volume == null ? 'Choose volume' : `Volume: ${volume}`}
            </Option>
            <Option style={styles.option} onPress={handleStationPress}>
                {station == null ? 'Choose station' : `Station: ${station}`}
            </Option>
            <Option style={styles.createButton} onPress={handleCreateFueling}>
                Create a Fueling
            </Option>
        </Screen>
    );
};

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
});

export default CreateFuelingScreen
