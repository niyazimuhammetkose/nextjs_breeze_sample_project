import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Select, MenuItem, Button, IconButton, Typography, Box } from '@mui/material'
import { GeneratePageNumbers } from '@/lib/GeneratePageNumbers'

const Pagination = ({
    meta,
    setPage,
    perPage,
    setPerPage,
    refreshData,
}) => {
    const { current_page, total_pages } = meta

    const handlePageChange = (page) => {
        if (page >= 1 && page <= total_pages) {
            setPage(page)
        }
    }

    const handlePerPageChange = (event) => {
        setPerPage(Number(event.target.value))
        setPage(1) // Reset to page 1 when perPage changes
    }

    const pageNumbers = GeneratePageNumbers({ current_page, total_pages })

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
            <Box display="flex" alignItems="center">
                <Select
                    value={perPage}
                    onChange={handlePerPageChange}
                    variant="outlined"
                    size="small"
                    style={{ minWidth: 80, marginRight: 8 }}
                >
                    {[5, 10, 20, 50, 100].map((value) => (
                        <MenuItem key={value} value={value}>
                            {value}
                        </MenuItem>
                    ))}
                </Select>

                <IconButton
                    onClick={refreshData}
                    color="primary"
                    style={{ marginLeft: 8 }}
                >
                    <RefreshIcon />
                </IconButton>
            </Box>

            <Box display="flex" alignItems="center">
                <IconButton
                    disabled={current_page === 1}
                    onClick={() => handlePageChange(current_page - 1)}
                    color="primary"
                >
                    <NavigateBeforeIcon />
                </IconButton>

                {pageNumbers.map((page, index) => (
                    <Button
                        key={index}
                        disabled={page === '...'}
                        onClick={() => handlePageChange(page)}
                        variant={page === current_page ? 'outlined' : ''}
                        color={page === current_page ? 'primary' : 'default'}
                        style={{ marginRight: 4 }}
                    >
                        <Typography variant="body2">{page}</Typography>
                    </Button>
                ))}

                <IconButton
                    disabled={current_page === total_pages}
                    onClick={() => handlePageChange(current_page + 1)}
                    color="primary"
                >
                    <NavigateNextIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export default Pagination
