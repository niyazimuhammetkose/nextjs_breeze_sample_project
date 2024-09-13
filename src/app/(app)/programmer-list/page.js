import dynamic from 'next/dynamic'
import Header from '@/app/(app)/Header'
import Loading from '@/app/(app)/Loading'
import { Box, Container, Paper } from '@mui/material'

const ProgrammerList = dynamic(() => import('@/components/ProgrammerList/ProgrammerList'), {
    ssr: false,
    loading: () => <Loading />,
})

const ProgrammerListPage = () => {
    return (
        <>
            <Header title="Programmer List" />
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Paper elevation={3}>
                    <Box p={1}>
                        <ProgrammerList />
                    </Box>
                </Paper>
            </Container>
        </>
    )
}

export default ProgrammerListPage
