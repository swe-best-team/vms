import React, { useState } from 'react'

import { ScrollView, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import Screen from 'components/Screen'
import TextInput from 'components/TextInput'
import RoleView from './RoleView'

import { ROLES } from 'utils/constants'

import { useAdmin } from 'context/AdminProvider'
import { useAlert } from 'context/AlertProvider'

const CreateUserScreen = () => {
    const { createUser } = useAdmin()
    const { activateLoading, stopLoadingAndshowAlert } = useAlert()

    const [role, setRole] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [license, setLicense] = useState('') // for a driver. ex: AC8493033

    const btnDisabled = !(
        role && name && surname && email && password && confirmPassword
        && (license || role != ROLES.driver))
    const licenseVisible = role === ROLES.driver
    const user = { role, name, surname, email, password, confirmPassword, license }

    const create = () => {
        activateLoading()
        createUser(user).then(() => {
            console.log('a user created!')
            stopLoadingAndshowAlert(true, 'The user is successfully created!')
        }).catch(err => {
            console.error(err)
            stopLoadingAndshowAlert(false, err)
        })
    }

    return (
        <ScrollView>
            <Screen style={styles.container}>
                <RoleView
                    role={role}
                    setRole={setRole}
                />
                <TextInput
                    label='Name'
                    state={name}
                    setState={setName}
                />
                <TextInput
                    label='Surname'
                    state={surname}
                    setState={setSurname}
                />
                {licenseVisible && (
                    <TextInput
                        label="Driver's license"
                        state={license}
                        onChangeText={text => setLicense(text.toLowerCase())}
                    />
                )}
                <TextInput
                    label='Email'
                    state={email}
                    onChangeText={text => setEmail(text.toLowerCase())}
                />
                <TextInput
                    label='Password'
                    state={password}
                    onChangeText={text => setPassword(text.toLowerCase())}
                    secureTextEntry
                />
                <TextInput
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
        justifyContent: 'center',
        marginVertical: 20
    },
    btn: {
        marginTop: 20
    }
})

export default CreateUserScreen
