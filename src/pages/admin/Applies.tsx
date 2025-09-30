import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import { createContext, useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { AxiosInstance } from "axios";
import AppliesTable from "../../components/AppliesTable";
import ConfirmModal from "./ConfirmModal";
import AppliesTableControllers from "../../components/AppliesTableControllers";
import SendToExpertModal from "../../components/SendToExpertModal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";

DataTable.use(DT);

type AdminContextType = {
  auth: any;
  axiosPrivate: AxiosInstance;
};

type Settings = {
  region: string[];
  sector: string[];
  sort: string;
  searchQuery: string;
};

interface TableSettingsContextType {
  tableSettings: Settings;
  setTableSettings: (tableSettings: Settings) => void;
}

function useAdminContext() {
  return useOutletContext<AdminContextType>();
}

const TableSettingsContext = createContext<
  TableSettingsContextType | undefined
>(undefined);

function useTableSettings() {
  const context = useContext(TableSettingsContext);
  if (!context) {
    throw new Error(
      "useTableSettings must be used within TableSettingsContext.Provider"
    );
  }
  return context;
}

function Applies() {
  const { auth } = useAdminContext();
  const axiosPrivate = useAxiosPrivate();
  const [expertsList, setExpertsList] = useState<any[]>([]);

  const [tableSettings, setTableSettings] = useState<Settings>({
    region: [],
    sector: [],
    sort: "newest",
    searchQuery: "",
  });

  const statusTranslate = {
    COMPLETED: "Tamamlandı",
    UNCOMPLETED: "Tamamlanmadı",
    PENDING: "İcrada",
  };

  type Company = {
    id: number;
    name: string;
    status: string;
    sector: string;
    date: string;
    region: string;
    createdDate: string;
  };

  const [tableData, setTableData] = useState<Company[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [lastClickedDeleteId, setLastClickedDeleteId] = useState<number | null>(
    null
  );
  const [lastClickedExpertId, setLastClickedExpertId] = useState<number | null>(
    null
  );
  const [openExpertModal, setOpenExpertModal] = useState(false);

  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

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

  const fetchData = async (controller: AbortController) => {
    try {
      const response = await axiosPrivate.get(
        "/api/v1/admins/getAllCompanies",
        {
          signal: controller.signal,
        }
      );

      flattenData(response.data);
      console.log("Fetched Data:", response.data);
      setDataLoaded(true);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  const fetchExperts = async (controller: AbortController) => {
    try {
      const response = await axiosPrivate.get("/api/v1/admins/getAllExperts", {
        signal: controller.signal,
      });

      setExpertsList(response.data);
      console.log("Fetched Experts:", response.data);
      setDataLoaded(true);
    } catch (error) {
      console.error("Error fetching expert data:", error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    if (!auth?.accessToken) {
      console.log("No auth token available.");
      return;
    }

    fetchData(controller);
    fetchExperts(controller);

    return () => {
      setDataLoaded(false);
      controller.abort(); // cancel pending requests
    };
  }, [auth]);

  useEffect(() => {
    console.log("Experts List Updated:", expertsList);
  }, [expertsList]);

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
      status:
        statusTranslate[
          company?.companyStatus as keyof typeof statusTranslate
        ] || company?.companyStatus,
      sector: company.propertyLaw?.businessOperations,
      region: company.companyData?.cityAndRegion,
      date: `${new Date(company.createdDate)
        .toLocaleDateString("en-GB")
        .replace(/\//g, ".")} · ${formatHour(
        new Date(company.createdDate).toString()
      )}`,
      createdDate: company.createdDate,
    }));
    setTableData(data);
    console.log("Flattened Data:", data);
  };

  const sendCompanyToExpert = async (
    companyId: number | null,
    expertId: number | null
  ) => {
    const controller = new AbortController();
    try {
      await axiosPrivate.post("/api/v1/admins/send-company", null, {
        params: {
          companyId: companyId,
          expertId: expertId,
        },
      });
      toast.success("Müraciət eksperte göndərildi!");
      setOpenExpertModal(false);
      fetchData(controller);
    } catch (error) {
      toast.error("Müraciətin eksperte göndərilməsi uğursuz oldu.");
    }
  };

  return (
    <div>
      <TableSettingsContext.Provider
        value={{ tableSettings, setTableSettings }}
      >
        <ConfirmModal
          handleDelete={() => {
            handleDelete(lastClickedDeleteId);
          }}
          openModal={deleteModalOpen}
          handleCloseModal={() => {
            setDeleteModalOpen(false);
          }}
        />
        <SendToExpertModal
          openModal={openExpertModal}
          handleCloseModal={() => setOpenExpertModal(false)}
          expertList={expertsList}
          onSend={(expertId: number | null) => {
            sendCompanyToExpert(lastClickedExpertId, expertId);
          }}
        />
        <div className="flex flex-col  sm:flex-row items-center gap-5 justify-between mb-7">
          <AppliesTableControllers />
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
              isDataLoaded={dataLoaded}
              setLastId={(id: number) => {
                setLastClickedDeleteId(id);
              }}
              setLastExpertId={(id: number) => {
                setLastClickedExpertId(id);
              }}
              openExpertModal={() => setOpenExpertModal(true)}
            />
          </div>
        </div>
      </TableSettingsContext.Provider>
    </div>
  );
}

export default Applies;
export { useTableSettings };
