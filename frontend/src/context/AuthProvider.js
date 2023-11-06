import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

import {
    login as loginAPI,
    logout as logoutAPI,
    authenticate as authenticateAPI
} from 'api/user'

const AuthContext = createContext()
const { Provider } = AuthContext

const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState(undefined)
    const [webToken, setWebToken] = useState('')

    useEffect(() => {
        fetch()
    }, [])

    const fetch = async () => {
        const jwtToken = await AsyncStorage.getItem('webToken')
        if (jwtToken) {
            console.log('authenticating...')
            authenticateAPI(jwtToken).then(async ({ user }) => {
                console.log('authenticated!')
                await AsyncStorage.setItem('webToken', jwtToken)
                setWebToken(jwtToken)
                setUser(user)
                setLoggedIn(true)
            }).catch(err => console.error(err))
        } else await AsyncStorage.removeItem('webToken')
    }
    const login = (email, password) => {
        console.log('logging in...')
        loginAPI(email, password)
            .then(async ({ jwtToken, user }) => {
                console.log('logged in!')

                await AsyncStorage.setItem('webToken', jwtToken)
                setWebToken(jwtToken)
                setUser(user)
                setLoggedIn(true)
            })
            .catch(err => { console.error(err) })
    }

    const logout = () => {
        setLoggedIn(false)
        setUser(undefined)
        setWebToken('')
        AsyncStorage.removeItem('webToken')

        console.log('logging out...')
        logoutAPI(webToken)
            .then(() => { console.log('logged out!') })
            .catch(err => { console.error(err) })
    }


    return (
        <Provider
            value={{
                user, loggedIn,
                login, logout, webToken
            }}
        >{children}</Provider>
    )
}

export default AuthProvider
export const useAuth = () => useContext(AuthContext)