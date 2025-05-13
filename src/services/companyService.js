import axiosInstance from './axiosConfig';

export const companyService = {
  submitCompanyData: async (data) => {
    try {
      const response = await axiosInstance.post('/api/company', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
}; 