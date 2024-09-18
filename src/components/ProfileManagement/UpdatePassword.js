'use client'

import { useState } from 'react'
import { Typography, Button, TextField, Box } from '@mui/material'
import axios from '@/lib/axios'
import ErrorAlert from '@/components/ErrorAlert'
import SuccessAlert from '@/components/SuccessAlert'

const UpdatePassword = ({ user, mutate }) => {
    const [formData, setFormData] = useState({
        current_password: '',
        password: '',
        password_confirmation: '',
    })
    const [errors, setErrors] = useState([])
    const [successMessage, setSuccessMessage] = useState([])
    const [showSnackbar, setShowSnackbar] = useState(false)

    const handleCloseSnackbar = () => {
        setShowSnackbar(false)
    }

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setErrors([])
        setSuccessMessage('')
        setShowSnackbar(false)

        await axios
            .put('/user/password', formData)
            .then(response => {
                mutate()
                setSuccessMessage([response.data?.message])
                setShowSnackbar(true)
                setFormData({
                    current_password: '',
                    password: '',
                    password_confirmation: '',
                })
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
                Update Password
            </Typography>

            <TextField
                label="Current Password"
                name="current_password"
                type="password"
                value={formData.current_password}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={Boolean(errors.current_password)}
                helperText={
                    errors.current_password && errors.current_password[0]
                }
            />

            <TextField
                label="New Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={Boolean(errors.password)}
                helperText={errors.password && errors.password[0]}
            />

            <TextField
                label="Confirm New Password"
                name="password_confirmation"
                type="password"
                value={formData.password_confirmation}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={Boolean(errors.password_confirmation)}
                helperText={
                    errors.password_confirmation &&
                    errors.password_confirmation[0]
                }
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}>
                Update Password
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

export default UpdatePassword
