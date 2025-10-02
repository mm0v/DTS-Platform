import { useEffect, useState } from "react";
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
import { UserRound } from "lucide-react";

DataTable.use(DT);

export const BASE_URL = import.meta.env.VITE_API_URL;

function Admin() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!auth?.accessToken) {
      console.error("No auth token available.");
      return;
    }

    const controller = new AbortController();
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get("/api/v1/users/profile", {
          signal: controller.signal,
        });

        setAuth((prev) => ({ ...prev, user: response.data }));
      } catch (error) {
        console.error("Error fetching expert data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();

    return () => {
      controller.abort(); // cancel pending requests
    };
  }, [auth?.accessToken]);

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
          {auth?.user?.imageUrl ? (
            <img
              src={auth?.user?.imageUrl}
              alt="Profile"
              className="w-[40px] h-[40px] rounded-[50%]"
            />
          ) : (
            <span className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center">
              <UserRound className="w-[25px] h-[25px] text-white" />
            </span>
          )}

          <p className="font-[500] text-[20px]">
            {loading
              ? "Yüklənir..."
              : auth?.user
              ? `${auth.user.name} ${auth.user.surname}`
              : "Data Yoxdur"}
          </p>
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
