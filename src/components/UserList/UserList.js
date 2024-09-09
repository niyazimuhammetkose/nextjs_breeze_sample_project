'use client'

import { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import Button from '@/components/Button'
import RefreshIcon from '@mui/icons-material/Refresh'
import UserListTable from './UserListTable'

const UserList = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const response = await axios.get('/api/users')
            setUsers(response.data.data)
        } catch (error) {
            console.error('Error fetching users:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const refreshUserList = () => {
        fetchUsers()
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

            <UserListTable users={users} loading={loading} />
        </div>
    )
}

export default UserList
