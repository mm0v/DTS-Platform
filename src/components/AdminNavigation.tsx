import { NavLink } from "react-router-dom";
import { PeopleIcon, BusinessIcon } from "../components/SVG/Admin";

function AdminNavigation() {
  return (
    <div className="w-full lg:w-1/4 p-4 lg:min-h-screen font-plus-jakarta">
      <div className="space-y-2 bg-white p-[24px] rounded-[14px] shadow-md self-start">
        <div>
          <NavLink
            to={"/admin/applies"}
            className={({ isActive }) =>
              `group ${
                isActive && "active bg-[#E8ECF2]"
              } flex items-center gap-6 px-3.5 py-2.5 hover:bg-[#E5E5E5] rounded-[4px] transition cursor-pointer `
            }
          >
            {({ isActive }) => (
              <>
                <PeopleIcon
                  color={isActive ? "#1A4381" : "#8E8E93"}
                  className="transition"
                />
                <span className="font-medium text-[14px] text-[#000000db] group-[.active]:text-[#1A4381] transition">
                  Müraciətlər
                </span>
              </>
            )}
          </NavLink>
        </div>
        <div>
          <NavLink
            to={"/admin/administration"}
            className={({ isActive }) =>
              `group ${
                isActive && "active bg-[#E8ECF2]"
              } flex items-center gap-6 px-3.5 py-2.5 hover:bg-[#E5E5E5] rounded-[4px] transition cursor-pointer `
            }
          >
            {({ isActive }) => (
              <>
                <BusinessIcon
                  color={isActive ? "#1A4381" : "#8E8E93"}
                  className="transition"
                />
                <span className="font-medium text-[14px] text-[#000000db] group-[.active]:text-[#1A4381] transition">
                  İnzibatçılıq
                </span>
              </>
            )}
          </NavLink>
        </div>
        <div>
          <NavLink
            to={"/admin/reports"}
            className={({ isActive }) =>
              `group ${
                isActive && "active bg-[#E8ECF2]"
              } flex items-center gap-6 px-3.5 py-2.5 hover:bg-[#E5E5E5] rounded-[4px] transition cursor-pointer `
            }
          >
            {({ isActive }) => (
              <>
                <BusinessIcon
                  color={isActive ? "#1A4381" : "#8E8E93"}
                  className="transition"
                />
                <span className="font-medium text-[14px] text-[#000000db] group-[.active]:text-[#1A4381] transition">
                  Hesabatlar
                </span>
              </>
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default AdminNavigation;
