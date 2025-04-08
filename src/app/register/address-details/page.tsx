'use client'

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
    <main className="flex items-center min-h-screen">
      <div
        ref={ref}
        className="max-w-md mx-auto relative w-full opacity-0 overflow-hidden z-10 bg-gray-800 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Address Details</h2>

        <div>
          {/* Street Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300" htmlFor="streetAddress">
              Street Address
            </label>
            <input id="streetAddress" {...register('street')} className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white" type="text" />
            <p className="text-error">{errors?.street?.message}</p>
          </div>

          {/* City */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300" htmlFor="city">
              City
            </label>
            <input id="city" {...register('city')} className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white" type="text" />
            <p className="text-error">{errors?.city?.message}</p>
          </div>

          {/* Zip Code */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300" htmlFor="zipCode">
              Zip Code
            </label>
            <input id="zipCode" {...register('zip')} className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white" type="text" />
            <p className="text-error">{errors?.zip?.message}</p>
          </div>

          <div className="flex justify-between">
            <button onClick={handlePrev} className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80" type="submit">
              Previous
            </button>
            <button onClick={handleNext} className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80" type="submit">
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AddressDetailsStepPage
