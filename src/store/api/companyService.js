import API from "./axiosConfig";

// Company related API calls
export const companyService = {
  // Submit company data with files
  submitCompanyData: async (data) => {
    try {
      const response = await API.post("/v1/company/add", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add a new company (keep this for backward compatibility)
  addCompany: async (companyData) => {
    try {
      const response = await API.post("/v1/company/add", companyData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
