import API from "../services/API/axiosConfig,api";
import useAuth from "./useAuth";

function useRefreshToken() {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await API.get("/api/v1/auth/refresh", {
      // params: { refreshToken: auth?.refreshToken },
      params: { refreshToken: localStorage.getItem("refreshToken") },
    });
    setAuth((prev: any) => {
      return {
        ...prev,
        role: response.data.role,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
}

export default useRefreshToken;
