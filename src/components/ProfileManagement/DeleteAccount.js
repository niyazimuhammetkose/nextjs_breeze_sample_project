import React from 'react'
import { Typography, Button, Box } from '@mui/material'

const DeleteAccount = () => {
    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
                Delete Account
            </Typography>
            <Typography variant="body1" gutterBottom>
                Once you delete your account, there is no going back. Please be certain.
            </Typography>
            <Button variant="contained" color="error" sx={{ mt: 2 }}>
                Delete Account
            </Button>
        </Box>
    )
}

export default DeleteAccount
