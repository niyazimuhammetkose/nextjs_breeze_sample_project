import dynamic from 'next/dynamic'
import Header from '@/app/(app)/Header'
import Loading from '@/app/(app)/Loading'
import { Container } from '@mui/material'

const CustomApiRequest = dynamic(
    () => import('@/components/CustomApiRequest/CustomApiRequest'),
    {
        ssr: false,
        loading: () => <Loading />,
    },
)

const CustomRequestPage = () => {
    return (
        <>
            <Header title="User List" />
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <CustomApiRequest />
            </Container>
        </>
    )
}

export default CustomRequestPage
