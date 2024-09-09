import dynamic from 'next/dynamic'
import Header from '@/app/(app)/Header'
import Loading from '@/app/(app)/Loading'

const UserList = dynamic(() => import('@/components/UserList/UserList'), {
    ssr: false,
    loading: () => <Loading />,
})

const UserListPage = () => {
    return (
        <>
            <Header title="User List" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <UserList />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserListPage
