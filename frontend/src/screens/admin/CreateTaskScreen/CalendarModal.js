import React from 'react'

import { Calendar } from 'react-native-calendars'
import { Modal, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import Screen from 'components/Screen'
import { COLORS } from 'utils/constants'

const CalendarModal = ({ visible, setVisible, deadline, setDeadline }) =>
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
                theme={theme}
            />
            <Button
                onPress={() => { setVisible(false) }}
                disabled={deadline == null}
            >Confirm the date</Button>
        </Screen>
    </Modal>

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly'
    }
})

const theme = {
    selectedDayBackgroundColor: COLORS.primary,
    todayTextColor: COLORS.tertiary,
    textDisabledColor: COLORS.secondary,
    arrowColor: COLORS.primary
}

export default CalendarModal