'use client'

import React from 'react'
import {
    Box,
    Typography,
    Paper,
    Grid2,
    Container,
    ListItem,
    Stack,
} from '@mui/material'
import ProfileInformation from './ProfileInformation'
import TwoFactorAuthentication from './TwoFactorAuthentication'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'
import { useAuth } from '@/hooks/auth'

const ProfileManagement = () => {
    const { user, mutate } = useAuth({ middleware: 'auth' })
    return (
        <>
            <Stack spacing={2} useFlexGap>
                <Paper square={false} elevation={3} style={{ padding: 16 }}>
                    <ProfileInformation user={user} mutate={mutate} />
                </Paper>
                <Paper square={false} elevation={3} style={{ padding: 16 }}>
                    <UpdatePassword user={user} mutate={mutate} />
                </Paper>
                <Paper square={false} elevation={3} style={{ padding: 16 }}>
                    <TwoFactorAuthentication user={user} mutate={mutate} />
                </Paper>
                <Paper square={false} elevation={3} style={{ padding: 16 }}>
                    <DeleteAccount />
                </Paper>
            </Stack>
        </>
    )
}

export default ProfileManagement
