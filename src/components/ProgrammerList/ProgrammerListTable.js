import React from 'react'
import FormatDate from '@/lib/FormatDate'
import SocialLogo from '@/components/SocialLogo/SocialLogo'
import CheckIcon from '@mui/icons-material/Check'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Paper,
    Box,
} from '@mui/material'

const UserListTable = ({ datalist, loading }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>IDss</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Email Verified</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell>Updated At</TableCell>
                        <TableCell>OAuth Providers</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={7} align="center">
                                <CircularProgress />
                            </TableCell>
                        </TableRow>
                    ) : datalist.length > 0 ? (
                        datalist.map(item => (
                            <TableRow
                                key={item?.id}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.04)', // Hover effect
                                    },
                                }}>
                                <TableCell>{item?.id}</TableCell>
                                <TableCell>{item?.name}</TableCell>
                                <TableCell>{item?.email}</TableCell>
                                <TableCell>
                                    {item?.is_email_verified ? (
                                        <CheckIcon />
                                    ) : (
                                        '---'
                                    )}
                                </TableCell>
                                <TableCell>
                                    <FormatDate dateString={item?.created_at} />
                                </TableCell>
                                <TableCell>
                                    <FormatDate dateString={item?.updated_at} />
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" gap={1}>
                                        {item?.o_auth_providers.length > 0
                                            ? item.o_auth_providers.map(
                                                  provider => (
                                                      <SocialLogo
                                                          key={provider?.id}
                                                          logoName={
                                                              provider?.provider
                                                          }
                                                      />
                                                  ),
                                              )
                                            : '---'}
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7} align="center">
                                No users found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UserListTable
