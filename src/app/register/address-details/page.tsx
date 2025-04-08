'use client'

import FormContainer from '@/app/components/FormContainer'
import { FormData } from '@/app/context/FormContext'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useFormContext } from 'react-hook-form'

const AddressDetailsStepPage = () => {
  const ref = useRef<HTMLDivElement>(null)
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<FormData>()

  const router = useRouter()

  useEffect(() => {
    if (!watch('fullName') || !watch('email') || !watch('phone')) return router.push('personal-info')
    if (!ref.current) return
    ref.current.style.opacity = '1'
  }, [watch, router])

  const handleNext = () => {
    if (!watch('street') || !watch('city') || !watch('zip')) return false
    if (errors?.street?.message || errors?.city?.message || errors?.zip?.message) return false
    router.push('account-setup')
  }

  const handlePrev = () => router.push('personal-info')

  return (
    <main className="flex items-center min-h-screen px-4">
      <FormContainer className="opacity-0" ref={ref}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Address Details</h2>

        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="streetAddress">
              Street Address
            </label>
            <input
              id="streetAddress"
              {...register('street')}
              className="mt-1 p-2 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white"
              type="text"
            />
            <p className="text-error">{errors?.street?.type !== 'invalid_type' && errors?.street?.message}</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="city">
              City
            </label>
            <input
              id="city"
              {...register('city')}
              className="mt-1 p-2 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white"
              type="text"
            />
            <p className="text-error">{errors?.city?.type !== 'invalid_type' && errors?.city?.message}</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="zipCode">
              Zip Code
            </label>
            <input
              id="zipCode"
              {...register('zip')}
              className="mt-1 p-2 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white"
              type="text"
            />
            <p className="text-error">{errors?.zip?.type !== 'invalid_type' && errors?.zip?.message}</p>
          </div>

          <div className="flex justify-between">
            <button onClick={handlePrev} className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80" type="button">
              Previous
            </button>
            <button onClick={handleNext} className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80" type="submit">
              Next
            </button>
          </div>
        </div>
      </FormContainer>
    </main>
  )
}

export default AddressDetailsStepPage
