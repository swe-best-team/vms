import React from 'react'

import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

import { COLORS, ROLES } from 'utils/constants'

const RoleView = ({ role, setRole }) =>
    <>
        <View style={styles.container}>
            <Button
                mode='contained'
                style={[styles.btn,
                role == ROLES.admin && styles.btnActive
                ]}
                onPress={() => setRole(ROLES.admin)}
            >Admin</Button>
            <Button
                mode='contained'
                style={[styles.btn,
                role == ROLES.driver && styles.btnActive
                ]}
                onPress={() => setRole(ROLES.driver)}
            >Driver</Button>
        </View>
        <View style={styles.container}>
            <Button
                mode='contained'
                style={[styles.btn,
                role == ROLES.maintainer && styles.btnActive
                ]}
                onPress={() => setRole(ROLES.maintainer)}
            >Maintainer</Button>
            <Button
                mode='contained'
                style={[styles.btn,
                role == ROLES.fueler && styles.btnActive
                ]}
                onPress={() => setRole(ROLES.fueler)}
            >Fueler</Button>
        </View>
    </>

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 20
    },
    btn: {
        width: '40%',
        backgroundColor: COLORS.secondary
    },
    btnActive: {
        backgroundColor: COLORS.primary
    }
})

export default RoleView