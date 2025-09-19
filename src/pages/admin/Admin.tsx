import { useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { NotificationIcon } from "../../components/SVG/Admin";
import ProfilePhoto from "../../../public/img/Admin/pp.jpg";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";

import AdminNavigation from "../../components/AdminNavigation";

DataTable.use(DT);

export const BASE_URL = import.meta.env.VITE_API_URL;

function Admin() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (!auth?.accessToken) {
      navigate("/admin/login");
      return;
    }
  }, [auth, navigate]);

  return (
    <div className="flex flex-col h-dvh">
      <div className="bg-white w-full px-[18px] py-[10px] flex justify-between items-center">
        <Link to={"/admin/profile_info"} className="flex items-center gap-3">
          <img
            src={ProfilePhoto}
            alt=""
            className="w-[40px] h-[40px] rounded-[50%]"
          />
          <p className="font-[500] text-[20px]">Admin</p>
        </Link>
        <Link
          to={"/admin/notification"}
          className="relative p-1.5"
          onClick={() => {
            console.log("Notification");
          }}
        >
          <NotificationIcon className="cursor-pointer " />
          <span className="absolute top-0 -right-1 bg-[#EA3030] text-[10px] text-white rounded-[4px] select-none px-1.5">
            5
          </span>
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row h-content bg-[#f1f1f1]">
        <AdminNavigation />
        <div className="flex-1 p-4">
          <Outlet context={{ auth, axiosPrivate }} />
        </div>
      </div>
    </div>
  );
}

export default Admin;
