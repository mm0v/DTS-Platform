import { FilterIcon, SortIcon, AddIcon } from "../../components/SVG/Admin";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { AxiosInstance } from "axios";
import AppliesTable from "../../components/AppliesTable";

DataTable.use(DT);

type AdminContextType = {
  auth: any;
  axiosPrivate: AxiosInstance;
};

function useAdminContext() {
  return useOutletContext<AdminContextType>();
}

function Applies() {
  const BASE_URL = import.meta.env.VITE_API_URL;

  const { auth, axiosPrivate } = useAdminContext();

  type CompanyTableRow = {
    id: any;
    name: any;
    registerNumber: any;
    year: any;
    workers: any;
    turnover: any;
    contact: any;
    email: any;
    phone: any;
    website: any;
    city: any;
    digitalLevel: any;
    keyChallenges: any;
    tools: any;
    budget: string;
    createdAt: string;
    registerCert: any;
    exportBazaar: any;
    dataIsReal: boolean;
    permitContact: boolean;
  };

  const [tableData, setTableData] = useState<CompanyTableRow[]>([]);

  const handleDelete = async (
    id: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    console.log(auth.accessToken);
    const confirmed = window.confirm(
      "Are you sure you want to delete this company?"
    );
    if (!confirmed) return;

    try {
      await axiosPrivate.delete(`/api/v1/company/delete/${id}`, {
        method: "DELETE",
      });
      setTableData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const columns = [
    {
      title: "",
      data: null,
      render: function (_: any, __: any, ___: any, meta: any) {
        return `${meta.row + 1}`;
      },
    },
    { title: "Company", data: "name" },
    { title: "Reg. No", data: "registerNumber" },
    { title: "Year", data: "year" },
    { title: "Workers", data: "workers" },
    { title: "Turnover", data: "turnover" },
    { title: "Contact", data: "contact" },
    { title: "Email", data: "email" },
    { title: "Phone", data: "phone" },
    { title: "Website", data: "website" },
    { title: "City", data: "city" },
    { title: "Digital Level", data: "digitalLevel" },
    { title: "Budget Needed", data: "budget" },
    { title: "Digital Tools", data: "tools" },
    { title: "Key Challenges", data: "keyChallenges" },
    { title: "Company Purpose", data: "companyPurpose" },
    { title: "Products", data: "products" },
    {
      title: "Export Activity",
      data: null,
      render: function (_: any, __: any, row: any) {
        return `${row.exportActivity ? "✅" : "❌"}`;
      },
    },
    { title: "Export Bazaar", data: "exportBazaar" },

    { title: "Created At", data: "createdAt" },
    {
      title: "Register Certificate",
      data: "registerCert",
      render: function (data: string) {
        return `<a href="${BASE_URL}/files/download/${data}" target="_blank">Download</a>`;
      },
    },
    {
      title: "Financial Statement",
      data: "financialStatement",
      render: function (data: string) {
        return `<a href="${BASE_URL}/files/download/${data}" target="_blank">Download</a>`;
      },
    },
    {
      title: "Property Law Certificate",
      data: "propertyLawCertificate",
      render: function (data: string) {
        return `<a href="${BASE_URL}/files/download/${data}" target="_blank">Download</a>`;
      },
    },
    {
      title: "Consent",
      data: null,
      render: function (_: any, __: any, row: any) {
        return `${row.dataIsReal ? "✅" : "❌"} / ${
          row.permitContact ? "✅" : "❌"
        }`;
      },
    },
    {
      title: "ID",
      data: "id",
    },
    {
      title: "Actions",
      data: "id",
      responsivePriority: 2,
    },
  ];

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

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
  }, []);

  const flattenData = (companies: any[]) => {
    const data = companies.map((company) => ({
      id: company.id,
      name: company.companyData.companyName,
      registerNumber: company.companyData.companyRegisterNumber,
      year: company.companyData.createYear,
      workers: company.companyData.workerCount,
      turnover: company.companyData.annualTurnover,
      contact: company.companyData.contactName,
      email: company.companyData.contactEmail,
      phone: company.companyData.contactPhone,
      website: company.companyData.website,
      city: company.companyData.cityAndRegion,
      digitalLevel: company.digitalReadiness.digitalLevel,
      companyPurpose: company.digitalReadiness.companyPurpose,
      keyChallenges: company.digitalReadiness.keyChallenges.join(", "),
      tools: company.digitalReadiness.digitalTools.join(", "),
      budget: `$${company.financialNeeding.neededBudget.toLocaleString()}`,
      createdAt: `${new Date(
        company.createdDate
      ).toLocaleDateString()} ${new Date(
        company.createdDate
      ).toLocaleTimeString()}`,
      registerCert: company.companyFiles.registerCertificate,
      financialStatement: company.companyFiles.financialStatement,
      propertyLawCertificate: company.companyFiles.propertyLawCertificate,
      exportActivity: company.propertyLaw.exportActivity,
      products: company.propertyLaw.products,
      exportBazaar: company.propertyLaw.exportBazaar.join(", "),
      dataIsReal: company.declarationConsent.dataIsReal,
      permitContact: company.declarationConsent.permitContact,
    }));
    setTableData(data);
  };

  return (
    <div>
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
          <AppliesTable />
        </div>
      </div>
    </div>
  );
}

export default Applies;
