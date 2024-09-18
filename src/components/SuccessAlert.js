import React from 'react'
import { Alert, Snackbar } from '@mui/material'

const SuccessAlert = ({ messages = [], isSnackbar = false, showSnackbar = false, onCloseSnackbar, autoHideDuration = 6000 }) => {
    if (messages.length === 0) return null;

    if (isSnackbar) {
        return (
            <Snackbar
                open={showSnackbar}
                autoHideDuration={autoHideDuration}
                onClose={onCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <div>
                    {messages.map((message, index) => (
                        <Alert 
                            key={index} 
                            onClose={onCloseSnackbar} 
                            severity="success"
                            style={{ marginTop: '50px' }}
                        >
                            {message}
                        </Alert>
                    ))}
                </div>
            </Snackbar>
        );
    }

    return (
        <div>
            {messages.map((message, index) => (
                <Alert key={index} severity="success" style={{ marginBottom: '8px' }}>
                    {message}
                </Alert>
            ))}
        </div>
    );
}

export default SuccessAlert;
