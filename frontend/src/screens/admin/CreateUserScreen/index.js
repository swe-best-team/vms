import React, { useEffect, useState } from 'react'

import {
    ScrollView,
    StyleSheet,
} from 'react-native'
import { Button } from 'react-native-paper'
import Screen from 'components/Screen'
import CustomTextInput from './CustomTextInput'
import RoleView from './RoleView'

import { ROLES } from 'utils/constants'

import { useAdmin } from 'context/AdminProvider'

const CreateUserScreen = () => {
    const { createUser } = useAdmin()

    const [role, setRole] = useState(ROLES.driver)
    const [name, setName] = useState('Alikhan')
    const [surname, setSurname] = useState('Baidussenov')
    const [email, setEmail] = useState('aaa@email.com')
    const [password, setPassword] = useState('alihan123')
    const [confirmPassword, setConfirmPassword] = useState('alihan123')
    const [license, setLicense] = useState('AC8493033') // for a driver

    const btnDisabled = !(email && password)
    const licenseVisible = role === ROLES.driver
    const user = { role, name, surname, email, password, confirmPassword, license }

    const create = () => createUser(user).then(() => {
        console.log('A user created!')
    }).catch(err => { console.error(err) })

    return (
        <ScrollView>
            <Screen style={styles.container}>
                <RoleView
                    role={role}
                    setRole={setRole}
                />
                <CustomTextInput
                    label='Name'
                    state={name}
                    setState={setName}
                />
                <CustomTextInput
                    label='Surname'
                    state={surname}
                    setState={setSurname}
                />
                {licenseVisible && (
                    <CustomTextInput
                        label="Driver's license"
                        state={license}
                        onChangeText={text => setLicense(text.toLowerCase())}
                    />
                )}
                <CustomTextInput
                    label='Email'
                    state={email}
                    onChangeText={text => setEmail(text.toLowerCase())}
                />
                <CustomTextInput
                    label='Password'
                    state={password}
                    onChangeText={text => setPassword(text.toLowerCase())}
                    secureTextEntry
                />
                <CustomTextInput
                    label='Confirm password'
                    state={confirmPassword}
                    onChangeText={text => setConfirmPassword(text.toLowerCase())}
                    secureTextEntry
                />
                <Button
                    mode='contained'
                    onPress={create}
                    disabled={btnDisabled}
                    style={styles.btn}
                >Create</Button>
            </Screen>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center'
    },
    btn: {
        marginTop: 20
    }
})

export default CreateUserScreen
