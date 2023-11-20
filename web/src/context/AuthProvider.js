import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from 'react'

import {
    login as loginAPI,
    logout as logoutAPI,
    authenticate as authenticateAPI
} from 'api/user'

const AuthContext = createContext()
const { Provider } = AuthContext

const AuthProvider = ({ children }) => {
    const serverConnected = true

    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState(undefined)
    const [webToken, setWebToken] = useState('')

    useEffect(() => {
        if (serverConnected) fetch()
        else {
            console.log('No server connected')
            setUser({
                name: 'Alikhan',
                surname: 'Baidussenov',
                role: 'admin'
            })
            setLoggedIn(true)
        }
    }, [])

    const fetch = () => {
        const jwtToken = localStorage.getItem('webToken')
        if (jwtToken) {
            console.log('authenticating...')
            authenticateAPI(jwtToken).then(async ({ user }) => {
                console.log('authenticated!')
                localStorage.setItem('webToken', jwtToken)
                setWebToken(jwtToken)
                setUser(user)
                setLoggedIn(true)
            }).catch(err => console.error(err))
        } else localStorage.removeItem('webToken')
    }
    const login = (email, password) =>
        new Promise((resolve, reject) => {
            console.log('logging in...')
            loginAPI(email, password)
                .then(async ({ jwtToken, user }) => {
                    console.log('logged in!')
                    localStorage.setItem('webToken', jwtToken)
                    setWebToken(jwtToken)
                    setUser(user)
                    setLoggedIn(true)
                    resolve()
                }).catch(err => {
                    console.error(err)
                    reject(err)
                })
        })
    const logout = () => {
        setLoggedIn(false)
        setUser(undefined)
        setWebToken('')
        localStorage.removeItem('webToken')

        console.log('logging out...')
        logoutAPI(webToken)
            .then(() => { console.log('logged out!') })
            .catch(err => { console.error(err) })
    }


    return (
        <Provider
            value={{
                serverConnected,
                user, loggedIn,
                login, logout, webToken
            }}
        >{children}</Provider>
    )
}

export default AuthProvider
export const useAuth = () => useContext(AuthContext)