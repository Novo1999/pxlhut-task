import ThemeToggle from '@/app/components/ThemeToggler'
import { ReactNode } from 'react'

const RegisterLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="dark:bg-black bg-white">
      <ThemeToggle />
      {children}
    </div>
  )
}
export default RegisterLayout
