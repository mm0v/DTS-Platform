import { Outlet } from "react-router-dom"
import ProfileSidebar from "../components/ProfileSidebar"

const Profile = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-[#f1f1f1]">
            <ProfileSidebar />
            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>
    )
}

export default Profile