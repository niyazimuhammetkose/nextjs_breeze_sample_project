export const GeneratePageNumbers = ({current_page,total_pages}) => {
    const pages = []
    const siblingCount = 1 // Number of pages on either side of current
    const totalPageNumbers = siblingCount * 2 + 5 // Visible pages plus first, last, and current

    // If total pages exceed displayable pages, apply ellipsis logic
    if (total_pages > totalPageNumbers) {
        const leftSiblingIndex = Math.max(current_page - siblingCount, 1)
        const rightSiblingIndex = Math.min(current_page + siblingCount, total_pages)

        // Push the first page and ellipsis if needed
        if (leftSiblingIndex > 2) {
            pages.push(1, '...')
        } else {
            for (let i = 1; i < leftSiblingIndex; i++) {
                pages.push(i)
            }
        }

        // Push the pages around the current page
        for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
            pages.push(i)
        }

        // Push ellipsis and last page if needed
        if (rightSiblingIndex < total_pages - 1) {
            pages.push('...', total_pages)
        } else {
            for (let i = rightSiblingIndex + 1; i <= total_pages; i++) {
                pages.push(i)
            }
        }
    } else {
        for (let i = 1; i <= total_pages; i++) {
            pages.push(i)
        }
    }

    return pages
}
