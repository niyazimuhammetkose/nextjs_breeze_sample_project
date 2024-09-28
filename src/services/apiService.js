import { api_axios as axios } from '@/lib/axios'

export const fetchPaginatedData = async (endpoint, page = 1, perPage = 10, additionalParams) => {
    try {
        const params = { page, perPage, ...additionalParams }
        const response = await axios.get(endpoint, { params })
        const { data, meta, links } = response.data
        return { data, meta, links }
    } catch (error) {
        console.error('Error fetching paginated data:', error)
        throw error
    }
}
