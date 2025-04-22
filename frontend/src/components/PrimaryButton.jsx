
export default function PrimaryButton({label, onClick}) {
  return (
    <button onClick={onClick} className='bg-[#202124] py-2 px-6 rounded-md transition duration-200 ease-in-out cursor-pointer'>
        <span className="text-[#D2FD51] font-semibold">{label}</span>
    </button>
  )
}
