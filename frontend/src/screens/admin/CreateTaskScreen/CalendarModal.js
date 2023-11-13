import React, { useState } from 'react'

import { Calendar } from 'react-native-calendars'
import { Modal, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import Screen from 'components/Screen'

const CalendarModal = ({ visible, setVisible, deadline, setDeadline }) => {
    const [selected, setSelected] = useState(null)

    const btnDisabled = deadline == null

    return (
        <Modal
            animationType='slide'
            visible={visible}
        >
            <Screen style={styles.container}>
                <Calendar
                    onDayPress={day => {
                        setDeadline(day)
                    }}
                    markedDates={{
                        [deadline?.dateString]: {
                            selected: true,
                            disableTouchEvent: true,
                            selectedDotColor: 'orange'
                        }
                    }}
                />
                <Button
                    onPress={() => { setVisible(false) }}
                    disabled={btnDisabled}
                >Confirm the date</Button>
            </Screen>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly'
    }
})

export default CalendarModal