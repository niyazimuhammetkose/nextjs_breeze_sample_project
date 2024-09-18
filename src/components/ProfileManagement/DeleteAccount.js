'use client'

import { useState } from 'react'
import { Typography, Button, Box } from '@mui/material'
import axios from '@/lib/axios'
import ErrorAlert from '@/components/ErrorAlert'
import SuccessAlert from '@/components/SuccessAlert'

const DeleteAccount = ({ user, mutate }) => {
    const [errors, setErrors] = useState([])
    const [successMessage, setSuccessMessage] = useState([])
    const [showSnackbar, setShowSnackbar] = useState(false)

    const handleCloseSnackbar = () => {
        setShowSnackbar(false)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setErrors([])
        setSuccessMessage('')
        setShowSnackbar(false)

        await axios
            .delete('/api/user/delete')
            .then(response => {
                mutate()
                setSuccessMessage([response.data?.message])
                setShowSnackbar(true)
            })
            .catch(error => {
                if (error.response?.status === 422) {
                    setErrors(error.response.data?.errors)
                } else {
                    setErrors([
                        error.response?.data?.message || 'An error occurred',
                    ])
                    setShowSnackbar(true)
                }
            })
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
                Delete Account
            </Typography>
            <Typography variant="body1" gutterBottom>
                Once you delete your account, there is no going back. Please be
                certain.
            </Typography>
            <Button
                type="submit"
                variant="contained"
                color="error"
                sx={{ mt: 2 }}>
                Delete Account
            </Button>

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

export default DeleteAccount
