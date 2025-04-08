import { ReactNode } from 'react'

type CardProp = {
  title: string
  children: ReactNode
}

const Card = ({ children, title }: CardProp) => {
  return (
    <div className="my-4 bg-gradient-to-l from-slate-300 to-slate-100 text-slate-600 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-600 border border-slate-300 space-y-2 justify-center p-4 gap-4 rounded-lg shadow-md">
      <div className="col-span-2 text-lg font-bold capitalize rounded-md underline underline-offset-8 dark:text-white">{title}</div>
      {children}
    </div>
  )
}
export default Card
