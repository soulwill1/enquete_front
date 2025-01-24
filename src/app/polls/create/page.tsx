import PollCreate from '@/app/components/PollCreate'
import React from 'react'
import Link from 'next/link';


const CreatePage = () => {
  return (
    <div>
      <PollCreate />
      <div className='pt-3'>
        <Link href="/" className="bg-blue-500 text-white py-2 px-4 rounded">Voltar</Link>
      </div>
    </div>
  )
}

export default CreatePage