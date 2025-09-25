import type { AxiosInstance } from "axios";
import { useOutletContext } from "react-router-dom";
import { Upload } from "lucide-react";
import { Formik, Form, Field, ErrorMessage, type FieldProps } from "formik";
import * as Yup from "yup";
import RadioYesNo from "../../components/RadioYesNo";
import { toast } from "react-toastify";
import { useState } from "react";
import Select, { type MultiValue } from "react-select";
import countryList from "react-select-country-list";

type AdminContextType = {
  auth: any;
  axiosPrivate: AxiosInstance;
};

function useAdminContext() {
  return useOutletContext<AdminContextType>();
}

const validationSchema = Yup.object({
  companyName: Yup.string().required("Mütləq doldurulmalıdır"),
  companyRegisterNumber: Yup.string().required("Mütləq doldurulmalıdır"),
  createYear: Yup.number()
    .typeError("İl rəqəm olmalıdır")
    .required("Mütləq doldurulmalıdır"),
  workerCount: Yup.string().required("Mütləq doldurulmalıdır"),
  annualTurnover: Yup.string().required("Mütləq doldurulmalıdır"),
  address: Yup.string().required("Mütləq doldurulmalıdır"),
  cityAndRegion: Yup.string().required("Mütləq doldurulmalıdır"),
  website: Yup.string()
    .url("Düzgün URL daxil edin")
    .required("Mütləq doldurulmalıdır"),
  contactName: Yup.string().required("Mütləq doldurulmalıdır"),
  contactEmail: Yup.string()
    .email("Düzgün email daxil edin")
    .required("Mütləq doldurulmalıdır"),
  contactPhone: Yup.string().required("Mütləq doldurulmalıdır"),

  companyLawType: Yup.string().required("Mütləq doldurulmalıdır"),
  businessOperations: Yup.string().required("Mütləq doldurulmalıdır"),
  products: Yup.string().required("Mütləq doldurulmalıdır"),
  exportActivity: Yup.string()
    .required("Mütləq doldurulmalıdır")
    .test(
      "is-yes-no",
      'Dəyər "Bəli" və ya "Xeyr" olmalıdır',
      (value) => value === "Bəli" || value === "Xeyr"
    ),
  exportBazaar: Yup.array()
    .of(Yup.string())
    .when("exportActivity", {
      is: "Bəli",
      then: (schema) => schema.min(1, "Mütləq doldurulmalıdır"), // <-- must pick at least 1
      otherwise: (schema) => schema.max(0, "Boş olmalıdır"), // <-- must be empty if exportActivity is not "Bəli"
    }),

  digitalLevel: Yup.string().required("Mütləq doldurulmalıdır"),
  digitalTools: Yup.array().of(Yup.string()).min(1, "Mütləq doldurulmalıdır"),
  keyChallenges: Yup.array().of(Yup.string()).min(1, "Mütləq doldurulmalıdır"),

  companyPurpose: Yup.string().required("Mütləq doldurulmalıdır"),
  neededBudget: Yup.number()
    .typeError("Büdcə rəqəm olmalıdır")
    .required("Mütləq doldurulmalıdır"),
  propertyLawCertificate: Yup.string().required("Mütləq yüklənməlidir"),
  registerCertificate: Yup.string().required("Mütləq yüklənməlidir"),
  financialStatement: Yup.string().required("Mütləq yüklənməlidir"),
});

