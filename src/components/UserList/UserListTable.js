import FormatDate from '@/lib/FormatDate'
import SocialLogo from '@/components/SocialLogo/SocialLogo'
import CheckIcon from '@mui/icons-material/Check'

const UserListTable = ({ users, loading }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="w-1/2 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email Verified
                        </th>
                        <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Created At
                        </th>
                        <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Updated At
                        </th>
                        <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            OAuth Providers
                        </th>
                    </tr>
                </thead>

                {loading ? (
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td
                                colSpan="6"
                                className="px-6 py-4 text-center text-sm text-gray-500">
                                Loading...
                            </td>
                        </tr>
                    </tbody>
                ) : (
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.length > 0 ? (
                            users.map(user => (
                                <tr
                                    key={user?.id}
                                    className="hover:bg-gray-100">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {user?.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user?.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user?.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user?.is_email_verified ? (
                                            <CheckIcon />
                                        ) : (
                                            '---'
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <FormatDate
                                            dateString={user?.created_at}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <FormatDate
                                            dateString={user?.updated_at}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex space-x-2">
                                            {user?.o_auth_providers.length >
                                            0 ? (
                                                user.o_auth_providers.map(
                                                    provider => (
                                                        <SocialLogo
                                                            key={provider?.id}
                                                            logoName={
                                                                provider?.provider
                                                            }
                                                        />
                                                    ),
                                                )
                                            ) : (
                                                <span>---</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="px-6 py-4 text-center text-sm text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                )}
            </table>
        </div>
    )
}

export default UserListTable
