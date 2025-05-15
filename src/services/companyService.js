import axiosInstance from "./axiosConfig";

export const companyService = {
  submitCompanyData: async (formData) => {
    const response = await axiosInstance.post("/api/v1/company/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
