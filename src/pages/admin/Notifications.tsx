import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { BASE_URL } from "./Admin";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { Check, LayoutList } from "lucide-react";

interface NotificationType {
  id: string;
  title: string;
  message: string;
  img?: string;
  createdAt: string;
  read: boolean;
}

type AdminContextType = {
  notifications: NotificationType[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationType[]>>;
};

function useAdminContext() {
  return useOutletContext<AdminContextType>();
}

const Notification = () => {
  const { auth, setAuth } = useAuth();
  const { notifications, setNotifications } = useAdminContext();
  const bgColors = {
    newApply: "bg-[#FB8C00]",
    feedbackAdded: "bg-[#4CAF50]",
    default: "bg-[#1A4381]",
  };

  type NotificationTypeKey = keyof typeof bgColors;

  const fetchNotifications = (accessToken: string) => {
    return axios.get(
      `${BASE_URL}/api/v1/notifications/my-received-and-unread`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }
    );
  };

  const getNotifications = async () => {
    if (!auth.accessToken) {
      console.error("No access token!");
      return;
    }
    try {
      const res = await fetchNotifications(auth.accessToken);
      setNotifications(res.data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        try {
          const refreshRes = await axios.post(
            `${BASE_URL}/api/v1/auth/refresh`,
            {},
            { withCredentials: true }
          );
          const newAccessToken = refreshRes.data.accessToken;
          setAuth({ ...auth, accessToken: newAccessToken });
          const resRetry = await fetchNotifications(newAccessToken);
          setNotifications(resRetry.data);
        } catch (refreshErr) {
          console.error("Refresh failed:", refreshErr);
        }
      } else {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const markAsRead = async (id: string, accessToken: string) => {
    const response = await axios.get(`${BASE_URL}/api/v1/notifications/id`, {
      params: { id },
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
    return response.data;
  };

  const handleMarkAsRead = async (id: string) => {
    if (!auth.accessToken) {
      console.error("No access token!");
      return;
    }

    try {
      await markAsRead(id, auth.accessToken);

      setNotifications((prev: NotificationType[]) =>
        prev.filter((n) => n.id !== id)
      );
    } catch (err: any) {
      if (err.response?.status === 401) {
        try {
          const refreshRes = await axios.post(
            `${BASE_URL}/api/v1/auth/refresh`,
            {},
            { withCredentials: true }
          );
          const newAccessToken = refreshRes.data.accessToken;

          setAuth({ ...auth, accessToken: newAccessToken });

          await markAsRead(id, newAccessToken);

          setNotifications((prev) => prev.filter((n) => n.id !== id));
        } catch (refreshErr) {
          console.error("Token refresh failed:", refreshErr);
        }
      } else {
        console.error("Failed:", err);
      }
    }
  };

  useEffect(() => {
    document.title = "Bildirişlər";

    return () => {
      document.title = "DTS Platform";
    };
  }, []);

  return (
    <div>
      <h1 className="font-[600] text-[20px]">Bildirişlər</h1>
      {notifications.length === 0 && (
        <p className="mt-5 text-gray-500">Bildiriş yoxdur.</p>
      )}
      {[...notifications]
        .sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((item) => {
          let isComplex = false;
          try {
            isComplex = JSON.parse(item.message).type !== null;
          } catch (e) {}
          const parsed = isComplex ? JSON.parse(item.message) : {};
          const message = isComplex ? parsed.message : item.message;
          const type: NotificationTypeKey =
            parsed.type in bgColors ? parsed.type : "default";

          return (
            <div
              key={item.id}
              className="flex items-center w-full md:w-[612px] border-b border-[#DDDDDD] py-[20px] px-4 mt-10 justify-between"
            >
              <div className="flex items-center gap-5">
                <div
                  className={`w-[48px] h-[48px] ${bgColors[type]} rounded-full flex items-center justify-center`}
                >
                  {type === "newApply" && <LayoutList color="white" />}
                  {type === "feedbackAdded" && <Check color="white" />}
                </div>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-[#717171] text-[13px]">{message}</p>
                  <span className="text-[#717171] text-[13px]">
                    {new Date(item.createdAt).toLocaleString("en-GB")}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleMarkAsRead(item.id)}
                className="text-end cursor-pointer"
              >
                <CloseIcon />
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default Notification;
