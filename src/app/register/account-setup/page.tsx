'use client'

import Card from '@/app/components/Card'
import FormContainer from '@/app/components/FormContainer'
import { FormData } from '@/app/context/FormContext'
import useSubmit from '@/app/hooks/useSubmit'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

const AccountSetupStepPage = () => {
  const ref = useRef<HTMLDivElement>(null)
  const {
    register,
    formState: { errors },
    watch,
    getValues,
    reset,
  } = useFormContext<FormData>()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const mutation = useSubmit()

  const handleNext = () => {
    const username = watch('username')
    const password = watch('password')
    const confirmPassword = watch('confirmPassword')

    if (!username || username.length < 4) return
    if (!password || password.length < 6) return
    if (password !== confirmPassword) return

    setIsLoading(true)
    mutation.mutate(getValues(), {
      onSuccess: (data) => {
        console.log('✅ Data submitted successfully:', data)
        if (data) setIsSuccess(true)
        reset()
        setTimeout(() => router.push('personal-info'), 2000)
        setIsLoading(false)
      },
      onError: () => {
        setIsLoading(false)
        alert('❌ Submission failed:')
      },
    })
  }

  const handlePrev = () => router.push('address-details')

  useEffect(() => {
    if (!watch('street') || !watch('city') || !watch('zip')) return router.push('address-details')
    if (!ref.current) return
    ref.current.style.opacity = '1'
  }, [watch, router])

  const summary = Object.entries(getValues())

  return (
    <main className="flex items-center min-h-screen px-4 bg-white dark:bg-gray-900 transition-colors">
      <FormContainer className="opacity-0" ref={ref}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Account Setup</h2>
        {isSuccess ? (
          <div className="text-center text-green-600 dark:text-green-400 font-semibold text-xl">✅ Data submitted successfully!</div>
        ) : (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                {...register('username')}
                className="mt-1 p-2 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white"
                type="text"
              />
              <p className="text-red-500 text-sm mt-1">{errors?.username?.type !== 'invalid_type' && errors?.username?.message}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                {...register('password')}
                className="mt-1 p-2 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white"
                type="password"
              />
              <p className="text-red-500 text-sm mt-1">{errors?.password?.type !== 'invalid_type' && errors?.password?.message}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                {...register('confirmPassword')}
                className="mt-1 p-2 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white"
                type="password"
              />
              <p className="text-red-500 text-sm mt-1">{errors?.confirmPassword?.type !== 'invalid_type' && errors?.confirmPassword?.message}</p>
            </div>

            <Card title="Summary">
              {summary.length > 0 &&
                summary
                  .filter(([key]) => !['username', 'password', 'confirmPassword'].includes(key))
                  .map(([key, val]) => {
                    return (
                      <p key={key}>
                        <span className="font-semibold capitalize text-gray-800 dark:text-white">{key}: </span>
                        <span className="text-gray-700 dark:text-gray-300">{val}</span>
                      </p>
                    )
                  })}
            </Card>

            <div className="flex justify-between mt-6">
              <button onClick={handlePrev} className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80 transition" type="button">
                Previous
              </button>
              <button
                disabled={isLoading}
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700 text-white px-4 py-2 font-bold rounded-md hover:opacity-80 transition"
                type="submit"
              >
                {isLoading ? (
                  <div className="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 size-4 aspect-square rounded-full">
                    <div className="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 background-blur-md"></div>
                  </div>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </div>
        )}
      </FormContainer>
    </main>
  )
}

export default AccountSetupStepPage
