'use client'
import { step1Schema, step2Schema, step3Schema } from '@/app/validation/registerFormValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode } from 'react'
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const fullFormSchema = step1Schema.and(step2Schema).and(step3Schema)

export type FormData = z.infer<typeof fullFormSchema>

const FormContextProvider = ({ children }: { children: ReactNode }) => {
  const methods = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(fullFormSchema),
  })
  const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data)

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  )
}
export default FormContextProvider
