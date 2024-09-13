'use client'

import DataList from '@/components/DataList/DataList'

const ProgrammerList = () => {
    return (
        <DataList pageName={'ProgrammerList'} endpoint={'/api/programmers'} />
    )
}

export default ProgrammerList
