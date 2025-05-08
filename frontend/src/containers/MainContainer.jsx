import { useState } from "react";
import { useSelector } from "react-redux";
import SideNav from "../components/SideNav"
import { IoMdMenu } from "react-icons/io";


export default function MainContainer({children}) {
    const { user } = useSelector(state => state.auth);

    const [sideNavOpen, setSideNavOpen] = useState(false);
    const toggleSideNav = () => setSideNavOpen((prev) => !prev);

  return (
    <div className="flex flex-row h-screen w-screen bg-gray-100 relative">
        <SideNav isOpen={sideNavOpen} toggleSideNav={toggleSideNav}/>
        <section className='w-[84%] bg-[#F5F5F7] p-4'>
            {!sideNavOpen && <div className="lg:hidden mb-4">
                <button onClick={toggleSideNav} className="cursor-pointer">
                    <IoMdMenu size={30} color="#377DF6"/>
                </button>
            </div>
            }
            <div className="flex justify-end">
                <div className=" bg-[#202124] px-3 py-1.5 inline-flex gap-4 rounded-lg cursor-pointer">
                    <h3 className="text-white text-base font-light">{user?.driver_number}</h3>
                    <div className="border border-[#D2FD51] rounded-full p-2 w-7 h-7 flex items-center justify-center">
                        <span className="text-[#D2FD51] text-xs">{user?.driver_initials}</span>
                    </div>
                </div>
            </div>
            <div>
            <div className="mt-10">
                {children}
            </div>
            </div>
        </section>
    </div>

    // <div className="flex flex-row h-screen w-screen bg-gray-100 relative">
    //   <SideNav isOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
    //   <section className="flex-1 bg-[#F5F5F7] p-4 lg:ml-[16%]">
    //     {/* Menu toggle button for mobile */}
    //     <div className="lg:hidden mb-4">
    //       <button onClick={toggleSideNav} className="text-[#377DF6] text-2xl">
    //         <IoMdMenu />
    //       </button>
    //     </div>

    //     {/* Top bar */}
    //     <div className="flex justify-end">
    //       <div className="bg-[#202124] px-3 py-1.5 inline-flex gap-4 rounded-lg cursor-pointer">
    //         <h3 className="text-white text-base font-light">7Y-56-783</h3>
    //         <div className="border border-[#D2FD51] rounded-full p-2 w-7 h-7 flex items-center justify-center">
    //           <span className="text-[#D2FD51] text-xs">YB</span>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Content */}
    //     <div className="mt-10">{children}</div>
    //   </section>
    // </div>
  )
}
