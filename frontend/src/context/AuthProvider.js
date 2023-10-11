import React, {
    createContext,
    useContext,
    useState
} from 'react'

const AuthContext = createContext()
const { Provider } = AuthContext

const loggedUserSample = {
    // role: 'admin',
    role: 'driver',
    username: 'alikhan',
    firstname: 'Alikhan',
    surname: 'Baidussenov'
}

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(undefined)
    const [loggedIn, setLoggedIn] = useState(false)

    const loginUser = () => {
        setUser(loggedUserSample)
        setLoggedIn(true)
    }
    const logoutUser = () => {
        setUser(undefined)
        setLoggedIn(false)
    }

    return (
        <Provider
            value={{
                user, loggedIn, 
                loginUser, logoutUser
            }
            }>{children}</Provider>
    )
}

export default AuthProvider
export const useAuth = () => useContext(AuthContext)