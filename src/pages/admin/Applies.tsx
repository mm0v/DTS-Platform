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
  const { auth, axiosPrivate } = useAdminContext();

  const [tableSettings, setTableSettings] = useState<Settings>({
    region: [],
    sector: [],
    sort: "newest",
    searchQuery: "",
  });

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
          console.log("Fetched Data:", response.data);
          setDataLoaded(true);
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
      setDataLoaded(false);
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
        <div className="flex items-center gap-5 justify-between mb-7">
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
            />
          </div>
        </div>
      </TableSettingsContext.Provider>
    </div>
  );
}

export default Applies;
export { useTableSettings };
