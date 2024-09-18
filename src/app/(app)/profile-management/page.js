import dynamic from 'next/dynamic'
import Header from '@/app/(app)/Header'
import Loading from '@/app/(app)/Loading'
import { Box, Container, Paper } from '@mui/material'

const ProfileManagement = dynamic(
    () => import('@/components/ProfileManagement/ProfileManagement'),
    {
        ssr: false,
        loading: () => <Loading />,
    },
)

const ProfileManagementPage = () => {
    return (
        <>
            <Header title="Profile Management" />
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Paper elevation={3}>
                    <Box p={1}>
                        <ProfileManagement />
                    </Box>
                </Paper>
            </Container>
        </>
    )
}

export default ProfileManagementPage
