'use client'

import { useState } from 'react'
import { TextField, Button, Box, Typography } from '@mui/material'
import axios from '@/lib/axios'
import ErrorAlert from '@/components/ErrorAlert'
import SuccessAlert from '@/components/SuccessAlert'

const ProfileInformation = ({ user, mutate }) => {
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
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
            .put('/user/profile-information', formData)
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
                Profile Information
            </Typography>

            <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={Boolean(errors.name)}
                helperText={errors.name && errors.name[0]}
            />

            <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={Boolean(errors.email)}
                helperText={errors.email && errors.email[0]}
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}>
                Update Profile
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

export default ProfileInformation
