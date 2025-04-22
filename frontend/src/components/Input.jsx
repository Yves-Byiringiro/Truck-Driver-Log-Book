

export default function Input({label, type, value, onChange, editable, error, options}) {
  return (
    <div className='flex flex-col gap-2'>
        <label htmlFor="startDate" className='text-sm font-light'>{label}</label>
        {type == 'select'? (<select
            className="border border-gray-300 rounded-md p-2 focus:outline-none font-light"
            value={value}
            onChange={(e) => {
              if (editable) onChange(e.target.value);
            }}
            disabled={!editable}
          >
          <option value="">Select duty status</option>
          {options.map(({key, value}) => (
            <option value={key} key={key}>{value}</option>
          ))}
        </select>)
        : ( <input
            type={type}
            id={label}
            value={value}
            onChange={(e) => {
                if (editable) onChange(e.target.value);
            }}
            readOnly={!editable}
            className='border border-gray-300 rounded-md p-2 focus:outline-none'
        />)}
      {error && <div className="text-xs text-red-500">{error}</div>}
    </div>
  )
}
