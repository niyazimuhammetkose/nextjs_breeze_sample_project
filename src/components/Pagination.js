import { Select, MenuItem } from '@mui/material'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

const Pagination = ({ pagination, setPage, perPage, setPerPage }) => {
    const { current_page, last_page } = pagination

    const handlePageChange = page => {
        if (page >= 1 && page <= last_page) {
            setPage(page)
        }
    }

    const handlePerPageChange = event => {
        setPerPage(Number(event.target.value))
        setPage(1) // Reset to page 1 when perPage changes
    }

    const generatePageNumbers = () => {
        const pages = []
        const siblingCount = 1 // Number of pages to show around the current page
        const totalPageNumbers = siblingCount * 2 + 5 // 5 = first, last, current, and two ellipsis

        if (last_page > totalPageNumbers) {
            const leftSiblingIndex = Math.max(current_page - siblingCount, 1)
            const rightSiblingIndex = Math.min(
                current_page + siblingCount,
                last_page,
            )

            if (leftSiblingIndex > 2) {
                pages.push(1)
                pages.push('...')
            } else {
                for (let i = 1; i < leftSiblingIndex; i++) {
                    pages.push(i)
                }
            }

            for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
                pages.push(i)
            }

            if (rightSiblingIndex < last_page - 1) {
                pages.push('...')
                pages.push(last_page)
            } else {
                for (let i = rightSiblingIndex + 1; i <= last_page; i++) {
                    pages.push(i)
                }
            }
        } else {
            for (let i = 1; i <= last_page; i++) {
                pages.push(i)
            }
        }
        return pages
    }

    const pageNumbers = generatePageNumbers()

    return (
        <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
                <Select
                    value={perPage}
                    onChange={handlePerPageChange}
                    variant="outlined"
                    size="small"
                    style={{ minWidth: 80 }}>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                </Select>
            </div>

            <div className="flex items-center">
                <button
                    disabled={current_page === 1}
                    onClick={() => handlePageChange(current_page - 1)}
                    className="px-4 py-2 mx-1 bg-gray-100 hover:bg-gray-200 rounded">
                    <NavigateBeforeIcon />
                </button>

                {pageNumbers.map((page, index) => (
                    <button
                        key={index}
                        disabled={page === '...'}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 mx-1 ${
                            page === current_page
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 hover:bg-gray-200'
                        } rounded`}>
                        {page}
                    </button>
                ))}

                <button
                    disabled={current_page === last_page}
                    onClick={() => handlePageChange(current_page + 1)}
                    className="px-4 py-2 mx-1 bg-gray-100 hover:bg-gray-200 rounded">
                    <NavigateNextIcon />
                </button>
            </div>
        </div>
    )
}

export default Pagination
