'use client'

import FormContainer from '@/app/components/FormContainer'
import { FormData } from '@/app/context/FormContext'
import { useRouter } from 'next/navigation'
import { useFormContext } from 'react-hook-form'

const PersonalInfoStepPage = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<FormData>()

  const router = useRouter()

  const handleNext = () => {
    if (!watch('fullName') || !watch('email') || !watch('phone')) return false
    if (errors?.fullName?.message || errors?.email?.message || errors?.phone?.message) return false
    router.push('address-details')
  }

  return (
    <main className="flex items-center min-h-screen px-4">
      <FormContainer>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Personal Info</h2>

        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              {...register('fullName')}
              className="mt-1 p-2 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white"
              type="text"
            />
            <p className="text-error">{errors?.fullName?.type !== 'invalid_type' && errors?.fullName?.message}</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              {...register('email')}
              className="mt-1 p-2 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white"
              type="email"
            />
            <p className="text-error">{errors?.email?.type !== 'invalid_type' && errors?.email?.message}</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              {...register('phone')}
              className="mt-1 p-2 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white"
              type="number"
            />
            <p className="text-error">{errors?.phone?.type !== 'invalid_type' && errors?.phone?.message}</p>
          </div>

          <div className="flex justify-end">
            <button onClick={handleNext} className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80" type="submit">
              Next
            </button>
          </div>
        </div>
      </FormContainer>
    </main>
  )
}

export default PersonalInfoStepPage
