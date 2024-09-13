import dynamic from 'next/dynamic'
import Header from '@/app/(app)/Header'
import Loading from '@/app/(app)/Loading'
import { Box, Container, Paper } from '@mui/material'

const UserList = dynamic(() => import('@/components/UserList/UserList'), {
    ssr: false,
    loading: () => <Loading />,
})

const UserListPage = () => {
    return (
        <>
            <Header title="User List" />
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Paper elevation={3}>
                    <Box p={1}>
                        <UserList />
                    </Box>
                </Paper>
            </Container>
        </>
    )
}

export default UserListPage
