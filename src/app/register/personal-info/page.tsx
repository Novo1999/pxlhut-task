'use client'

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
    <main className="flex items-center min-h-screen">
      <div className="max-w-md mx-auto relative w-full overflow-hidden z-10 bg-gray-800 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
        <h2 className="text-2xl font-bold text-white mb-6">Personal Info</h2>

        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300" htmlFor="name">
              Full Name
            </label>
            <input id="name" {...register('fullName')} className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white" type="text" />
            <p className="text-error">{errors?.fullName?.message}</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300" htmlFor="email">
              Email Address
            </label>
            <input id="email" {...register('email')} className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white" type="email" />
            <p className="text-error">{errors?.email?.message}</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300" htmlFor="phone">
              Phone
            </label>
            <input id="phone" {...register('phone')} className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white" type="number" />
            <p className="text-error">{errors?.phone?.message}</p>
          </div>

          <div className="flex justify-end">
            <button onClick={handleNext} className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80" type="submit">
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default PersonalInfoStepPage
