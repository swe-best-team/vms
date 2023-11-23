import React, {
    createContext,
    useContext,
    useState
} from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import {
    Modal, Portal,
    Text, PaperProvider,
    Button
} from 'react-native-paper'

import { COLORS } from 'utils/constants'

const AlertContext = createContext()
const { Provider } = AlertContext

const AlertProvider = ({ children }) => {
    const [visible, setVisible] = useState(false)
    const [success, setSuccess] = useState(false)
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)

    const activateLoading = () => {
        setVisible(false)
        setLoading(true)
    }
    const stopLoadingAndShowAlert = (status, msg) => {
        setLoading(false)
        setSuccess(status)
        setText(msg)
        setVisible(true)
    }
    const hideAlert = () => {
        setVisible(false)
    }
    const stopLoading = () => {
        setLoading(false)
    }

    return (
        <Provider
            value={{
                activateLoading,
                stopLoadingAndShowAlert,
                stopLoading
            }}
        >
            <PaperProvider>
                <Portal>
                    <ActivityIndicator
                        style={[
                            styles.loading,
                            loading && { display: 'block' }
                        ]}
                    />
                    <Modal
                        visible={visible}
                        onDismiss={hideAlert}
                        contentContainerStyle={styles.container}
                    >

                        <Text style={[
                            styles.status,
                            success && styles.success
                        ]}>
                            {success
                                ? 'SUCCESS!'
                                : 'ERROR...'
                            }
                        </Text>
                        <Text>{text}</Text>
                        <Button
                            onPress={hideAlert}
                        >Got it!</Button>
                    </Modal>
                </Portal>
                {children}
            </PaperProvider>
        </Provider >
    )
}

const styles = StyleSheet.create({
    loading: {
        display: 'none',
        position: 'absolute',
        alignSelf: 'center',
        borderWidth: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    container: {
        backgroundColor: '#fff',
        height: '50%',
        marginHorizontal: 20,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    status: {
        fontSize: 30,
        fontWeight: 'bold',
        color: COLORS.error
    },
    success: {
        color: COLORS.primary
    },
    text: {

    }
})

export default AlertProvider
export const useAlert = () => useContext(AlertContext)