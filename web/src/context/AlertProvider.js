import React, {
    createContext,
    useContext,
    useState
} from 'react'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const AlertContext = createContext()
const { Provider } = AlertContext

const AlertProvider = ({ children }) => {
    const [visible, setVisible] = useState(false)
    const [success, setSuccess] = useState(false)
    const [text, setText] = useState('Duis mollis, est non commodo luctus, nisi erat porttitor ligula.')
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
            {loading &&
                <Box sx={styles.loadingBox}>
                    <CircularProgress />
                </Box>
            }
            <Modal
                open={visible}
                onClose={hideAlert}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles.modal}>
                    <Typography
                        variant="h6" component="h2"
                        sx={{ color: success ? '#4caf50' : '#ef5350' }}
                    >
                        {success
                            ? 'SUCCESS!'
                            : 'ERROR...'
                        }
                    </Typography>
                    <Typography sx={{ m: 2, textAlign: 'center' }}>
                        {text}
                    </Typography>
                    {success
                        ? <Button
                            variant="contained" color="success"
                            onClick={hideAlert}
                        >
                            OK
                        </Button>
                        : <Button
                            variant="outlined" color="error"
                            onClick={hideAlert}
                        >
                            OK
                        </Button>
                    }
                </Box>
            </Modal>
            {children}
        </Provider >
    )
}

const styles = {
    loadingBox: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 1
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}

export default AlertProvider
export const useAlert = () => useContext(AlertContext)