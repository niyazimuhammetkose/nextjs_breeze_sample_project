'use client'

import { useEffect, useState } from 'react'
import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import axios from '@/lib/axios'
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    Modal,
    Paper,
    Typography,
} from '@mui/material'
import Box from '@mui/material/Box'

const TokenManagement = () => {
    const [tokens, setTokens] = useState([])
    const [tokenName, setTokenName] = useState('')
    const [plainTextToken, setPlainTextToken] = useState(null)
    const [errors, setErrors] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [permissions, setPermissions] = useState([])

    useEffect(() => {
        listToken()
    }, [])

    const handleCheckboxChange = permission => {
        setPermissions(prev => {
            if (prev.includes(permission)) {
                return prev.filter(p => p !== permission)
            } else {
                return [...prev, permission]
            }
        })
    }
    console.log('permissions:', permissions)

    // API token listeleme
    const listToken = async () => {
        setErrors([])

        await axios
            .get('/api/tokens')
            .then(response => {
                setTokens(response.data != null ? response.data : [])
            })
            .catch(error => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors)
                }
            })
    }

    // API token oluşturma
    const createToken = async () => {
        setErrors([])

        const params = {
            token_name: tokenName,
            permissions: permissions,
        }

        await axios
            .post('/api/tokens', params)
            .then(response => {
                setPlainTextToken(response.data.token) // Token'ı sakla
                setOpenModal(true) // Modal'ı aç
                setTokenName('') // Input'u temizle
                listToken()
            })
            .catch(error => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors)
                }
            })
    }

    // Token silme
    const deleteToken = async tokenId => {
        try {
            await axios.delete(`/api/tokens/${tokenId}`)
            setTokens(tokens.filter(token => token.id !== tokenId))
        } catch (error) {
            console.error('Token silinirken hata oluştu:', error)
        }
    }

    return (
        <>
            <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Manage API Tokens</h2>

                {/* Token Oluşturma Formu */}
                <div className="mb-6">
                    <h3 className="font-semibold">Create New Token</h3>
                    <div className="mt-4">
                        <Input
                            id="tokenName"
                            name="token_name"
                            type="text"
                            value={tokenName}
                            placeholder="Token Name"
                            className="block w-full"
                            onChange={e => setTokenName(e.target.value)}
                        />
                        <InputError
                            messages={errors.token_name}
                            className="mt-2"
                        />

                        <Typography
                            variant="body2"
                            color="textSecondary"
                            gutterBottom>
                            If no options are selected, all permissions will be
                            granted.
                        </Typography>
                        <FormGroup row={true}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={permissions.includes('create')}
                                        onChange={() =>
                                            handleCheckboxChange('create')
                                        }
                                    />
                                }
                                label="Create"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={permissions.includes('read')}
                                        onChange={() =>
                                            handleCheckboxChange('read')
                                        }
                                    />
                                }
                                label="Read"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={permissions.includes('update')}
                                        onChange={() =>
                                            handleCheckboxChange('update')
                                        }
                                    />
                                }
                                label="Update"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={permissions.includes('delete')}
                                        onChange={() =>
                                            handleCheckboxChange('delete')
                                        }
                                    />
                                }
                                label="Delete"
                            />
                        </FormGroup>
                        <InputError
                            messages={errors.permissions}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <Button onClick={createToken} className="ml-3">
                            Create Token
                        </Button>
                    </div>
                </div>

                {/* Token Modal */}
                <Modal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description">
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 600,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                        }}>
                        <h2 id="modal-title" className="text-xl font-semibold">
                            Your API Token
                        </h2>
                        <p id="modal-description" className="mt-2">
                            Please copy your new API token. For your security,
                            it won’t be shown again.
                        </p>
                        <Input
                            type="text"
                            readOnly
                            value={plainTextToken}
                            className="mt-4 bg-gray-100 px-4 py-2 rounded font-mono text-sm text-gray-500 w-full"
                        />
                        <div className="mt-4">
                            <Button onClick={() => setOpenModal(false)}>
                                Close
                            </Button>
                        </div>
                    </Box>
                </Modal>

                {/* Token Listesi */}
                <div className="mt-6">
                    <h3 className="font-semibold">Your API Tokens</h3>
                    <ul className="mt-4">
                        {tokens.length > 0
                            ? tokens.map((token, index) => (
                                  <li
                                      key={index}
                                      className="flex justify-between items-center py-2">
                                      <span>{token?.name}</span>
                                      <Button
                                          onClick={() => deleteToken(token?.id)}
                                          className="bg-red-500 text-white">
                                          Delete
                                      </Button>
                                  </li>
                              ))
                            : 'No Tokens Found'}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default TokenManagement
