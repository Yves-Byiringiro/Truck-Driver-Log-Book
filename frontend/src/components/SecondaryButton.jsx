import { FiPlus } from 'react-icons/fi';


export default function SecondaryButton({onClick}) {
    return (
        <button
            onClick={onClick}
            className="flex justify-center items-center bg-[#202124] w-12 h-12 rounded-full transition duration-200 ease-in-out cursor-pointer"
            aria-label="Add"
        >
        <FiPlus size={24} className="text-[#D2FD51]" />
      </button>
    )
  }
