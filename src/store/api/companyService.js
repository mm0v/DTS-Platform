import API from "./axiosConfig"

// Company related API calls
const companyService = {
  // Add a new company
  addCompany: async (companyData) => {
    try {
      const response = await API.post("/v1/company/add", companyData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Get company by ID
  getCompanyById: async (id) => {
    try {
      const response = await API.get(`/v1/company/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Update company
  updateCompany: async (id, companyData) => {
    try {
      const response = await API.put(`/v1/company/${id}`, companyData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Delete company
  deleteCompany: async (id) => {
    try {
      const response = await API.delete(`/v1/company/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Get all companies
  getAllCompanies: async () => {
    try {
      const response = await API.get("/v1/company/all")
      return response.data
    } catch (error) {
      throw error
    }
  },
}

export default companyService
