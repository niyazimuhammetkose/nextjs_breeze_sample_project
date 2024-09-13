import UserListTable from '@/components/UserList/UserListTable'
import ProgrammerListTable from '@/components/ProgrammerList/ProgrammerListTable'

const DataListTable = ({ pageName, datalist, loading }) => {
    const SelectedDataListTableComponent =
        pageName == 'UserList' ? (
            <UserListTable datalist={datalist} loading={loading} />
        ) : pageName == 'ProgrammerList' ? (
            <ProgrammerListTable datalist={datalist} loading={loading} />
        ) : (
            ''
        )
    return SelectedDataListTableComponent
}

export default DataListTable
