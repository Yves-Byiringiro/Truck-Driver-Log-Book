import NavLink from "./NavLink"
import { RxDashboard, RxLayers } from "react-icons/rx"
import { IoMdClose } from "react-icons/io";


export default function SideNav({isOpen, toggleSideNav}) {
  return (
    <aside
        className={`
            bg-[#377DF6]
            fixed lg:relative sm:p-4 z-40 top-0 left-0 h-full
            transition-all duration-300 ease-in-out
            ${isOpen ? "sm:w-[16%] p-4": "w-0 p-0"}
            lg:w-[16%] overflow-hidden relative
        `}
        >
        {isOpen && <button className="cursor-pointer" onClick={toggleSideNav}>
            <IoMdClose size={30} color="#FFFFFF"/>
        </button>
        }
        <div className="flex flex-col gap-10">
            <div className="">
                <h1 className="text-2xl font-semibold">Truck Driver HOS</h1>
            </div>
            <div className="flex flex-col gap-2">
                <NavLink
                    icon={<RxDashboard size={23} color="white" />}
                    linkName={"Home"}
                    path={"/"}
                />
                <NavLink
                    icon={<RxLayers size={23} color="white" />}
                    linkName={"Past logs"}
                    path={"/past-logs"}
                />
            </div>
        </div>
    </aside>
  )
}