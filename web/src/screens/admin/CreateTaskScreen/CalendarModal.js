import React from 'react'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const CalendarModal = ({ visible, onClose, deadline, setDeadline }) =>
    <Modal
        open={visible}
        onClose={onClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
    >
        <Box sx={styles.modal}>
            <Typography variant='h6' component='h2' sx={{ mb: 2 }}>
                Choose a driver
            </Typography>
            <Calendar
                onChange={setDeadline}
                value={deadline}
                minDate={new Date()}
            />
            <Button
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                onClick={onClose}
            >Done</Button>
        </Box>
    </Modal>

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
        textAlign: 'center'
    }
}

export default CalendarModal