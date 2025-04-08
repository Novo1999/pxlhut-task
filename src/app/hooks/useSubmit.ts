import { FormData } from '@/app/context/FormContext'
import { useMutation } from '@tanstack/react-query'

const BASE_URL = 'http://localhost:3000/'

const submitData = async (formData: FormData) => {
  const res = await fetch(BASE_URL + '/api/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  if (!res.ok) {
    throw new Error('Failed to submit data')
  }

  const data = await res.json()
  return data
}

const useSubmit = () => {
  const mutation = useMutation({
    mutationFn: (data: FormData) => submitData(data),
  })

  return mutation
}

export default useSubmit
