import { ReturnBasicSearchHint } from '@/lib/ReturnBasicSearchHint'
import { Search } from '@mui/icons-material'
import { Box, TextField, IconButton } from '@mui/material'

const BasicSearch = ({
    pageName,
    setPage,
    perPage,
    searchQuery,
    setSearchQuery,
    fetchDataList,
}) => {

    
    const basicSearchHint = ReturnBasicSearchHint({ pageName })

    // Function to handle search action
    const handleSearch = () => {
        setPage(1) // Reset to the first page
        fetchDataList(1, perPage, searchQuery) // Fetch data with search
    }

    // Handle Enter key press in the search input
    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <Box
            display="flex"
            justifyContent="flex-start" // Align left
            alignItems="center"
            mt={4}>
            <Box display="flex" alignItems="center" flexGrow={1}>
                <TextField
                    label="Search"
                    variant="outlined"
                    placeholder={basicSearchHint}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    fullWidth
                    size="small" // Adjust size to make it smaller
                />
                <IconButton
                    onClick={handleSearch}
                    color="primary"
                    style={{ marginLeft: '8px', height: '36px' }} // Adjust button height and margin
                    size="small" // Adjust size to make it smaller
                >
                    <Search />
                </IconButton>
            </Box>
        </Box>
    )
}

export default BasicSearch
