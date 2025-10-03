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
import ReadFeedback from "./ReadFeedback";
import WriteFeedback from "../../components/WriteFeedback";

DataTable.use(DT);

type AdminContextType = {
  auth: any;
  axiosPrivate: AxiosInstance;
};

type Settings = {
  region: string[];
  sector: string[];
  status: string[];
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

type Expert = {
  id: number;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  imageUrl: string;
  dateOfBirth: string;
};

type Company = {
  id: number;
  name: string;
  status: string;
  sector: string;
  date: string;
  region: string;
  createdDate: string;
  expert: Expert | null;
  feedback: string | null;
};

type ModalType =
  | "confirm"
  | "sendToExpert"
  | "readFeedback"
  | "writeFeedback"
  | null;

interface ModalState {
  type: ModalType;
  companyId: number | null;
}

function Applies() {
  const { auth } = useAdminContext();
  const axiosPrivate = useAxiosPrivate();
  const [expertsList, setExpertsList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [tableSettings, setTableSettings] = useState<Settings>({
    region: [],
    sector: [],
    status: [],
    sort: "newest",
    searchQuery: "",
  });

  const statusTranslate = {
    COMPLETED: "Tamamlandı",
    UNCOMPLETED: "Tamamlanmadı",
    PENDING: "İcrada",
  };

  const [tableData, setTableData] = useState<Company[]>([]);

  const [rawCompanies, setRawCompanies] = useState<any[]>([]);

  const [modalState, setModalState] = useState<ModalState>({
    type: null,
    companyId: null,
  });

  const openModal = (type: ModalType, companyId: number | null = null) => {
    setModalState({ type, companyId });
  };

  const closeModal = () => {
    setModalState({ type: null, companyId: null });
  };

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

  const fetchData = async (controller: AbortController, role: string) => {
    setLoading(true);
    try {
      let API_URL = "";
      if (role === "SUPER_ADMIN" || role === "ADMIN") {
        API_URL = "/api/v1/admins/getAllCompanies";
      } else if (role === "EXPERT") {
        API_URL = "/api/v1/experts/getAllCompanies";
      } else {
        console.error("Unauthorized role:", role);
        return;
      }

      const response = await axiosPrivate.get(API_URL, {
        signal: controller.signal,
      });

      flattenData(response.data);
      setDataLoaded(true);
      console.log("Fetched Data:", response.data);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (rawCompanies.length > 0) {
      flattenData(rawCompanies);
    }
  }, [rawCompanies, expertsList]);

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

    switch (auth?.role) {
      case "SUPER_ADMIN":
        fetchExperts(controller);
        fetchData(controller, "SUPER_ADMIN");
        break;
      case "EXPERT":
        fetchData(controller, "EXPERT");
        break;
      default:
        console.error("Unauthorized role:", auth?.role);
        return;
    }

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
      expert: expertsList.find((expert) => company.expertId === expert.id),
      feedback: company.feedback,
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
      closeModal();
      fetchData(controller, "SUPER_ADMIN");
    } catch (error) {
      toast.error("Müraciətin eksperte göndərilməsi uğursuz oldu.");
    }
  };

  const sendFeedback = async (feedback: string, companyId: number | null) => {
    const controller = new AbortController();
    try {
      await axiosPrivate.post(
        `/api/v1/experts/giveFeedback/${companyId}`,
        null,
        {
          params: {
            feedback: feedback,
          },
        }
      );
      toast.success("Rəy göndərildi!");
      closeModal();
      fetchData(controller, "EXPERT");
    } catch (error) {
      toast.error("Rəyin göndərilməsi uğursuz oldu.");
    }
  };

  const selectedCompany = tableData.find(
    (company) => company.id === modalState.companyId
  );

  return (
    <div>
      <TableSettingsContext.Provider
        value={{ tableSettings, setTableSettings }}
      >
        <ConfirmModal
          handleDelete={() => {
            handleDelete(modalState.companyId);
          }}
          openModal={modalState.type === "confirm"}
          handleCloseModal={closeModal}
        />
        <SendToExpertModal
          openModal={modalState.type === "sendToExpert"}
          handleCloseModal={closeModal}
          expertList={expertsList}
          onSend={(expertId: number | null) => {
            sendCompanyToExpert(modalState.companyId, expertId);
          }}
        />
        <ReadFeedback
          openModal={modalState.type === "readFeedback"}
          handleCloseModal={closeModal}
          company={selectedCompany}
        />
        <WriteFeedback
          openModal={modalState.type === "writeFeedback"}
          handleCloseModal={closeModal}
          onSend={(note: string) => {
            sendFeedback(note, modalState.companyId);
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
              isDataLoaded={dataLoaded}
              onOpenModal={openModal}
              isLoading={loading}
              role={auth?.user?.role}
            />
          </div>
        </div>
      </TableSettingsContext.Provider>
    </div>
  );
}

export default Applies;
export { useTableSettings };
