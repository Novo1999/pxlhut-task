import { forwardRef, ReactNode, Ref } from 'react'

type FormContainerProps = {
  children: ReactNode
  className?: string
}

const FormContainer = forwardRef<HTMLDivElement, FormContainerProps>(({ children, className }, ref: Ref<HTMLDivElement>) => {
  return (
    <div
      ref={ref}
      className={
        'max-w-md mx-auto relative w-full overflow-hidden z-10 dark:bg-gray-800 bg-slate-100 border border-black p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12 ' +
        className
      }
    >
      {children}
    </div>
  )
})

FormContainer.displayName = 'FormContainer'

export default FormContainer
