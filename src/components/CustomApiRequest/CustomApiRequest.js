import { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import { Box, Container, Paper,IconButton } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import ErrorAlert from '@/components/ErrorAlert'

const CustomApiRequest = () => {
    const [datalist, setDataList] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [meta, setMeta] = useState({})
    const [links, setLinks] = useState({})
    const [errors, setErrors] = useState([])
    const [showSnackbar, setShowSnackbar] = useState(false)

    const endpoint = 'api/tokens/create'

    const params = {
        token_name: 'Bearer'
    }

    const fetchDataList = async () => {
        setErrors([])
        setLoading(true)
        axios
            .post(endpoint, params)
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
                            <IconButton
                                onClick={refreshData}
                                color="primary"
                                style={{ marginLeft: 8 }}>
                                <RefreshIcon />
                            </IconButton>
                        </Box>
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
