import React, {
    createContext,
    useContext,
    useState
} from 'react'

const AuthContext = createContext()
const { Provider } = AuthContext

const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState('alikhan')

    return (
        <Provider
            value={{
                username, setUsername
            }
            }>{children}</Provider>
    )
}

export default AuthProvider
export const useAuth = () => useContext(AuthContext)