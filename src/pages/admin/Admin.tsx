import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { Route, useNavigate, Routes, Outlet } from "react-router-dom";
import { NotificationIcon } from "../../components/SVG/Admin";
import ProfilePhoto from "../../../public/img/Admin/pp.jpg";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";

import { useLanguage } from "../../context/LanguageContext";
import Applies from "./Applies";
import Reports from "./Reports";
import Administration from "./Administration";
import AdminNavigation from "../../components/AdminNavigation";

DataTable.use(DT);

function Admin() {
  const { auth } = useAuth();
  const { language, pagesTranslations } = useLanguage();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const page = pagesTranslations.admin;
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!auth?.accessToken) {
      navigate("/admin/login");
      return;
    }
  }, [auth, navigate]);

  return (
    <div className="flex flex-col h-dvh">
      <div className="bg-white px-[18px] py-[10px] w-full flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <img
            src={ProfilePhoto}
            alt="Profile Photo"
            className="w-10 h-10 rounded-full object-cover"
          ></img>
          <span className="font-medium text-[#000000db] text-xl">Admin</span>
        </div>
        <button
          className="relative p-1.5 cursor-pointer"
          onClick={() => {
            console.log("Notification");
          }}
        >
          <NotificationIcon className="cursor-pointer " />
          <span className="absolute top-0 -right-1 bg-[#EA3030] text-[10px] text-white rounded-[4px] select-none px-1.5">
            5
          </span>
        </button>
      </div>
      {/* <div className="space-y-6 text-white!">
        <DataTable
          data={tableData.length > 0 ? tableData : []}
          columns={columns}
          options={{
            responsive: true,
          }}
          className="display dark-table hover text-white"
          slots={{
            25: (_: any, type: string, row: any) => {
              if (type === "display") {
                return (
                  <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      handleDelete(row.id, e)
                    }
                    className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                );
              }
              return "";
            },
          }}
        ></DataTable>
      </div> */}
      <div className="flex-1/2 bg-[#F1F1F1] px-4 py-5 grid grid-cols-[256px_1fr] gap-6 ">
        <AdminNavigation />
        <Outlet context={{ auth, axiosPrivate }} />
      </div>
    </div>
  );
}

export default Admin;
