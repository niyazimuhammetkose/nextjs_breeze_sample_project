'use client'

import { useState } from 'react'
import { api_axios, axios } from '@/lib/axios'
import {
    Box,
    Container,
    Paper,
    Typography,
    CircularProgress,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Alert,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ErrorAlert from '@/components/ErrorAlert'

const CustomApiRequest = () => {
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [showSnackbar, setShowSnackbar] = useState(false)

    const [endpoint, setEndpoint] = useState('/users/search')
    const [httpMethod, setHttpMethod] = useState('GET')
    const [params, setParams] = useState({ search: 'test' })
    const [apiInstance, setApiInstance] = useState('api_axios')

    const fetchDataList = async () => {
        setErrors([])
        setLoading(true)

        try {
            const selectedApiInstance =
                apiInstance === 'api_axios' ? api_axios : axios
            const response = await selectedApiInstance[
                httpMethod.toLowerCase()
            ](endpoint, {
                params,
            })

            console.log('Fetched data list:', response.data)
            setResponse(response.data) // Store the entire response
        } catch (error) {
            console.error('Error fetching data list:', error)
            setErrors([error.response?.data?.message || 'An error occurred'])
            setShowSnackbar(true)
        } finally {
            setLoading(false)
        }
    }

    const handleCloseSnackbar = () => {
        setShowSnackbar(false)
    }

    // Recursive function to render JSON data with accordions
    const renderJson = data => {
        if (typeof data === 'object' && data !== null) {
            // Eğer bir dizi ise, her bir elemanı işleyelim
            if (Array.isArray(data)) {
                return data.map((item, index) => (
                    <Accordion key={index} defaultExpanded={false}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="body1" fontWeight="bold">
                                {`Item ${index}`}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box>{renderJson(item)}</Box>
                        </AccordionDetails>
                    </Accordion>
                ))
            }

            return Object.entries(data).map(([key, value], index) => {
                // Eğer değer bir nesne ise, Accordiona saralım
                if (typeof value === 'object' && value !== null) {
                    return (
                        <Accordion key={index} defaultExpanded={false}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="body1" fontWeight="bold">
                                    {key}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box>{renderJson(value)}</Box>
                            </AccordionDetails>
                        </Accordion>
                    )
                }

                // Diğer türler için direkt olarak gösterelim
                return (
                    <Box key={index}>
                        <Typography variant="body2">
                            <Typography variant="body3" fontWeight="bold">
                                {key} :
                            </Typography>
                            {
                                typeof value === 'boolean'
                                    ? value.toString() // Boolean değerlerini string'e çevir
                                    : Array.isArray(value)
                                      ? value.length === 0
                                          ? '[]' // Boş dizileri göster
                                          : JSON.stringify(value) // Dizi içeriklerini göster
                                      : value === null
                                        ? 'null' // Null değerlerini göster
                                        : value // Diğer türler için değer
                            }
                        </Typography>
                    </Box>
                )
            })
        }

        // Diğer türler için direkt olarak gösterelim
        return <Typography variant="body2">{data}</Typography>
    }

    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <Paper elevation={3} style={{ padding: 16 }}>
                    {/* Inline Alert for errors */}
                    <ErrorAlert messages={errors} />

                    <Box display="flex" flexDirection="column" mb={3}>
                        {/* API Instance Selection */}
                        <FormControl
                            variant="outlined"
                            fullWidth
                            margin="normal">
                            <InputLabel id="api-instance-label">
                                API Instance
                            </InputLabel>
                            <Select
                                labelId="api-instance-label"
                                value={apiInstance}
                                onChange={e => setApiInstance(e.target.value)}>
                                <MenuItem value="axios">axios</MenuItem>
                                <MenuItem value="api_axios">api_axios</MenuItem>
                            </Select>
                        </FormControl>

                        {/* HTTP Method Selection */}
                        <FormControl
                            variant="outlined"
                            fullWidth
                            margin="normal">
                            <InputLabel id="http-method-label">
                                Method
                            </InputLabel>
                            <Select
                                labelId="http-method-label"
                                value={httpMethod}
                                onChange={e => setHttpMethod(e.target.value)}>
                                <MenuItem value="GET">GET</MenuItem>
                                <MenuItem value="POST">POST</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Endpoint Input */}
                        <TextField
                            label="Endpoint"
                            variant="outlined"
                            value={endpoint}
                            onChange={e => setEndpoint(e.target.value)}
                            margin="normal"
                            fullWidth
                        />

                        {/* Parameters Input */}
                        <TextField
                            label="Parameters (JSON format)"
                            variant="outlined"
                            value={JSON.stringify(params, null, 2)} // JSON.stringify with indentation
                            onChange={e =>
                                setParams(JSON.parse(e.target.value || '{}'))
                            }
                            margin="normal"
                            fullWidth
                            multiline
                            rows={4}
                        />
                    </Box>

                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mt={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={fetchDataList}
                            disabled={loading}
                            style={{ marginLeft: 8 }}>
                            {loading ? (
                                <CircularProgress size={24} />
                            ) : (
                                'Fetch Data'
                            )}
                        </Button>
                    </Box>

                    {/* Render API Response */}
                    {response && (
                        <Box mt={4}>
                            <Typography variant="h6">Response Data</Typography>
                            {renderJson(response)}
                        </Box>
                    )}

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
