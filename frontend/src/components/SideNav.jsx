import NavLink from "./NavLink"
import { RxDashboard, RxLayers } from "react-icons/rx"


export default function SideNav() {
  return (
    <aside className="w-[16%] bg-[#377DF6] p-4">
        <div className="flex flex-col gap-10">
            <div>
                <h1 className="text-2xl font-semibold">Truck Driver HOS</h1>
            </div>
            <div className="flex flex-col gap-2">
                <NavLink
                    icon={<RxDashboard size={23} color="white" />}
                    linkName="Home"
                />
                <NavLink
                    icon={<RxLayers size={23} color="white" />}
                    linkName="Past logs"
                />
            </div>
        </div>
    </aside>
  )
}


{/* <RxLayers size={23}/> */}
