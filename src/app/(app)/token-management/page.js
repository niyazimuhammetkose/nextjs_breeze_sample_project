import dynamic from 'next/dynamic'
import Header from '@/app/(app)/Header'
import Loading from '@/app/(app)/Loading'
import { Box, Container, Paper } from '@mui/material'

const TokenManagement = dynamic(
    () => import('@/components/TokenManagement/TokenManagement'),
    {
        ssr: false,
        loading: () => <Loading />,
    },
)

const TokenManagementPage = () => {
    return (
        <>
            <Header title="Token Management" />
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Paper elevation={3}>
                    <Box p={1}>
                        <TokenManagement />
                    </Box>
                </Paper>
            </Container>
        </>
    )
}

export default TokenManagementPage
