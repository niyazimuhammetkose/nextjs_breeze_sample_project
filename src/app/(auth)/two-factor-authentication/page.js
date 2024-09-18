'use client'

import { useState } from 'react'
import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { useAuth } from '@/hooks/auth'

const TwoFactorAuthenticationPage = () => {
    const { verifyTwoFactorCode } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [code, setCode] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = async event => {
        event.preventDefault()

        await verifyTwoFactorCode({
            code,
            setErrors,
            setStatus,
        })
    }

    return (
        <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-xl font-bold mb-4">
                Two-Factor Authentication
            </h1>

            {status && <div className="mb-4 text-green-600">{status}</div>}

            <form onSubmit={submitForm}>
                {/* Two-Factor Code */}
                <div>
                    <Label htmlFor="code">Verification Code</Label>
                    <Input
                        id="code"
                        type="text"
                        value={code}
                        className="block mt-1 w-full"
                        onChange={event => setCode(event.target.value)}
                        required
                    />
                    <InputError messages={errors.code} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button className="ml-3">Verify Code</Button>
                </div>
            </form>
        </div>
    )
}

export default TwoFactorAuthenticationPage
