import dynamic from 'next/dynamic'
import Header from '@/app/(app)/Header'
import Loading from '@/app/(app)/Loading'
import { Container } from '@mui/material'
import CustomApiRequest from '@/components/CustomApiRequest/CustomApiRequest'

const DataList = dynamic(() => import('@/components/DataList/DataList'), {
    ssr: false,
    loading: () => <Loading />,
})

const ProgrammerListPage = () => {
    return (
        <>
            <Header title="Programmer List" />
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <DataList
                    pageName={'ProgrammerList'}
                    endpoint={'/programmers'}
                    enableBasicSearch={true}
                />
                <CustomApiRequest />
            </Container>
        </>
    )
}

export default ProgrammerListPage
