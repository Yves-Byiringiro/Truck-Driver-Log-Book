
export default function TertiaryButton({label, onClick}) {
    return (
      <button onClick={onClick} className='border border-gray-500 hover:bg-[#202124] hover:text-[#D2FD51] py-2 w-full rounded-md transition duration-200 ease-in-out cursor-pointer'>
          <span className="font-semibold text-lg">{label}</span>
      </button>
    )
  }
