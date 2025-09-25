import type { AxiosInstance } from "axios";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { Download } from "lucide-react";
import { ExcelIcon } from "../../components/SVG/Admin";

type AdminContextType = {
  auth: any;
  axiosPrivate: AxiosInstance;
};

function useAdminContext() {
  return useOutletContext<AdminContextType>();
}

export default function CompanyForm() {
  const { axiosPrivate } = useAdminContext();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(`/api/v1/companies/get/${id}`, {
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

  const flattenData = (data: any) => {
    const newData = {
      companyName: data.companyData.companyName,
      companyRegisterNumber: data.companyData.companyRegisterNumber,
      createYear: data.companyData.createYear,
      workerCount: data.companyData.workerCount,
      annualTurnover: data.companyData.annualTurnover,
      address: data.companyData.address,
      cityAndRegion: data.companyData.cityAndRegion,
      website: data.companyData.website,
      contactName: data.companyData.contactName,
      contactEmail: data.companyData.contactEmail,
      contactPhone: data.companyData.contactPhone,
      companyLawType: data.propertyLaw.companyLawType,
      businessOperations: data.propertyLaw.businessOperations,
      products: data.propertyLaw.products,
      exportActivity: data.propertyLaw.exportActivity ? "Bəli" : "Yox",
      exportBazaar: data.propertyLaw.exportBazaar.join(", "),
      propertyLawCertificate: data.companyFiles.propertyLawCertificate,
      digitalLevel: data.digitalReadiness.digitalLevel,
      digitalTools: data.digitalReadiness.digitalTools.join(", "),
      keyChallenges: data.digitalReadiness.keyChallenges.join(", "),
      companyPurpose: data.digitalReadiness.companyPurpose,
      neededBudget: data.financialNeeding.neededBudget,
      digitalTeamOrLead: data.digitalLeadership.digitalTeamOrLead
        ? "var."
        : "yoxdur.",
      digitalPath: data.digitalLeadership.digitalPath
        ? "hazırlayıb."
        : "hazırlamayıb.",
      digitalTransformationLoyality: data.digitalLeadership
        .digitalTransformationLoyality
        ? "sadiqdirlər."
        : "sadiq deyillər.",
      financialNeeding: data.financialNeeding.financialNeed
        ? "ehtiyacı var."
        : "ehtiyacı yoxdur.",
      registerCertificate: data.companyFiles.registerCertificate,
      financialStatement: data.companyFiles.financialStatement,
    };

    setFormData(newData);
  };

  const [formData, setFormData] = useState({
    companyName: "",
    companyRegisterNumber: "",
    createYear: "",
    workerCount: "",
    annualTurnover: "",
    address: "",
    cityAndRegion: "",
    website: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    companyLawType: "",
    businessOperations: "",
    products: "",
    exportActivity: "",
    exportBazaar: "",
    propertyLawCertificate: "",
    digitalLevel: "",
    digitalTools: "",
    keyChallenges: "",
    companyPurpose: "",
    neededBudget: "",
    digitalTeamOrLead: "",
    digitalPath: "",
    digitalTransformationLoyality: "",
    financialNeeding: "",
    registerCertificate: "",
    financialStatement: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDownloadButton = async (
    filename: string | undefined,
    downloadName: string,
    exportExcel?: boolean
  ) => {
    try {
      const response = await axiosPrivate.get(
        exportExcel
          ? `/api/v1/companies/export-excel/${filename}`
          : `/api/v1/files/download/${filename}`,
        {
          method: "GET",
          responseType: "blob",
        }
      );
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${downloadName}${exportExcel ? ".xlsx" : ""}`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading data:", error);
    }
  };

  const Field = ({
    label,
    name,
    className = "",
    download = false,
  }: {
    label: string;
    name: keyof typeof formData;
    className?: string;
    download?: boolean;
  }) => (
    <div className={`flex flex-col ${className}`}>
      <label className="mb-1.5 text-sm font-medium text-[#1A4381] font-ibm-plex-sans">
        {label}
      </label>
      <div className="relative">
        <input
          className="input px-3 py-3 w-full rounded-lg border border-[#E5E7EB] bg-white disabled:cursor-not-allowed"
          name={name}
          value={download ? "Export" : formData[name]}
          onChange={handleChange}
          disabled
        />
        {download && (
          <button
            onClick={() => {
              handleDownloadButton(
                formData[name],
                `${formData.companyName} ${label}`
              );
            }}
            className="btn absolute top-1/2 -translate-y-1/2 right-3 text-[#1A4381] flex items-center cursor-pointer"
          >
            <Download size={24} />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-8xl mx-auto w-full px-3.5 pt-7 pb-3.5 bg-white min-h-screen rounded-[8px] overflow-x-auto shadow-md">
      <div className="relative">
        <h1 className="text-left text-[23px]  sm:text-center sm:text-[28px]  font-semibold leading-8 text-[#474747] mb-6 mt-1 font-plus-jakarta">
          Şirkət məlumatları
          <button
            onClick={() => {
              handleDownloadButton(id, formData?.companyName, true);
            }}
            className="text-[#1A4381] text-[15px] absolute top-1/2 -translate-y-1/2 right-0 font-bold leading-5 py-2 pl-3 pr-2 flex items-center gap-1.5 rounded-xl border border-[#B0B0B0] transition hover:bg-gray-300 cursor-pointer font-plus-jakarta"
          >
            Yüklə
            <ExcelIcon />
          </button>
        </h1>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 gap-x-[15px] p-[18px] rounded-xl shadow-sm mb-6 border border-[#E5E7EB] bg-[#F7F7F7]">
        <Field label="Şirkətin tam hüquqi adı" name="companyName" />
        <Field label="Şirkətin VÖEN nömrəsi" name="companyRegisterNumber" />
        <Field label="Şirkətin yaranma tarixi" name="createYear" />
        <Field label="Şirkətin işçilərinin sayı" name="workerCount" />
        <Field label="İllik dövriyyə" name="annualTurnover" />
        <Field label="Şirkətin ünvanı" name="address" />
        <Field label="Yerləşdiyi şəhər/region" name="cityAndRegion" />
        <Field label="Website" name="website" />
        <Field label="Əlaqələndirici şəxs" name="contactName" />
        <Field label="Email" name="contactEmail" />
        <Field label="Mobil nömrə" name="contactPhone" />
      </div>

      {/* Company Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 gap-x-[15px] p-[18px] rounded-xl shadow-sm mb-6 border border-[#E5E7EB] bg-[#F7F7F7]">
        <Field label="Şirkətin hüquqi növü" name="companyLawType" />
        <Field
          label="Sənaye və biznes əməliyyatları"
          name="businessOperations"
        />
        <Field label="Əsas məhsullar/xidmətlər" name="products" />
        <Field label="İxrac fəaliyyəti ilə məşğulluq" name="exportActivity" />
        <Field
          label="İxrac bazarları"
          name="exportBazaar"
          className="lg:col-span-2"
        />
        <Field
          label="Təsdiqedici sənəd"
          name="propertyLawCertificate"
          className="lg:col-span-2"
          download={true}
        />
      </div>

      {/* Digital Readiness */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 gap-x-[15px] p-[18px] rounded-xl shadow-sm mb-6 border border-[#E5E7EB] bg-[#F7F7F7] items-end">
        <Field
          label="Mövcud rəqəmsallaşma səviyyəsi"
          name="digitalLevel"
          className="lg:col-span-2"
        />
        <Field
          label="Mövcud rəqəmsal alətlər"
          name="digitalTools"
          className="lg:col-span-2"
        />
        <Field
          label="Rəqəmsal transformasiyada əsas çətinliklər"
          name="keyChallenges"
        />
        <Field
          label="Şirkətin rəqəmsal transformasiya məqsədləri"
          name="companyPurpose"
          className="lg:col-span-2"
        />
        <Field
          label="Rəqəmsal transformasiya üçün tələb olunan büdcə"
          name="neededBudget"
        />
      </div>

      {/* Digital Checkpoints */}
      <div className=" p-[18px] rounded-xl shadow-sm mb-6 border border-[#E5E7EB] bg-[#F7F7F7] space-y-2 text-sm font-ibm-plex-sans text-[#1A4381] text-[18px] font-medium leading-7">
        <ul className="list-disc list-inside space-y-1">
          <li className="pl-1">
            Şirkətin rəqəmsal transformasiya lideri və ya komandası{" "}
            <span className="underline">{formData?.digitalTeamOrLead}</span>
          </li>
          <li className="pl-1">
            Şirkət əvvəllər rəqəmsal transformasiya strategiyası və ya yol
            xəritəsi <span className="underline">{formData?.digitalPath}</span>
          </li>
          <li className="pl-1">
            Yüksək səviyyəli rəhbərlər rəqəmsal transformasiya strategiyasının
            həyata keçirilməsinə{" "}
            <span className="underline">
              {formData?.digitalTransformationLoyality}
            </span>
          </li>
          <li className="pl-1">
            Şirkətin rəqəmsal halları tətbiq etmək üçün maliyyə dosyasına{" "}
            <span className="underline">{formData?.financialNeeding}</span>
          </li>
        </ul>
      </div>

      {/* File Uploads */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-[15px] p-[18px] rounded-xl shadow-sm border border-[#E5E7EB] bg-[#F7F7F7] items-end">
        <Field
          label="Dövlət reyestrindən çıxarış"
          name="registerCertificate"
          download={true}
        />
        <Field
          label="Maliyyə hesabatları"
          name="financialStatement"
          download={true}
        />
      </div>
    </div>
  );
}
