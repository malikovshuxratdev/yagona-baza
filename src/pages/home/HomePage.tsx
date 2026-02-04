import React from 'react'
import { LoginForm } from '@/components/forms'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-light-2/30">
      <div className="flex flex-col items-center gap-6 w-full px-4">
        <LoginForm />
      </div>
    </div>
  )
}

export default HomePage