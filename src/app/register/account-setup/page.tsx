'use client'

import { FormData } from '@/app/context/FormContext'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useFormContext } from 'react-hook-form'

const AccountSetupStepPage = () => {
  const ref = useRef<HTMLDivElement>(null)
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<FormData>()

  const router = useRouter()

  const handleNext = () => {
    const username = watch('username')
    const password = watch('password')
    const confirmPassword = watch('confirmPassword')

    if (!username || username.length < 4) return
    if (!password || password.length < 6) return
    if (password !== confirmPassword) return

    router.push('review')
  }

  const handlePrev = () => router.push('address-details')

  useEffect(() => {
    if (!watch('street') || !watch('city') || !watch('zip')) return router.push('address-details')
    if (!ref.current) return
    ref.current.style.opacity = '1'
  }, [watch, router])

  return (
    <main className="flex items-center min-h-screen">
      <div
        ref={ref}
        className="max-w-md mx-auto opacity-0 relative w-full overflow-hidden z-10 bg-gray-800 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Account Setup</h2>

        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300" htmlFor="username">
              Username
            </label>
            <input id="username" {...register('username')} className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white" type="text" />
            <p className="text-error">{errors?.username?.message}</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300" htmlFor="password">
              Password
            </label>
            <input id="password" {...register('password')} className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white" type="password" />
            <p className="text-error">{errors?.password?.message}</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input id="confirmPassword" {...register('confirmPassword')} className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white" type="password" />
            <p className="text-error">{errors?.confirmPassword?.message}</p>
          </div>

          <div className="flex justify-between">
            <button onClick={handlePrev} className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80" type="submit">
              Previous
            </button>
            <button onClick={handleNext} className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80" type="submit">
              Submit
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AccountSetupStepPage
