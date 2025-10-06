import { Link } from "react-router-dom";
import { NotificationInfoIcon } from "./SVG/Admin";
import { useEffect, useState } from "react";

interface NotificationType {
  id: string;
  title: string;
  message: string;
  img?: string;
  createdAt: string;
  read: boolean;
}

function handleHide(id: string) {
  localStorage.setItem("lastNotificationId", id);
}

export default function NotificationToast({
  notification,
  closeToast,
}: {
  notification: NotificationType;
  closeToast?: () => void; // Toastify передаёт эту функцию
}) {
  const [id, setId] = useState("");

  useEffect(() => {
    setId(localStorage.getItem("lastNotificationId") ?? "");
  }, []);

  if (!notification || id === notification.id) return null;

  return (
    <div className="w-full bg-[#E9F1FF] p-4 rounded-sm shadow-md">
      <div className="flex text-[#0041D1]">
        <div className="me-4">
          <NotificationInfoIcon />
        </div>
        <div>
          <h1 className="font-ibm-plex-sans font-semibold mb-2 text-sm">
            {notification.title}
          </h1>
          <p className="font-ibm-plex-sans mb-4 font-medium text-sm">
            {JSON.parse(notification.message).type
              ? JSON.parse(notification.message).message
              : notification.message}
          </p>
          <div className="flex font-semibold gap-8">
            <Link
              onClick={() => {
                handleHide(notification.id);
                closeToast?.();
              }}
              to="/admin/notification"
              className="text-[#0041D1] text-sm font-ibm-plex-sans"
            >
              Gör
            </Link>
            <button
              onClick={() => {
                handleHide(notification.id);
                setId(notification.id);
                closeToast?.();
              }}
              className="text-[#ED1C24] hover:cursor-pointer text-sm font-ibm-plex-sans"
            >
              Gizlət
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
