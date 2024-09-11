import { Select, MenuItem } from '@mui/material'

const PaginationBackend = ({ pagination, setPage, perPage, setPerPage }) => {
    const { current_page, last_page, links } = pagination

    const handlePageChange = (url) => {
        if (url) {
            const pageParam = new URL(url).searchParams.get('page');
            if (pageParam) {
                setPage(Number(pageParam));
            }
        }
    };
    
    const handlePerPageChange = event => {
        setPerPage(Number(event.target.value))
        setPage(1) // Reset to page 1 when perPage changes
    }

    return (
        <div className="flex justify-center mt-4">
            
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

            {links.map((link, index) => (
                <button
                    key={index}
                    disabled={!link.url || link.active}
                    onClick={() => handlePageChange(link.url)}
                    className={`px-4 py-2 mx-1 ${
                        link.active
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                    } rounded`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
};

export default PaginationBackend;

