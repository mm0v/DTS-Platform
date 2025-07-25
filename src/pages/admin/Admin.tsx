import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import BackgroundVideo from "../../components/videos/BackgroundVideo";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";

import { useLanguage } from "../../context/LanguageContext";

DataTable.use(DT);

function Admin() {
  const { auth } = useAuth();
  const { language, pagesTranslations } = useLanguage();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const page = pagesTranslations.admin;
  const BASE_URL = import.meta.env.VITE_API_URL;

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

  const handleDelete = async (id: number) => {
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
    { title: "ID", data: "id" },
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
      title: "Actions",
      data: "id",
      responsivePriority: 2,
    },
  ];

  useEffect(() => {
    if (!auth?.accessToken) {
      navigate("/admin/login");

      return;
    }
  }, [auth, navigate]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/api/v1/company/getAll", {
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

  const handleDownloadButton = async () => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(
          "/api/v1/company/export-excel",
          {
            method: "GET",
            responseType: "blob",
          }
        );
        const blob = response.data;
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "companies.xlsx";
        document.body.appendChild(a);
        a.click();
        a.remove();

        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading data:", error);
      }
    };
    fetchData();
  };

  return (
    <div className="p-4">
      <BackgroundVideo />
      <div className="space-y-6 text-white!">
        <button
          type="button"
          onClick={handleDownloadButton}
          className="w-full py-3 rounded-lg transition duration-300 text-white bg-blue-600 hover:bg-[#1a4381] cursor-pointer"
        >
          {page.downloadBtn[language]}
        </button>

        <DataTable
          data={tableData.length > 0 ? tableData : []}
          columns={columns}
          options={{
            responsive: true,
          }}
          className="display dark-table hover text-white"
          slots={{
            24: (_: any, type: string, row: any) => {
              if (type === "display") {
                return (
                  <button
                    onClick={() => handleDelete(row.id)}
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
      </div>
    </div>
  );
}

export default Admin;
