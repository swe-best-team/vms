import React, { useEffect, useState } from 'react'

import { useAuth } from 'context'
import { useAdmin } from 'context/AdminProvider'

import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

const DriverModal = ({ visible, setVisible, driver, setDriver }) => {
    const { serverConnected } = useAuth()
    const { getAllDrivers } = useAdmin()

    const [drivers, setDrivers] = useState([])

    useEffect(() => {
        if (!serverConnected) return
        getAllDrivers().then(data => {
            setDrivers(data)
            console.log('drivers found!')
        }).catch(err => { console.error(err) })
    }, [])

    const onClose = d => {
        setDriver(d)
        setVisible(false)
    }

    return (
        <Modal
            open={visible}
            onClose={() => { onClose(driver == null ? null : driver) }}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Box sx={styles.modal}>
                <Typography variant='h6' component='h2'>
                    Choose a driver
                </Typography>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {drivers.map(item =>
                        <ListItemButton
                            key={item._id}
                            onClick={() => { onClose(item) }}
                        >
                            <ListItemText>{item.name} {item.surname}</ListItemText>
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

export default DriverModal