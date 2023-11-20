import React, { useEffect, useState } from 'react'

import { useAuth } from 'context'
import { useAdmin } from 'context/AdminProvider'

import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

const VehicleModal = ({ visible, setVisible, vehicle, setVehicle, driver, setVehiclesFound }) => {
    const { serverConnected } = useAuth()
    const { getAllVehiclesByDriver } = useAdmin()

    const [vehicles, setVehicles] = useState([])

    useEffect(() => {
        setVehicle(null)
        if (!serverConnected) return
        getAllVehiclesByDriver(driver._id).then(data => {
            setVehicles(data)
            setVehiclesFound(data.length !== 0)
        }).catch(err => { console.error(err) })
    }, [driver])

    const onClose = vehicle => {
        setVehicle(vehicle)
        setVisible(false)
    }

    return (
        <Modal
            open={visible}
            onClose={() => { onClose(vehicle == null ? null : vehicle) }}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Box sx={styles.modal}>
                <Typography variant='h6' component='h2'>
                    Choose a vehicle
                </Typography>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {vehicles.map(item =>
                        <ListItemButton
                            key={item._id}
                            onClick={() => { onClose(item) }}
                        >
                            <ListItemText>{item.brand} {item.model}</ListItemText>
                        </ListItemButton>
                    )}
                </List>
            </Box>
        </Modal>
    )
}

const styles = {
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }
}

export default VehicleModal