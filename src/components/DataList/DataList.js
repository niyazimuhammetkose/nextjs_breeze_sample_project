'use client'

import { useState, useEffect } from 'react'
import { fetchPaginatedData } from '@/services/apiService'
import { Box, Container, Paper } from '@mui/material'
import DataListTable from '@/components/DataList/DataListTable'
import Pagination from '@/components/Pagination'
import BasicSearch from '@/components/BasicSearch'
import ErrorAlert from '@/components/ErrorAlert'

const DataList = ({ pageName, endpoint, enableBasicSearch = false }) => {
    const [datalist, setDataList] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [meta, setMeta] = useState({})
    const [links, setLinks] = useState({})
    const [errors, setErrors] = useState([])
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const fetchDataList = async (page, perPage, search = '') => {
        setErrors([])
        setLoading(true)
        try {
            const toFetchedEndpoint =
                enableBasicSearch && search ? `${endpoint}/search` : endpoint

            const params = {
                page,
                perPage,
                ...(search && { search }),
            }

            const { data, meta, links } = await fetchPaginatedData(
                toFetchedEndpoint,
                page,
                perPage,
                params,
            )
            setDataList(data)
            setMeta(meta)
            setLinks(links)
        } catch (error) {
            console.error('Error fetching data list:', error)
            setErrors([error.response?.data?.message || 'An error occurred'])
            setShowSnackbar(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDataList(page, perPage, searchQuery)
    }, [page, perPage])

    const refreshDataList = () => {
        fetchDataList(page, perPage, searchQuery)
    }

    const handleCloseSnackbar = () => {
        setShowSnackbar(false)
    }

    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <Paper elevation={3} style={{ padding: 16 }}>
                    {/* Search Bar */}
                    {enableBasicSearch && (
                        <Box mb={3}>
                            <BasicSearch
                                pageName={pageName}
                                setPage={setPage}
                                perPage={perPage}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                fetchDataList={fetchDataList}
                            />
                        </Box>
                    )}

                    {/* Pagination */}
                    <Box mb={3}>
                        <Pagination
                            meta={meta}
                            links={links}
                            setPage={setPage}
                            perPage={perPage}
                            setPerPage={setPerPage}
                            refreshData={refreshDataList}
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
                            refreshData={refreshDataList}
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
