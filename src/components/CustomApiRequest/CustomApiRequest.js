'use client'

import { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import {
    Box,
    Container,
    Paper,
    IconButton,
    Typography,
    Alert,
    CircularProgress,
} from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import ErrorAlert from '@/components/ErrorAlert'

const CustomApiRequest = () => {
    const [datalist, setDataList] = useState([])
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [showSnackbar, setShowSnackbar] = useState(false)

    // const endpoint = '/api/tokens/create'
    const endpoint = '/user/two-factor-qr-code'

    const params = {
        token_name: 'Bearer',
    }

    const fetchDataList = async () => {
        setErrors([])
        setLoading(true)
        await axios
            // .post(endpoint, params)
            .get(endpoint, params)
            .then(response => {
                console.log('Fetched data list:', response.data)
                setDataList(response.data)
            })
            .catch(error => {
                console.error('Error fetching data list:', error)
                setErrors([error.response.data?.message || 'An error occurred'])
                setShowSnackbar(true)
            })
            .finally(setLoading(false))
    }

    const refreshData = () => {
        fetchDataList()
    }

    const handleCloseSnackbar = () => {
        setShowSnackbar(false)
    }

    // Function to display an object or array dynamically
    const renderDataList = data => {
        if (!data) return null

        // Check if the data is an array
        if (Array.isArray(data)) {
            return data.map((item, index) => (
                <Box key={index} mb={2}>
                    {typeof item === 'object' ? (
                        renderDataList(item)
                    ) : (
                        <Alert
                            key={index}
                            severity="info"
                            variant="filled"
                            style={{ marginBottom: '8px' }}>
                            {item}
                        </Alert>
                    )}
                </Box>
            ))
        }

        // If the data is an object, render key-value pairs
        if (typeof data === 'object') {
            return Object.entries(data).map(([key, value], index) => (
                <Box key={index} mb={2}>
                    <Alert
                        key={index}
                        severity="info"
                        style={{ marginBottom: '8px' }}>
                        <strong>{key}:</strong>{' '}
                        {typeof value === 'object'
                            ? renderDataList(value)
                            : value.toString()}
                    </Alert>
                </Box>
            ))
        }

        // For other data types (like strings or numbers), just display the value
        return <Typography variant="body2">{data.toString()}</Typography>
    }

    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <Paper elevation={3} style={{ padding: 16 }}>
                    {/* Inline Alert for errors */}
                    <ErrorAlert messages={errors} />

                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mt={4}>
                        <Box display="flex" alignItems="center">
                            {loading ? (
                                <CircularProgress />
                            ) : (
                                <IconButton
                                    onClick={refreshData}
                                    color="primary"
                                    style={{ marginLeft: 8 }}>
                                    <RefreshIcon />
                                </IconButton>
                            )}
                        </Box>
                    </Box>

                    <Box mt={4}>
                        {loading ? (
                            <CircularProgress />
                        ) : datalist ? (
                            renderDataList(datalist)
                        ) : (
                            <Typography variant="body1">
                                No data available.
                            </Typography>
                        )}
                    </Box>

                    {/* Snackbar for temporary error notifications */}
                    <ErrorAlert
                        messages={errors}
                        isSnackbar={true}
                        showSnackbar={showSnackbar}
                        onCloseSnackbar={handleCloseSnackbar}
                    />
                </Paper>
            </Box>
        </Container>
    )
}

export default CustomApiRequest
