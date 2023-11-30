import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Screen from 'components/Screen'
import VehicleModal from './VehicleModal'
import Option from 'components/Option'
import TextInput from 'components/TextInput'
import { Button } from 'react-native-paper'
import { useMaintainer } from 'context/MaintainerProvider'
import { useAlert } from 'context'
import VehicleServiceModal from './VehicleServiceModal'

const CreateMaintenanceScreen = () => {
  const { createMaintenance } = useMaintainer()
  const { activateLoading, stopLoadingAndShowAlert } = useAlert()

  const [vehicle, setVehicle] = useState(null)
  const [service, setService] = useState('')
  const [cost, setCost] = useState('')
  const [description, setDescription] = useState('')

  const [vehicleModalVisible, setVehicleModalVisible] = useState(false)

  const [vehiclesFound, setVehiclesFound] = useState(false)
  const btnDisabled = !(vehicle != null && service && cost && description)

  useEffect(() => {
    console.log([vehicle, service, cost])
  }, [vehicle, service, cost])

  const create = () => {
    activateLoading()

    const maintenance = {
      vehicle: vehicle._id,
      service,
      cost,
      description,
    }

    createMaintenance(maintenance)
      .then(() => {
        console.log('Maintenance created!')
        stopLoadingAndShowAlert(true, 'The maintenance is successfully created!')
      })
      .catch((err) => {
        console.error(err)
        stopLoadingAndShowAlert(false, err)
      })
  }

  return (
    <Screen>
      <VehicleServiceModal
        visible={vehicleModalVisible}
        setVisible={setVehicleModalVisible}
        setVehicle={setVehicle}
        setVehiclesFound={setVehiclesFound}
      />
      <Option
        onPress={() => {
          setVehicleModalVisible(true)
        }}
      >
        {vehiclesFound
          ? vehicle == null
            ? 'Choose a vehicle'
            : `${vehicle.brand} ${vehicle.model}`
          : 'No vehicles found'}
      </Option>
      <TextInput
        label='Service'
        state={service}
        onChangeText={(text) => setService(text)}
      />
      <TextInput
        label='Cost'
        state={cost}
        onChangeText={(text) => setCost(text)}
      />
      <TextInput
        label='Description'
        state={description}
        onChangeText={(text) => setDescription(text)}
      />
      <Button
        mode='contained'
        onPress={create}
        disabled={btnDisabled}
        style={styles.btn}
      >
        Create Maintenance
      </Button>
    </Screen>
  )
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 20,
  },
})

export default CreateMaintenanceScreen
