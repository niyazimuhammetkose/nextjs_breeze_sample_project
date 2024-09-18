import { useState } from 'react'
import {
    Button,
    Box,
    Typography,
    TextField,
    CircularProgress,
} from '@mui/material'
import axios from '@/lib/axios'
import ErrorAlert from '@/components/ErrorAlert'
import SuccessAlert from '@/components/SuccessAlert'

const TwoFactorAuthentication = ({ user, mutate }) => {
    const [confirmationCode, setConfirmationCode] = useState('')
    const [isAwaitingConfirmation, setIsAwaitingConfirmation] = useState(false)
    const [errors, setErrors] = useState([])
    const [successMessage, setSuccessMessage] = useState([])
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [twoFactorQrCodeSvg, setTwoFactorQrCodeSvg] = useState(null)
    const [twoFactorRecoveryCodes, setTwoFactorRecoveryCodes] = useState([])
    const [qrCodeButtonShowState, setQrCodeButtonShowState] = useState(false)
    const [recoveryCodesButtonShowState, setRecoveryCodesButtonShowState] = useState(false)
    const [loading, setLoading] = useState(false) // Single loading state

    const handleCloseSnackbar = () => {
        setShowSnackbar(false)
    }

    const getTwoFactorQrCode = async () => {
        setLoading(true)
        try {
            const response = await axios.get('/user/two-factor-qr-code')
            setTwoFactorQrCodeSvg(response.data?.svg)
            setSuccessMessage(['QR code fetched successfully.'])
        } catch (error) {
            setErrors([error.response?.data?.message || 'An error occurred'])
        } finally {
            setLoading(false)
            setShowSnackbar(true)
        }
    }

    const getTwoFactorRecoveryCodes = async () => {
        setLoading(true)
        try {
            const response = await axios.get('/user/two-factor-recovery-codes')
            setTwoFactorRecoveryCodes(response.data)
            setSuccessMessage(['Recovery codes fetched successfully.'])
        } catch (error) {
            setErrors([error.response?.data?.message || 'An error occurred'])
        } finally {
            setLoading(false)
            setShowSnackbar(true)
        }
    }

    const handleTwoFactorEnable = async e => {
        e.preventDefault()
        setErrors([])
        setSuccessMessage('')
        setShowSnackbar(false)

        setLoading(true)
        try {
            await axios.post('/user/two-factor-authentication')
            mutate()
            setIsAwaitingConfirmation(true)
            await getTwoFactorQrCode()
            setSuccessMessage(['Two-factor authentication enabled. Scan the QR code and confirm using the code from your authenticator app.'])
        } catch (error) {
            setErrors([error.response?.data?.message || 'An error occurred'])
        } finally {
            setLoading(false)
            setShowSnackbar(true)
        }
    }

    const handleTwoFactorDisable = async e => {
        e.preventDefault()
        setErrors([])
        setSuccessMessage('')
        setShowSnackbar(false)

        setLoading(true)
        try {
            await axios.delete('/user/two-factor-authentication')
            mutate()
            setSuccessMessage(['Two-factor authentication disabled.'])
        } catch (error) {
            setErrors([error.response?.data?.message || 'An error occurred'])
        } finally {
            setLoading(false)
            setShowSnackbar(true)
        }
    }

    const handleTwoFactorConfirm = async e => {
        e.preventDefault()
        setErrors([])
        setSuccessMessage('')
        setShowSnackbar(false)

        setLoading(true)
        try {
            await axios.post('/user/confirmed-two-factor-authentication', { code: confirmationCode })
            mutate()
            setIsAwaitingConfirmation(false)
            setSuccessMessage(['Two-factor authentication confirmed.'])
        } catch (error) {
            setErrors([error.response?.data?.message || 'An error occurred'])
        } finally {
            setLoading(false)
            setShowSnackbar(true)
        }
    }

    const handleQrCodeButtonChange = async () => {
        if (qrCodeButtonShowState) {
            setTwoFactorQrCodeSvg(null) // Hide QR code
        } else {
            await getTwoFactorQrCode() // Fetch and display QR code
        }
        setQrCodeButtonShowState(prevState => !prevState) // Toggle button state
    }
    const qrCodeButtonName = qrCodeButtonShowState ? 'Hide QR Code' : 'Show QR Code'
    const recoveryCodesButtonName = recoveryCodesButtonShowState ? 'Hide Recovery Codes' : 'Show Recovery Codes'

    const handleRecoveryCodesButtonChange = async () => {
        if (recoveryCodesButtonShowState) {
            setTwoFactorRecoveryCodes([]) // Hide recovery codes
        } else {
            await getTwoFactorRecoveryCodes() // Fetch and display recovery codes
        }
        setRecoveryCodesButtonShowState(prevState => !prevState) // Toggle button state
    }

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Two-Factor Authentication
            </Typography>

            {!user?.is_two_factor_enabled && !isAwaitingConfirmation && (
                <Box component="form" onSubmit={handleTwoFactorEnable}>
                    <Typography variant="body1">
                        Enable two-factor authentication to enhance your account security.
                    </Typography>
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 2 }}
                        disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Enable 2FA'}
                    </Button>
                </Box>
            )}

            {isAwaitingConfirmation && twoFactorQrCodeSvg && (
                <Box>
                    <Typography variant="body1" gutterBottom>
                        Scan this QR code with your authenticator app, then enter the confirmation code to complete the setup.
                    </Typography>
                    <div dangerouslySetInnerHTML={{ __html: twoFactorQrCodeSvg }} />
                    <Box component="form" onSubmit={handleTwoFactorConfirm}>
                        <TextField
                            label="Authentication Code"
                            value={confirmationCode}
                            onChange={e => setConfirmationCode(e.target.value)}
                            fullWidth
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : 'Confirm 2FA'}
                        </Button>
                    </Box>
                </Box>
            )}

            {user?.is_two_factor_enabled && !isAwaitingConfirmation && (
                <>
                    <Typography variant="body1">
                        Two-factor authentication is enabled for your account.
                    </Typography>
                    <Box>
                        <Button
                            variant="outlined"
                            onClick={handleQrCodeButtonChange}
                            sx={{ mt: 2, mr: 2 }}
                            disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : qrCodeButtonName}
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleRecoveryCodesButtonChange}
                            sx={{ mt: 2 }}
                            disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : recoveryCodesButtonName}
                        </Button>
                        {qrCodeButtonShowState && twoFactorQrCodeSvg && (
                            <Box>
                                <Typography variant="body1" gutterBottom>
                                    QR Code:
                                </Typography>
                                <div dangerouslySetInnerHTML={{ __html: twoFactorQrCodeSvg }} />
                            </Box>
                        )}
                        {recoveryCodesButtonShowState && twoFactorRecoveryCodes.length > 0 && (
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    Recovery Codes
                                </Typography>
                                {twoFactorRecoveryCodes.map((recoveryCode, index) => (
                                    <Box key={index}>
                                        <Typography variant="body2" gutterBottom>
                                            {recoveryCode}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Box>

                    <Box component="form" onSubmit={handleTwoFactorDisable}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="error"
                            sx={{ mt: 2 }}
                            disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : 'Disable 2FA'}
                        </Button>
                    </Box>
                </>
            )}

            <ErrorAlert
                messages={errors}
                isSnackbar={true}
                showSnackbar={showSnackbar}
                onCloseSnackbar={handleCloseSnackbar}
            />

            <SuccessAlert
                messages={successMessage}
                isSnackbar={true}
                showSnackbar={showSnackbar}
                onCloseSnackbar={handleCloseSnackbar}
            />
        </Box>
    )
}

export default TwoFactorAuthentication
