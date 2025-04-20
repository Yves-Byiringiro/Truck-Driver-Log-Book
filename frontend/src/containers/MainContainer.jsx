import SideNav from "../components/SideNav"

export default function MainContainer({children}) {
  return (
    <div className="flex flex-row h-screen w-screen bg-gray-100 ">
        <SideNav />
        <section className='w-[84%] bg-[#F5F5F7] p-4'>
            <div className="flex justify-end">
                <div className=" bg-[#202124] px-3 py-1.5 inline-flex gap-4 rounded-lg cursor-pointer">
                    <h3 className="text-white text-base font-light">7Y-56-783</h3>
                    <div className="border border-[#D2FD51] rounded-full p-2 w-7 h-7 flex items-center justify-center">
                        <span className="text-[#D2FD51] text-xs">YB</span>
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


  )
}