export default function AddCompany() {
  const { axiosPrivate } = useAdminContext();
  const options = countryList().getData();
  const [selectedOptions, setSelectedOptions] = useState<
    MultiValue<{ label: string; value: string }>
  >([]);
  const [selectedChallenges, setSelectedChallenges] = useState<
    MultiValue<{ label: string; value: string }>
  >([]);
  const [selectedTools, setSelectedTools] = useState<
    MultiValue<{ label: string; value: string }>
  >([]);

  const handleSubmit = async (
    values: typeof initialValues,
    { setErrors }: any
  ) => {
    try {
      const formData = new FormData();

      // JSON payload (non-file data)
      const payload = {
        companyData: {
          cityAndRegion: values.cityAndRegion,
          companyName: values.companyName,
          companyRegisterNumber: values.companyRegisterNumber,
          contactName: values.contactName,
          contactPhone: values.contactPhone,
          annualTurnover: values.annualTurnover,
          workerCount: values.workerCount,
          address: values.address,
          createYear: Number(values.createYear),
          website: values.website,
          contactEmail: values.contactEmail,
        },
        declarationConsent: {
          dataIsReal: true,
          permitContact: true,
          privacyAcceptance: true,
        },
        digitalLeadership: {
          digitalTeamOrLead: values.digitalTeamOrLead,
          digitalPath: values.digitalPath,
          digitalTransformationLoyality: values.digitalTransformationLoyality,
        },
        digitalReadiness: {
          keyChallenges: values.keyChallenges,
          digitalLevel: values.digitalLevel,
          digitalTools: values.digitalTools,
          companyPurpose: values.companyPurpose,
        },
        financialNeeding: {
          financialNeed: true,
          neededBudget: Number(values.neededBudget),
        },
        propertyLaw: {
          businessOperations: values.businessOperations,
          companyLawType: values.companyLawType,
          products: values.products,
          exportActivity: values.exportActivity === "Bəli",
          exportBazaar: values.exportBazaar,
        },
      };

      formData.append(
        "companyRequest",
        new Blob([JSON.stringify(payload)], {
          type: "application/json",
        })
      );

      console.log(values.propertyLawCertificate);
      console.log(values.propertyLawCertificate);
      console.log(values.propertyLawCertificate);

      formData.append("propertyLawCertificate", values.propertyLawCertificate);
      formData.append("registerCertificate", values.registerCertificate);
      formData.append("financialStatement", values.financialStatement);

      // Axios handles multipart/form-data automatically
      await axiosPrivate.post("/api/v1/admins/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Şirkət uğurla əlavə olundu!");
    } catch (error: any) {
      console.error("Error submitting form:", error);
      if (error.response?.data?.errors) {
        toast.error(error?.response.data?.message || "Xəta baş verdi!");
        const apiErrors = error.response.data.errors;

        const formikErrors: Record<string, string> = {};
        for (const key in apiErrors) {
          const shortKey = key.split(".").pop() || key;
          formikErrors[shortKey] = apiErrors[key];
        }
        setErrors(formikErrors);
        window.scrollTo(0, 0);
      }
    }
  };

  const initialValues = {
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
    exportBazaar: [],

    digitalLevel: "",
    digitalTools: [],
    keyChallenges: [],
    companyPurpose: "",
    neededBudget: "",

    digitalTeamOrLead: false,
    digitalPath: false,
    digitalTransformationLoyality: false,
    financialNeeding: false,

    propertyLawCertificate: "",
    registerCertificate: "",
    financialStatement: "",
  };

  const InputField = ({
    label,
    name,
    className = "",
    download = false,
    haveError = false,
    type = "text",
    children,
  }: {
    label: string;
    name: keyof typeof initialValues;
    className?: string;
    download?: boolean;
    haveError?: boolean;
    type?: "text" | "select";
    children?: React.ReactNode;
  }) => (
    <div className={`flex flex-col ${className}`}>
      <label className="mb-1.5 text-sm font-medium text-[#1A4381] font-ibm-plex-sans">
        {label}
      </label>
      <div className="relative">
        {download ? (
          <Field name={name}>
            {({ form }: FieldProps) => (
              <input
                type="file"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0] || null;
                  form.setFieldValue(name, file);
                }}
                accept={`.docx, .doc, .pdf${
                  name === "financialStatement" ? ", .xlsx, .xls" : ""
                }`}
                className={`input px-3 py-3 w-full rounded-lg border border-[#E5E7EB] bg-white disabled:cursor-not-allowed file:hidden ${
                  haveError ? "border-red-500" : ""
                } cursor-pointer`}
              />
            )}
          </Field>
        ) : (
          <Field
            as={type === "select" ? "select" : "input"}
            name={name}
            type="text"
            className={`input px-3 py-3 w-full rounded-lg border border-[#E5E7EB] bg-white disabled:cursor-not-allowed ${
              haveError ? "border-red-500" : ""
            }`}
          >
            {children}
          </Field>
        )}

        {download && (
          <span className="btn absolute top-1/2 -translate-y-1/2 right-3 text-[#1A4381] flex items-center pointer-events-none">
            <Upload size={24} />
          </span>
        )}
      </div>
      <div className="min-h-5">
        <ErrorMessage
          name={name}
          component="div"
          className="text-red-500 text-xs mt-1"
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-8xl mx-auto w-full px-3.5 pt-7 pb-3.5 bg-white min-h-screen rounded-[8px] overflow-x-auto shadow-md">
      <div className="relative">
        <h1 className="text-left text-[23px]  sm:text-center sm:text-[28px]  font-semibold leading-8 text-[#474747] mb-6 mt-1 font-plus-jakarta">
          Müraciət əlavə et
        </h1>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, dirty }) => (
          <Form>
            {/* Top Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 gap-x-[15px] p-[18px] rounded-xl shadow-sm mb-6 border border-[#E5E7EB] bg-[#F7F7F7] items-end">
              <InputField
                label="Şirkətin tam hüquqi adı"
                haveError={
                  errors.companyName && touched.companyName ? true : false
                }
                name="companyName"
              />
              <InputField
                label="Şirkətin VÖEN nömrəsi"
                name="companyRegisterNumber"
                haveError={
                  errors.companyRegisterNumber && touched.companyRegisterNumber
                    ? true
                    : false
                }
              />
              <InputField
                label="Şirkətin yaranma tarixi"
                name="createYear"
                haveError={
                  errors.createYear && touched.createYear ? true : false
                }
              />
              <InputField
                label="Şirkətin işçilərinin sayı"
                name="workerCount"
                haveError={
                  errors.workerCount && touched.workerCount ? true : false
                }
                type="select"
              >
                <option className="text-white bg-[#070618]" value="">
                  Seçin
                </option>
                <option className="text-white bg-[#070618]" value="10">
                  1-10
                </option>
                <option className="text-white bg-[#070618]" value="50">
                  11-50
                </option>
                <option className="text-white bg-[#070618]" value="250">
                  51-250
                </option>
                <option className="text-white bg-[#070618]" value="350">
                  250+
                </option>
              </InputField>

              <InputField
                label="İllik dövriyyə (AZN)"
                name="annualTurnover"
                haveError={
                  errors.annualTurnover && touched.annualTurnover ? true : false
                }
                type="select"
              >
                <option className="text-white bg-[#070618]" value="">
                  Seçin
                </option>
                <option className="text-white bg-[#070618]" value="3M-ə qədər">
                  3M-ə qədər
                </option>
                <option className="text-white bg-[#070618]" value="3M - 30M">
                  3M - 30M
                </option>
                <option className="text-white bg-[#070618]" value="30M+">
                  30M+
                </option>
              </InputField>
              <InputField
                label="Şirkətin ünvanı"
                name="address"
                haveError={errors.address && touched.address ? true : false}
              />
              <InputField
                label="Yerləşdiyi şəhər/region"
                name="cityAndRegion"
                haveError={
                  errors.cityAndRegion && touched.cityAndRegion ? true : false
                }
              />
              <InputField
                label="Website"
                name="website"
                haveError={errors.website && touched.website ? true : false}
              />
              <InputField
                label="Əlaqələndirici şəxs"
                name="contactName"
                haveError={
                  errors.contactName && touched.contactName ? true : false
                }
              />
              <InputField
                label="Email"
                name="contactEmail"
                haveError={
                  errors.contactEmail && touched.contactEmail ? true : false
                }
              />
              <InputField
                label="Mobil nömrə"
                name="contactPhone"
                haveError={
                  errors.contactPhone && touched.contactPhone ? true : false
                }
              />
            </div>

            {/* Company Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 gap-x-[15px] p-[18px] rounded-xl shadow-sm mb-6 border border-[#E5E7EB] bg-[#F7F7F7] items-end">
              <InputField
                label="Şirkətin hüquqi növü"
                name="companyLawType"
                haveError={
                  errors.companyLawType && touched.companyLawType ? true : false
                }
              />
              <InputField
                label="Sənaye və biznes əməliyyatları"
                name="businessOperations"
                haveError={
                  errors.businessOperations && touched.businessOperations
                    ? true
                    : false
                }
                type="select"
              >
                <option className="text-white bg-[#131021]" value="">
                  Seçin
                </option>
                <option
                  className="text-white bg-[#131021]"
                  value="Qida və içkilər"
                >
                  Qida və içkilər
                </option>
                <option className="text-white bg-[#131021]" value="Neft - qaz">
                  Neft - qaz
                </option>
                <option className="text-white bg-[#131021]" value="Kimya">
                  Kimya
                </option>
                <option
                  className="text-white bg-[#131021]"
                  value="Metallurgiya"
                >
                  Metallurgiya
                </option>
                <option
                  className="text-white bg-[#131021]"
                  value="Maşın və avadanlıqların təmiri və quraşdırılması"
                >
                  Maşın və avadanlıqların təmiri və quraşdırılması
                </option>
                <option
                  className="text-white bg-[#131021]"
                  value="Kauçuk və plastik məhsullar"
                >
                  Kauçuk və plastik məhsullar
                </option>
                <option className="text-white bg-[#131021]" value="Tekstil">
                  Tekstil
                </option>
                <option
                  className="text-white bg-[#131021]"
                  value="Elektrik avadanlıqları"
                >
                  Elektrik avadanlıqları
                </option>
                <option className="text-white bg-[#131021]" value="Digər">
                  Digər
                </option>
              </InputField>

              <InputField
                label="Əsas məhsullar/xidmətlər"
                name="products"
                haveError={errors.products && touched.products ? true : false}
              />
              <InputField
                label="İxrac fəaliyyəti ilə məşğulluq"
                name="exportActivity"
                haveError={
                  errors.exportActivity && touched.exportActivity ? true : false
                }
                type="select"
              >
                <option className="text-white bg-[#070618]" value="">
                  Seçin
                </option>
                <option className="text-white bg-[#070618]" value="Bəli">
                  Bəli
                </option>
                <option className="text-white bg-[#070618]" value="Xeyr">
                  Xeyr
                </option>
              </InputField>
              <div className="flex flex-col lg:col-span-2">
                <label className="mb-1.5 text-sm font-medium text-[#1A4381] font-ibm-plex-sans">
                  İxrac bazarları
                </label>
                <Field name="exportBazaar">
                  {({ form }: FieldProps) => (
                    <>
                      <Select
                        options={options}
                        value={selectedOptions}
                        onChange={(selected) => {
                          if (selected && selected.length > 4) {
                            toast.warning("Maksimum 4 ölkə seçə bilərsiniz!");
                            return;
                          }
                          setSelectedOptions(selected);
                          const countries = selected.map(
                            (option) => option.label
                          );
                          form.setFieldValue("exportBazaar", countries);
                        }}
                        className={` w-full  rounded-lg border border-[#E5E7EB] bg-white disabled:cursor-not-allowed  ${
                          errors.exportBazaar && touched.exportBazaar
                            ? "border border-red-500 rounded"
                            : ""
                        }`}
                        classNamePrefix="react-select"
                        placeholder={
                          values.exportActivity !== "Bəli"
                            ? "İxrac fəaliyyəti yoxdur."
                            : "Ölkə seçin (maksimum 4)"
                        }
                        isClearable
                        isMulti
                        isDisabled={values.exportActivity !== "Bəli"}
                        closeMenuOnSelect={false}
                        styles={{
                          valueContainer: (provided) => ({
                            ...provided,
                            paddingLeft: "12px",
                          }),
                          menu: (provided) => ({
                            ...provided,
                            backgroundColor: "#fff",
                            color: "#161414",
                          }),
                          control: (provided) => ({
                            ...provided,
                            backgroundColor: "transparent",
                            border: "none",
                            padding: 0,
                            width: "100%",
                            minHeight: "48px",
                            borderRadius: "8px",
                            boxSizing: "border-box",
                          }),
                          singleValue: (provided) => ({
                            ...provided,
                            color: "white",
                          }),
                          multiValue: (provided) => ({
                            ...provided,
                            backgroundColor: "#1A4381",
                            color: "white",
                          }),
                          multiValueLabel: (provided) => ({
                            ...provided,
                            color: "white",
                          }),
                          option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isFocused
                              ? "#d1d5dc"
                              : "#fff",
                            color: "#161414",
                            cursor: "pointer",
                          }),
                        }}
                      />
                    </>
                  )}
                </Field>
                <div className="min-h-5">
                  <ErrorMessage
                    name={"exportBazaar"}
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>
              <InputField
                label="Təsdiqedici sənəd"
                name="propertyLawCertificate"
                className="lg:col-span-2"
                haveError={
                  errors.propertyLawCertificate &&
                  touched.propertyLawCertificate
                    ? true
                    : false
                }
                download={true}
              />
            </div>

            {/* Digital Readiness */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 gap-x-[15px] p-[18px] rounded-xl shadow-sm mb-6 border border-[#E5E7EB] bg-[#F7F7F7] items-end">
              <InputField
                label="Mövcud rəqəmsallaşma səviyyəsi"
                name="digitalLevel"
                className="lg:col-span-2"
                haveError={
                  errors.digitalLevel && touched.digitalLevel ? true : false
                }
                type="select"
              >
                <option className="text-white bg-[#131021]" value="">
                  Seçin
                </option>
                <option className="text-white bg-[#131021]" value="1">
                  1 - Heç bir rəqəmsal istifadə olunmayıb.
                </option>
                <option className="text-white bg-[#131021]" value="2">
                  2
                </option>
                <option className="text-white bg-[#131021]" value="3">
                  3
                </option>
                <option className="text-white bg-[#131021]" value="4">
                  4
                </option>
                <option className="text-white bg-[#131021]" value="5">
                  5 - Tamamilə rəqəmsal və avtomatlaşdırılmış proseslər
                </option>
              </InputField>
              <div className="flex flex-col lg:col-span-2">
                <label className="mb-1.5 text-sm font-medium text-[#1A4381] font-ibm-plex-sans">
                  Mövcud rəqəmsal alətlər
                </label>
                <Field name="digitalTools">
                  {({ form }: FieldProps) => (
                    <>
                      <Select
                        options={[
                          { value: "crm", label: "CRM" },
                          { value: "erp", label: "ERP" },
                          {
                            value: "accounting",
                            label: "Mühasibat proqramları",
                          },
                          {
                            value: "other",
                            label: "Digər",
                          },
                        ]}
                        value={selectedTools}
                        onChange={(selected) => {
                          setSelectedTools(selected);
                          const tools = selected.map((option) => option.label);
                          form.setFieldValue("digitalTools", tools);
                        }}
                        className={` w-full  rounded-lg border border-[#E5E7EB] bg-white disabled:cursor-not-allowed  ${
                          errors.digitalTools && touched.digitalTools
                            ? "border border-red-500 rounded"
                            : ""
                        }`}
                        classNamePrefix="react-select"
                        placeholder={"Seçin"}
                        isClearable
                        isMulti
                        closeMenuOnSelect={false}
                        styles={{
                          valueContainer: (provided) => ({
                            ...provided,
                            paddingLeft: "12px",
                          }),
                          menu: (provided) => ({
                            ...provided,
                            backgroundColor: "#fff",
                            color: "#161414",
                          }),
                          control: (provided) => ({
                            ...provided,
                            backgroundColor: "transparent",
                            border: "none",
                            padding: 0,
                            width: "100%",
                            minHeight: "48px",
                            borderRadius: "8px",
                            boxSizing: "border-box",
                          }),
                          singleValue: (provided) => ({
                            ...provided,
                            color: "white",
                          }),
                          multiValue: (provided) => ({
                            ...provided,
                            backgroundColor: "#1A4381",
                            color: "white",
                          }),
                          multiValueLabel: (provided) => ({
                            ...provided,
                            color: "white",
                          }),
                          option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isFocused
                              ? "#d1d5dc"
                              : "#fff",
                            color: "#161414",
                            cursor: "pointer",
                          }),
                        }}
                      />
                    </>
                  )}
                </Field>
                <div className="min-h-5">
                  <ErrorMessage
                    name={"keyChallenges"}
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="mb-1.5 text-sm font-medium text-[#1A4381] font-ibm-plex-sans">
                  Rəqəmsal transformasiyada əsas çətinliklər
                </label>
                <Field name="keyChallenges">
                  {({ form }: FieldProps) => (
                    <>
                      <Select
                        options={[
                          {
                            value: "budget_shortage",
                            label: "Büdcə çatışmazlığı",
                          },
                          {
                            value: "technical_expertise",
                            label: "Texniki təcrübənin çatışmazlığı",
                          },
                          { value: "training_needs", label: "Təlimə ehtiyac" },
                          {
                            value: "digital_strategy",
                            label: "Rəqəmsal strategiyanın çatışmazlığı",
                          },
                          {
                            value: "infrastructure_limits",
                            label: "İnfrastruktur məhdudiyyətləri",
                          },
                          { value: "other", label: "Digər" },
                        ]}
                        value={selectedChallenges}
                        onChange={(selected) => {
                          setSelectedChallenges(selected);
                          const challenges = selected.map(
                            (option) => option.label
                          );
                          form.setFieldValue("keyChallenges", challenges);
                        }}
                        className={` w-full  rounded-lg border border-[#E5E7EB] bg-white disabled:cursor-not-allowed  ${
                          errors.keyChallenges && touched.keyChallenges
                            ? "border border-red-500 rounded"
                            : ""
                        }`}
                        classNamePrefix="react-select"
                        placeholder={"Seçin"}
                        isClearable
                        isMulti
                        closeMenuOnSelect={false}
                        styles={{
                          valueContainer: (provided) => ({
                            ...provided,
                            paddingLeft: "12px",
                          }),
                          menu: (provided) => ({
                            ...provided,
                            backgroundColor: "#fff",
                            color: "#161414",
                          }),
                          control: (provided) => ({
                            ...provided,
                            backgroundColor: "transparent",
                            border: "none",
                            padding: 0,
                            width: "100%",
                            minHeight: "48px",
                            borderRadius: "8px",
                            boxSizing: "border-box",
                          }),
                          singleValue: (provided) => ({
                            ...provided,
                            color: "white",
                          }),
                          multiValue: (provided) => ({
                            ...provided,
                            backgroundColor: "#1A4381",
                            color: "white",
                          }),
                          multiValueLabel: (provided) => ({
                            ...provided,
                            color: "white",
                          }),
                          option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isFocused
                              ? "#d1d5dc"
                              : "#fff",
                            color: "#161414",
                            cursor: "pointer",
                          }),
                        }}
                      />
                    </>
                  )}
                </Field>
                <div className="min-h-5">
                  <ErrorMessage
                    name={"keyChallenges"}
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>
              <InputField
                label="Şirkətin rəqəmsal transformasiya məqsədləri"
                name="companyPurpose"
                className="lg:col-span-2"
                haveError={
                  errors.companyPurpose && touched.companyPurpose ? true : false
                }
              />
              <InputField
                label="Rəqəmsal transformasiya üçün tələb olunan büdcə"
                name="neededBudget"
                haveError={
                  errors.neededBudget && touched.neededBudget ? true : false
                }
              />
            </div>

            {/* Digital Checkpoints */}
            <div className=" p-[18px] rounded-xl shadow-sm mb-6 border border-[#E5E7EB] bg-[#F7F7F7] space-y-2 text-sm font-ibm-plex-sans text-[#1A4381] text-[18px] font-medium leading-7">
              <ul className="list-disc list-inside space-y-1">
                <li className="pl-1 flex">
                  <div className="inline-flex w-full  items-center justify-between">
                    <span>
                      • Şirkətin rəqəmsal transformasiya lideri və ya komandası{" "}
                      <span className="underline">
                        {values?.digitalTeamOrLead ? "var." : "yoxdur."}
                      </span>
                    </span>

                    <span className="ml-2 inline-flex items-center">
                      <RadioYesNo name="digitalTeamOrLead" />
                    </span>
                  </div>
                </li>
                <li className="pl-1 flex">
                  <div className="inline-flex w-full justify-between items-center">
                    <span>
                      • Şirkət əvvəllər rəqəmsal transformasiya strategiyası və
                      ya yol xəritəsi{" "}
                      <span className="underline">
                        {values?.digitalPath ? "hazırlayıb." : "hazırlamayıb."}
                      </span>
                    </span>

                    <span className="ml-2 inline-flex items-center">
                      <RadioYesNo name="digitalPath" />
                    </span>
                  </div>
                </li>
                <li className="pl-1 flex">
                  <div className="inline-flex w-full justify-between items-center">
                    <span>
                      • Yüksək səviyyəli rəhbərlər rəqəmsal transformasiya
                      strategiyasının həyata keçirilməsinə{" "}
                      <span className="underline">
                        {values?.digitalTransformationLoyality
                          ? "sadiqdirlər."
                          : "sadiq deyillər."}
                      </span>
                    </span>

                    <span className="ml-2 inline-flex items-center">
                      <RadioYesNo name="digitalTransformationLoyality" />
                    </span>
                  </div>
                </li>
                <li className="pl-1 flex">
                  <div className="inline-flex w-full justify-between items-center">
                    <span>
                      • Şirkətin rəqəmsal halları tətbiq etmək üçün maliyyə
                      dosyasına{" "}
                      <span className="underline">
                        {values?.financialNeeding
                          ? "ehtiyacı var."
                          : "ehtiyacı yoxdur."}
                      </span>
                    </span>

                    <span className="ml-2 inline-flex items-center">
                      <RadioYesNo name="financialNeeding" />
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-[15px] p-[18px] rounded-xl shadow-sm border border-[#E5E7EB] bg-[#F7F7F7] items-end">
              <InputField
                label="Dövlət reyestrindən çıxarış"
                name="registerCertificate"
                download={true}
                haveError={
                  errors.registerCertificate && touched.registerCertificate
                    ? true
                    : false
                }
              />
              <InputField
                label="Maliyyə hesabatları"
                name="financialStatement"
                download={true}
                haveError={
                  errors.financialStatement && touched.financialStatement
                    ? true
                    : false
                }
              />
            </div>
            <div className="pt-6 pb-3.5 flex justify-end gap-2">
              <button
                type="submit"
                onClick={() => {
                  console.log(values);
                }}
                className="font-plus-jakarta leading-6 text-[#1A4381] text-sm font-medium tracking-widest uppercase px-4 py-2 rounded-lg bg-[#E8ECF2] cursor-pointer transition hover:bg-gray-300 "
              >
                yadda saxla
              </button>
              <button
                disabled={!dirty}
                type="reset"
                className="font-plus-jakarta leading-6 text-[#1A4381] text-sm font-medium tracking-widest uppercase px-4 py-2 rounded-lg bg-[#E8ECF2] cursor-pointer transition hover:bg-gray-300 disabled:bg-[#E9ECEF] disabled:text-[#ADB5BD] disabled:cursor-not-allowed"
              >
                dəyİşİklİkləri sİl{" "}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
