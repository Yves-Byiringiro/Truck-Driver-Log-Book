

export default function Input({label, type, value, onChange, editable}) {
  return (
    <div className='flex flex-col gap-2'>
        <label htmlFor="startDate" className='text-sm font-light'>{label}</label>
        <input
            type={type}
            id={label}
            value={value}
            onChange={(e) => {
                if (editable) onChange(e.target.value);
            }}
            readOnly={!editable}
            className='border border-gray-300 rounded-md p-2 focus:outline-none'
        />
    </div>
  )
}
