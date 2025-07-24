import API from "../services/API/axiosConfig,api";
import useAuth from "./useAuth";

function useRefreshToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await API.get("/refresh", {
      withCredentials: true,
    });
    setAuth((prev: any) => {
      return {
        ...prev,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
}

export default useRefreshToken;
