import { FilterIcon, SortIcon, AddIcon } from "../../components/SVG/Admin";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { AxiosInstance } from "axios";
import AppliesTable from "../../components/AppliesTable";
import ConfirmModal from "./ConfirmModal";

DataTable.use(DT);

type AdminContextType = {
  auth: any;
  axiosPrivate: AxiosInstance;
};

function useAdminContext() {
  return useOutletContext<AdminContextType>();
}

function Applies() {
  const { auth, axiosPrivate } = useAdminContext();

  type Company = {
    id: number;
    name: string;
    status: string;
    sector: string;
    date: string;
  };

  const [tableData, setTableData] = useState<Company[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [lastClickedDeleteId, setLastClickedDeleteId] = useState<number | null>(
    null
  );

  const handleDelete = async (id: number | null) => {
    try {
      await axiosPrivate.delete(`/api/v1/companies/delete/${id}`, {
        method: "DELETE",
      });
      setTableData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    if (!auth?.accessToken) {
      console.log("No auth token available.");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/api/v1/companies/getAll", {
          method: "GET",
          signal: controller.signal,
        });
        if (isMounted) {
          flattenData(response.data);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching admin data:", error);
        }
      }
    };
    console.log("Auth Token in Applies:", auth?.accessToken);
    fetchData();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [auth]);

  const formatHour = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-GB", options);
  };

  const flattenData = (companies: any[]) => {
    const data = companies.map((company) => ({
      id: company.id,
      name: company.companyData?.companyName,
      status: "Tamamlandı",
      sector: company.propertyLaw?.businessOperations,
      date: `${new Date(company.createdDate)
        .toLocaleDateString("en-GB")
        .replace(/\//g, ".")} · ${formatHour(
        new Date(company.createdDate).toString()
      )}`,
    }));
    setTableData(data);
    console.log("Flattened Data:", data);
  };

  return (
    <div>
      <ConfirmModal
        handleDelete={() => {
          handleDelete(lastClickedDeleteId);
        }}
        openModal={deleteModalOpen}
        handleCloseModal={() => {
          setDeleteModalOpen(false);
        }}
      />
      <div className="flex items-center gap-5 justify-between mb-7">
        <input
          className="text-[#949494] transition hover:not-focus:bg-[#e6e5e5] w-full max-w-[500px] text-[14px] border border-[#d1d1d1] leading-5 px-4 py-2 rounded-[12px]"
          type="text"
          placeholder="Axtar"
        />
        <div className="flex gap-3 font-plus-jakarta">
          <button className="flex items-center gap-1.5 pl-3 px-2 py-2 border text-[#666666CC] rounded-xl text-[12px] leading-4 font-[700]  border-[#d1d1d1] transition hover:bg-[#cacaca] cursor-pointer ">
            Filter <FilterIcon />
          </button>
          <button className="flex items-center gap-1.5 pl-3 px-2 py-2 border text-[#666666CC] rounded-xl text-[12px] leading-4 font-[700]  border-[#d1d1d1] transition hover:bg-[#cacaca] cursor-pointer ">
            Sırala <SortIcon />
          </button>
          <button className="flex items-center gap-1.5 pl-3 px-2 py-2 border text-[#fff] bg-[#1A4381] rounded-xl text-[12px] leading-4 font-[700]  border-[#1A4381] transition hover:bg-[#112b52] cursor-pointer whitespace-nowrap ">
            Əlavə Et <AddIcon />
          </button>
        </div>
      </div>
      <div>
        <h1 className="text-xl leading-6 tracking-wide font-medium mb-5">
          Müraciətlər
        </h1>
        <div>
          <AppliesTable
            data={tableData}
            handleOpenModal={() => {
              setDeleteModalOpen(true);
            }}
            setLastId={(id: number) => {
              setLastClickedDeleteId(id);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Applies;
