'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'
import SocialLogo from '@/components/SocialLogo/SocialLogo'

const Login = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async event => {
        event.preventDefault()

        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        })
    }

    return (
        <>
            <AuthSessionStatus className="mb-4" status={status} />
            <form onSubmit={submitForm}>
                {/* Email Address */}
                <div>
                    <Label htmlFor="email">Email</Label>

                    <Input
                        id="email"
                        type="email"
                        value={email}
                        className="block mt-1 w-full"
                        onChange={event => setEmail(event.target.value)}
                        required
                        autoFocus
                    />

                    <InputError messages={errors.email} className="mt-2" />
                </div>

                {/* Password */}
                <div className="mt-4">
                    <Label htmlFor="password">Password</Label>

                    <Input
                        id="password"
                        type="password"
                        value={password}
                        className="block mt-1 w-full"
                        onChange={event => setPassword(event.target.value)}
                        required
                        autoComplete="current-password"
                    />

                    <InputError messages={errors.password} className="mt-2" />
                </div>

                {/* Remember Me */}
                <div className="block mt-4">
                    <label
                        htmlFor="remember_me"
                        className="inline-flex items-center">
                        <input
                            id="remember_me"
                            type="checkbox"
                            name="remember"
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={event =>
                                setShouldRemember(event.target.checked)
                            }
                        />

                        <span className="ml-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href="/register"
                        className="ml-4 underline text-sm text-gray-600 hover:text-gray-900">
                        Register
                    </Link>
                    <Link
                        href="/forgot-password"
                        className="ml-4 underline text-sm text-gray-600 hover:text-gray-900">
                        Forgot your password?
                    </Link>

                    <Button className="ml-3">Login</Button>
                </div>
            </form>
            <div className="flex justify-center mt-4">
                <div className="flex flex-col items-start gap-3">
                    <div className="flex items-center gap-3">
                        <SocialLogo logoName="google" />
                        <Link
                            href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/login/google`}>
                            <span className="underline text-sm text-gray-600 hover:text-gray-900">
                                Sign in with Google
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <SocialLogo logoName="facebook" />
                        <Link
                            href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/login/facebook`}>
                            <span className="underline text-sm text-gray-600 hover:text-gray-900">
                                Sign in with Facebook
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <SocialLogo logoName="github" />
                        <Link
                            href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/login/github`}>
                            <span className="underline text-sm text-gray-600 hover:text-gray-900">
                                Sign in with Github
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <SocialLogo logoName="linkedin-openid" />
                        <Link
                            href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/login/linkedin-openid`}>
                            <span className="underline text-sm text-gray-600 hover:text-gray-900">
                                Sign in with Linkedin
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <SocialLogo logoName="apple" />
                        <Link
                            href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/login/apple`}
                            aria-disabled="true"
                            tabIndex="-1"
                            style={{
                                pointerEvents: 'none',
                                opacity: 0.6,
                            }}>
                            <span className="underline text-sm text-gray-600 hover:text-gray-900">
                                Sign in with Apple
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <SocialLogo logoName="x" />
                        <Link
                            href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/login/x`}
                            aria-disabled="true"
                            tabIndex="-1"
                            style={{
                                pointerEvents: 'none',
                                opacity: 0.6,
                            }}>
                            <span className="underline text-sm text-gray-600 hover:text-gray-900">
                                Sign in with X
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
