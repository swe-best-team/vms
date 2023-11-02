import React, {
    createContext,
    useContext,
    useState
} from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

import {
    login as loginAPI,
    getAll
} from 'api/user'

const AuthContext = createContext()
const { Provider } = AuthContext

const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState(undefined)
    const [webToken, setWebToken] = useState('')

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

    const logoutUser = () => {
        setUser(undefined)
        setLoggedIn(false)
    }

    return (
        <Provider
            value={{
                user, loggedIn,
                login, logoutUser
            }
            }>{children}</Provider>
    )
}

export default AuthProvider
export const useAuth = () => useContext(AuthContext)