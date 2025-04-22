import NavLink from "./NavLink"
import { RxDashboard, RxLayers } from "react-icons/rx"


export default function SideNav() {
  return (
    <aside className="w-[16%] bg-[#377DF6] p-4">
        <div className="flex flex-col gap-10">
            <div className="">
                hh
                <h1 className="text-2xl font-semibold hidden">Truck Driver HOS</h1>
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


{/* <RxLayers size={23}/> */}
