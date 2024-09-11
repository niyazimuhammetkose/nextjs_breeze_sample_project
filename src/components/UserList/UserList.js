'use client'

import { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import Button from '@/components/Button'
import RefreshIcon from '@mui/icons-material/Refresh'
import UserListTable from '@/components/UserList/UserListTable'
import Pagination from '@/components/Pagination'
import PaginationBackend from '@/components/PaginationBackend'

const UserList = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)

    const [pagination, setPagination] = useState({
        current_page: page,
        first_page_url: '',
        from: page,
        last_page: page,
        last_page_url: '',
        links: [],
        next_page_url: '',
        path: '',
        per_page: perPage,
        prev_page_url: '',
        to: page,
        total: page,
    })

    const fetchUsers = async (page, perPage) => {
        setLoading(true)
        try {
            const params = {
                page,
                perPage,
            }
            const response = await axios.get(`/api/users`, { params: params })
            setUsers(response.data.data) // Users for the current page
            setPagination({
                current_page: response.data.current_page,
                first_page_url: response.data.first_page_url,
                from: response.data.from,
                last_page: response.data.last_page,
                last_page_url: response.data.last_page_url,
                links: response.data.links,
                next_page_url: response.data.next_page_url,
                path: response.data.path,
                per_page: response.data.per_page,
                prev_page_url: response.data.prev_page_url,
                to: response.data.to,
                total: response.data.total,
            })
        } catch (error) {
            console.error('Error fetching users:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers(page, perPage)
    }, [page, perPage])

    const refreshUserList = () => {
        fetchUsers(page, perPage)
    }

    return (
        <div>
            <Button
                onClick={refreshUserList}
                size="sm"
                className="flex items-center mb-1">
                <RefreshIcon className="mr-2" />
                Refresh Table
            </Button>

            <Pagination
                pagination={pagination}
                setPage={setPage}
                perPage={perPage}
                setPerPage={setPerPage}
            />

            <UserListTable users={users} loading={loading} />

            <Pagination
                pagination={pagination}
                setPage={setPage}
                perPage={perPage}
                setPerPage={setPerPage}
            />
        </div>
    )
}

export default UserList
