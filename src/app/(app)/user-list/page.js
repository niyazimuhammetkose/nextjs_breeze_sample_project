import dynamic from 'next/dynamic'
import Header from '@/app/(app)/Header'
import Loading from '@/app/(app)/Loading'
import { Container } from '@mui/material'

const DataList = dynamic(() => import('@/components/DataList/DataList'), {
    ssr: false,
    loading: () => <Loading />,
})

const UserListPage = () => {
    return (
        <>
            <Header title="User List" />
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <DataList pageName={'UserList'} endpoint={'/users'} />
            </Container>
        </>
    )
}

export default UserListPage
