import { Link, Outlet } from "react-router-dom"
import ProfileSidebar from "../components/ProfileSidebar"
import bell from '../../public/img/notification.svg'
import profile from '../../public/img/profile-pic.jpg'

const Profile = () => {
    return (
        <div className="flex flex-col">
            <header className="w-full h-[60px] flex justify-between items-center px-5 bg-white">
                <Link to={'/profile/profile_info'} className="flex items-center gap-3">
                    <img src={profile} alt="" className="w-[40px] h-[40px] rounded-[50%]" />
                    <p className="font-[500] text-[20px]">Admin</p>
                </Link>
                <Link to={'/profile/notification'}><img src={bell} alt="notification" className="h-[24px]" /></Link>
            </header>
            <div className="flex flex-col lg:flex-row min-h-screen bg-[#f1f1f1]">
                <ProfileSidebar />
                <div className="flex-1 p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Profile