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
    authenticate as authenticateAPI,
    getAll
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
            authenticateAPI(jwtToken).then(async ({ user }) => {
                console.log('authenticated!')
                await AsyncStorage.setItem('webToken', jwtToken)
                setWebToken(jwtToken)
                setUser(user)
                setLoggedIn(true)
            }).catch(err => console.log(err))
        } else await AsyncStorage.removeItem('webToken')
    }
    const login = (email, password) =>
        loginAPI(email, password)
            .then(async ({ jwtToken, user }) => {
                console.log('logged in!')

                await AsyncStorage.setItem('webToken', jwtToken)
                setWebToken(jwtToken)
                setUser(user)
                setLoggedIn(true)
            })
            .catch(err => { console.log(err) })

    const logout = () =>
        logoutAPI(webToken)
            .then(async () => {
                console.log('logged out!')
                await AsyncStorage.removeItem('webToken')
                setLoggedIn(false)
                setUser(undefined)
                setWebToken('')
            })

    return (
        <Provider
            value={{
                user, loggedIn,
                login, logout
            }
            }>{children}</Provider>
    )
}

export default AuthProvider
export const useAuth = () => useContext(AuthContext)