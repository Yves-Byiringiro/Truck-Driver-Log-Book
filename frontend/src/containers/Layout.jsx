import SideNav from "../components/SideNav"
import MainContainer from "./MainContainer"

export default function Layout() {
  return (
    <main>
        <div className="flex flex-row h-screen w-screen bg-gray-100 ">
            <SideNav />
            <MainContainer />
        </div>
    </main>
  )
}
