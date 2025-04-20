import React from 'react'

export default function PageInfoSection({msg}) {
  return (
    <div className='flex flex-row justify-center'>
        <div className='w-[60%] bg-white shadow-md rounded-lg p-6 '>
        <div className='flex flex-col items-center'>
            <h1 className='text-2xl font-semibold'>Hi Yves</h1>
            {msg && <div className='text-lg font-light'>{msg}</div>}
        </div>
        </div>
    </div>

  )
}
