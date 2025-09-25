import { Field, useFormikContext } from "formik";
import { Check, X } from "lucide-react";

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
  exportBazaar: "",

  digitalLevel: "",
  digitalTools: "",
  keyChallenges: "",
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

const RadioYesNo = ({
  name,
  labelYes = "Bəli",
  labelNo = "Xeyr",
}: {
  name: keyof typeof initialValues;
  labelYes?: string;
  labelNo?: string;
}) => {
  const { values, setFieldValue } = useFormikContext<typeof initialValues>();

  return (
    <span className="inline-flex gap-3 items-center">
      {/* YES option */}
      <label className="flex items-center gap-2 cursor-pointer">
        <Field
          type="radio"
          name={name}
          value="true"
          checked={values[name] === true}
          onChange={() => setFieldValue(name, true)}
          className="hidden"
        />
        <span
          className={`flex items-center justify-center w-5 h-5 rounded-full border 
          ${
            values[name] === true
              ? "bg-green-100 border-green-500"
              : "bg-white border-gray-300"
          }`}
        >
          {values[name] === true && (
            <Check size={16} className="text-green-600" />
          )}
        </span>
        <span className="text-sm font-medium text-gray-900">{labelYes}</span>
      </label>

      {/* NO option */}
      <label className="flex items-center gap-2 cursor-pointer">
        <Field
          type="radio"
          name={name}
          value="false"
          checked={values[name] === false}
          onChange={() => setFieldValue(name, false)}
          className="hidden"
        />
        <span
          className={`flex items-center justify-center w-5 h-5 rounded-full border 
          ${
            values[name] === false
              ? "bg-red-100 border-red-500"
              : "bg-white border-gray-300"
          }`}
        >
          {values[name] === false && <X size={16} className="text-red-600" />}
        </span>
        <span className="text-sm font-medium text-gray-900">{labelNo}</span>
      </label>
    </span>
  );
};
export default RadioYesNo;
