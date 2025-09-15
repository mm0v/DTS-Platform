import { NavLink } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import BusinessIcon from "@mui/icons-material/Business";

const ProfileSidebar = () => {
  return (
    <div className="w-full lg:w-1/4 p-4 lg:min-h-screen">
      <ul className="space-y-2 bg-white p-[24px] rounded-[14px]">
        <li>
          <NavLink
            to="/profile/application"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded transition ${
                isActive
                  ? "bg-[#e9edf3] text-[#1a4381]"
                  : "bg-transparent text-[#000] hover:bg-[#e9edf3] hover:text-[#1a4381]"
              }`
            }
          >
            <GroupIcon />
            Müraciətlər
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile/administration"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded transition ${
                isActive
                  ? "bg-[#e9edf3] text-[#1a4381]"
                  : "bg-transparent text-[#000] hover:bg-[#e9edf3] hover:text-[#1a4381]"
              }`
            }
          >
            <BusinessIcon />
            İnzibatçılıq
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile/report"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded transition ${
                isActive
                  ? "bg-[#e9edf3] text-[#1a4381]"
                  : "bg-transparent text-[#000] hover:bg-[#e9edf3] hover:text-[#1a4381]"
              }`
            }
          >
            <BusinessIcon />
            Hesabatlar
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
