

export default function Input({label, type}) {
  return (
    <div className='flex flex-col gap-2'>
        <label htmlFor="startDate" className='text-sm font-light'>{label}</label>
        <input type={type} id="startDate" className='border border-gray-300 rounded-md p-2' />
    </div>
  )
}
