import { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { BASE_URL } from './Admin';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

interface NotificationType {
    id: string;
    title: string;
    message: string;
    img?: string;
    createdAt: string;
    read: boolean;
}

const mockNotifications: NotificationType[] = [
    {
        id: '1',
        title: 'Yeni mesaj',
        message: 'Sizə yeni bir mesaj gəldi.',
        img: '',
        createdAt: new Date().toISOString(),
        read: false,
    },
    {
        id: '2',
        title: 'Sistem bildirişi',
        message: 'Hesabınız uğurla yeniləndi.',
        img: '',
        createdAt: new Date(Date.now() - 3600 * 1000).toISOString(),
        read: true,
    },
    {
        id: '3',
        title: 'Təklif',
        message: 'Yeni təklif mövcuddur, yoxlayın.',
        img: '',
        createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
        read: false,
    },
];
const Notification = () => {
    const { auth, setAuth } = useAuth();
    const [notifications, setNotifications] = useState<NotificationType[]>([]);

    const fetchNotifications = (accessToken: string) => {
        return axios.get(`${BASE_URL}/api/v1/notifications/my-received-and-unread`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });
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

    const handleDelete = (id: any) => {
        axios.delete(`${BASE_URL}/api/v1/notifications/${id}`,
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        )
            .then(() => setNotifications(prev => prev.filter(n => n.id !== id)))
            .catch(err => console.error(err));
    };
    return (
        <div>
            <h1 className='font-[600] text-[20px]'>Bildirişlər</h1>
            {mockNotifications.map(item => (
                <div key={item.id} className="flex items-center w-full md:w-[612px] border-b border-[#DDDDDD] py-[20px] px-4 mt-10 justify-between">
                    <div className="flex items-center gap-5">
                        <img
                            src={item.img || 'default-img.png'}
                            alt="profile-pic"
                            className="w-[48px] h-[48px] bg-[#1A4381] rounded-full"
                        />
                        <div>
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-[#717171] text-[13px]">{item.message}</p>
                            <span className='text-[#717171] text-[13px]'>
                                {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                    <button onClick={() => handleDelete(item.id)} className="text-end cursor-pointer">
                        <CloseIcon />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Notification;