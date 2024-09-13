'use client'

import DataList from '@/components/DataList/DataList'

const UserList = () => {
    return <DataList pageName={'UserList'} endpoint={'/api/users'} />
}

export default UserList
