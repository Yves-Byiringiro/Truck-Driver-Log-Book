

export default function NavLink({icon, linkName}) {
  return (
    <div className="flex flex-row items-center gap-1 p-2 bg-[#4D76BC ] hover:bg-[#285DBA] rounded-md cursor-pointer transition duration-200 ease-in-out">
        {icon}
        <span className="text-white text-base">{linkName}</span>
    </div>
  )
}


