import { useState, useEffect } from 'react'
import { fetchPaginatedData } from '@/services/apiService'
import DataListTable from '@/components/DataList/DataListTable'
import Pagination from '@/components/Pagination'
import { Box, Container, Paper } from '@mui/material'
import ErrorAlert from '@/components/ErrorAlert'

const DataList = ({ pageName, endpoint }) => {
    const [datalist, setDataList] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [meta, setMeta] = useState({})
    const [links, setLinks] = useState({})
    const [errors, setErrors] = useState([])
    const [showSnackbar, setShowSnackbar] = useState(false)

    const fetchDataList = async (page, perPage) => {
        setErrors([])
        setLoading(true)
        try {
            const { data, meta, links } = await fetchPaginatedData(
                endpoint,
                page,
                perPage,
            )
            setDataList(data)
            setMeta(meta)
            setLinks(links)
        } catch (error) {
            console.error('Error fetching data list:', error)
            // if (error.response.status !== 409) throw error

            setErrors([error.response.data?.message || 'An error occurred'])
            setShowSnackbar(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDataList(page, perPage)
    }, [page, perPage])

    const refreshUserList = () => {
        fetchDataList(page, perPage)
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

                    {/* Pagination */}
                    <Box mb={3}>
                        <Pagination
                            meta={meta}
                            links={links}
                            setPage={setPage}
                            perPage={perPage}
                            setPerPage={setPerPage}
                            refreshData={refreshUserList}
                        />
                    </Box>

                    {/* Data Table */}
                    <DataListTable
                        pageName={pageName}
                        datalist={datalist}
                        loading={loading}
                    />

                    {/* Pagination at the bottom */}
                    <Box mt={3}>
                        <Pagination
                            meta={meta}
                            links={links}
                            setPage={setPage}
                            perPage={perPage}
                            setPerPage={setPerPage}
                            refreshData={refreshUserList}
                        />
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

export default DataList
