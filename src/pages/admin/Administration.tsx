import { useEffect, useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import pic from "../../../public/img/Admin/pp.jpg";
import { Select, MenuItem } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface User {
  id?: number;
  name: string;
  surname: string;
  email: string;
  imageUrl: string;
  createdDate?: string;
  role: "" | "ADMIN" | "EXPERT" | "SUPER_ADMIN";
  isVerified?: boolean;
  invitationSent?: boolean;
  uuid?: string;
}

interface PendingUser extends User {
  invitationSent: boolean;
  uuid?: string;
}

const FORBIDDEN_DOMAINS = [
  "gmail.com", "yahoo.com", "outlook.com", "hotmail.com",
  "icloud.com", "mail.ru", "yandex.com", "yandex.ru",
  "protonmail.com", "gmx.com", "aol.com", "zoho.com"
];

const initialValues = {
  name: "",
  surname: "",
  email: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Ad mütləqdir"),
  surname: Yup.string().required("Soyad mütləqdir"),
  email: Yup.string()
    .email("Düzgün email yazın")
    .required("Email mütləqdir")
    .test('corporate-email', 'Zəhmət olmasa korporativ email ünvanı daxil edin', (value) => {
      if (!value) return false;
      const domain = value.split('@')[1];
      if (!domain) return false;
      return !FORBIDDEN_DOMAINS.includes(domain.toLowerCase());
    }),
});

const Administration = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.role === "EXPERT") {
      navigate("/admin/applies", { replace: true });
    }
  }, [auth, navigate]);
  
  const isSuperAdmin = auth?.role === "SUPER_ADMIN";
  const isAdmin = auth?.role === "ADMIN";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axiosPrivate.get("/api/v1/users/all");

        const pending: PendingUser[] = [];
        const verified: User[] = [];

        response.data.forEach((user: any) => {
          const mappedUser = {
            id: user.id,
            name: user.name || '',
            surname: user.surname || '',
            email: user.email || '',
            imageUrl: user.imageUrl || pic,
            createdDate: user.createdDate,
            role: user.role || "",
            isVerified: user.isVerified || false,
            invitationSent: !user.isVerified ? true : false,
            uuid: user.uuid,
          };

          if (!user.isVerified) {
            pending.push(mappedUser);
          } else {
            verified.push(mappedUser);
          }
        });

        setPendingUsers(pending);
        setUsers(verified);

      } catch (err: any) {
        console.error("Error fetching users:", err.response?.data || err.message);
        toast.error("İstifadəçilər yüklənərkən xəta baş verdi");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [axiosPrivate]);

  const handleRoleChange = async (user: User, newRole: "ADMIN" | "EXPERT" | "SUPER_ADMIN" | "") => {
    if (!isSuperAdmin) {
      toast.error("Rol dəyişmək üçün SUPER_ADMIN olmalısınız");
      return;
    }

    if (user.role === "EXPERT") {
      toast.error("Expert rolları dəyişdirilə bilməz");
      return;
    }

    try {
      await axiosPrivate.patch(`/api/v1/users/change-role?id=${user.id}&role=${newRole}`);

      setUsers(prev => prev.map(u =>
        u.id === user.id ? { ...u, role: newRole } : u
      ));

      toast.success(`${user.name} ${user.surname} rol uğurla dəyişdirildi: ${newRole}`);
    } catch (err: any) {
      console.error("Role change error:", err);
      const errorMessage = err.code === 'ERR_NETWORK'
        ? "Serverə bağlantı xətası. Zəhmət olmasa sonra yenidən cəhd edin."
        : `Rol dəyişmə uğursuz oldu: ${err.response?.data?.message || err.message}`;
      toast.error(errorMessage);
    }
  };

  const addPendingUser = (values: typeof initialValues) => {
    const newUser: PendingUser = {
      ...values,
      imageUrl: pic,
      role: "",
      invitationSent: false,
    };

    setPendingUsers(prev => [...prev, newUser]);
    setIsModalOpen(false);
    toast.success(`${values.name} ${values.surname} siyahıya əlavə edildi. Zəhmət olmasa rolu seçin və dəvət edin.`);
  };

  const inviteUser = async (user: PendingUser, index: number) => {
    if (!user.role) {
      toast.error("İstifadəçinin rolunu təyin edin");
      return;
    }

    if (!user.email) {
      toast.error("Email ünvanı tapılmadı");
      return;
    }

    try {
      const response = await axiosPrivate.post("/api/v1/users/invite", {
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role
      });

      setPendingUsers(prev => prev.map((u, i) =>
        i === index ? { ...u, invitationSent: true, uuid: response.data.uuid } : u
      ));

      toast.success(`${user.name} ${user.surname} uğurla dəvət edildi. İstifadəçi email linkinə klik etdikdən sonra siyahıya əlavə olunacaq.`);
    } catch (err: any) {
      console.error("Invite error:", err);
      const errorMessage = !err?.response
        ? "Serverdən cavab yoxdur."
        : err.response.status === 403
          ? `${user.name} ${user.surname} artıq dəvət edilib və ya icazəniz yoxdur.`
          : `Dəvət göndərilmədi: ${err.response?.data?.message || err.message}`;
      toast.error(errorMessage);
    }
  };

  const deleteUser = async (user: User | PendingUser, isPending: boolean = false) => {
    if (isPending) {
      if (!isSuperAdmin && !isAdmin) {
        toast.error("Silinmə üçün icazəniz yoxdur");
        return;
      }
    } else {
      if (user.role === "SUPER_ADMIN") {
        toast.error("Super Admin silinə bilməz");
        return;
      }

      if (isAdmin && user.role !== "EXPERT") {
        toast.error("Admin yalnız Expert istifadəçiləri silə bilər");
        return;
      }
    }

    if (!user.id) {
      setPendingUsers(prev => prev.filter(u => u !== user));
      toast.success(`${user.name} ${user.surname} siyahıdan silindi.`);
      return;
    }

    try {
      await axiosPrivate.delete(`/api/v1/users?id=${user.id}`);

      const response = await axiosPrivate.get("/api/v1/users/all");

      const pending: PendingUser[] = [];
      const verified: User[] = [];

      response.data.forEach((u: any) => {
        const mappedUser = {
          id: u.id,
          name: u.name || '',
          surname: u.surname || '',
          email: u.email || '',
          imageUrl: u.imageUrl || pic,
          createdDate: u.createdDate,
          role: u.role || "",
          isVerified: u.isVerified || false,
          invitationSent: !u.isVerified ? true : false,
          uuid: u.uuid,
        };

        if (!u.isVerified) {
          pending.push(mappedUser);
        } else {
          verified.push(mappedUser);
        }
      });

      setPendingUsers(pending);
      setUsers(verified);

      toast.success(`${user.name} ${user.surname} uğurla silindi.`);
    } catch (err: any) {
      console.error("Delete error:", err);
      const errorMessage =
        err.response?.status === 404
          ? `${user.name} ${user.surname} tapılmadı.`
          : err.response?.status === 403
            ? "Silinmə üçün icazəniz yoxdur."
            : `Silinmə uğursuz oldu: ${err.response?.data?.message || err.message}`;
      toast.error(errorMessage);
    }
  };

  const canEditRole = (user: User) => {
    return isSuperAdmin && user.role !== "EXPERT";
  };

  const canDeleteUser = (user: User | PendingUser, isPending: boolean = false) => {
    if (isPending) {
      return isSuperAdmin || isAdmin;
    }

    if (isSuperAdmin) {
      return user.role !== "SUPER_ADMIN";
    }

    if (isAdmin) {
      return user.role === "EXPERT";
    }

    return false;
  };

  const allDisplayUsers = [...pendingUsers, ...users];

  if (isLoading) {
    return (
      <div className="w-full bg-[#F8F8F8] rounded-[24px] overflow-hidden">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Yüklənir...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F8F8F8] rounded-[24px] overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="bg-white p-5">Nümayəndələr</h1>

      {/* Users list and add button */}
      <div className="p-3 md:p-5">
        <div className="bg-white p-3 lg:p-5 rounded-[8px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-3 items-center">
            <div className="h-[66px] border border-[#CED4DA] p-3 rounded-lg overflow-x-auto flex gap-2 whitespace-nowrap [&::-webkit-scrollbar]:hidden">
              {allDisplayUsers.map((user, index) => (
                <div
                  key={user.id || `pending-${index}`}
                  className={`inline-flex bg-[#F8F8F8] px-3 py-1 rounded-xl gap-1 items-center max-w-[150px] 
                    ${index < pendingUsers.length ? "text-orange-500" : "text-black"}`}
                >
                  <div className="flex flex-col truncate">
                    <span className="text-xs truncate">
                      {user.name} {user.surname}
                    </span>
                    <p className="text-xs text-[#969696] truncate">{user.email}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="bg-[#1A4381] text-white p-2 rounded-lg text-sm w-full sm:w-[150px] h-[44px] cursor-pointer"
            >
              Siyahıya əlavə et +
            </button>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={addPendingUser}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit} className="w-[90%] p-[20px] space-y-6 max-w-sm mx-auto bg-white rounded-[8px] relative">
                <div className="text-end">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="text-[#000] hover:text-gray-700 cursor-pointer">
                    ✕
                  </button>
                </div>

                <div>
                  <label className="block mb-1">Ad</label>
                  <Field name="name" type="text" placeholder="Ad" className="w-full border border-[#CED4DA] p-2 rounded" />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block mb-1">Soyad</label>
                  <Field name="surname" type="text" placeholder="Soyad" className="w-full border border-[#CED4DA] p-2 rounded" />
                  <ErrorMessage name="surname" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block mb-1">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className={`w-full border p-2 rounded ${errors.email && touched.email ? 'border-red-500' : 'border-[#CED4DA]'}`}
                    placeholder="ali.aliyev@company.com"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>

                <button type="submit" className="w-full px-4 py-2 bg-[#1A4381] text-white rounded cursor-pointer mt-4">
                  Əlavə et +
                </button>
              </form>
            )}
          </Formik>
        </div>
      )}

      {/* Users Table */}
      <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden p-5">
        <div className="min-w-[800px]">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 font-[500] pb-2 m-5">
            <div>Ad</div>
            <div className="text-center">Qeydiyyat Tarixi</div>
            <div className="text-center">Rollar</div>
            <div className="text-center">Əməliyyat</div>
          </div>

          {/* Table Body */}
          <div className="bg-white rounded-[16px]">
            {/* Pending Users */}
            {pendingUsers.map((user, index) => (
              <UserRow
                key={`pending-${index}`}
                user={user}
                isPending={true}
                invitationSent={user.invitationSent}
                onRoleChange={(newRole) => {
                  setPendingUsers(prev => prev.map((u, i) =>
                    i === index ? { ...u, role: newRole } : u
                  ));
                }}
                onInvite={() => inviteUser(user, index)}
                onDelete={() => deleteUser(user, true)}
                showDeleteButton={canDeleteUser(user, true)}
              />
            ))}

            {/* Existing Users */}
            {users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                isPending={false}
                invitationSent={false}
                onRoleChange={(newRole) => handleRoleChange(user, newRole)}
                onDelete={() => deleteUser(user, false)}
                canEditRole={canEditRole(user)}
                showDeleteButton={canDeleteUser(user, false)}
                isSuperAdmin={isSuperAdmin}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface UserRowProps {
  user: User;
  isPending: boolean;
  invitationSent: boolean;
  onRoleChange: (newRole: "ADMIN" | "EXPERT" | "SUPER_ADMIN" | "") => void;
  onInvite?: () => void;
  onDelete: () => void;
  canEditRole?: boolean;
  showDeleteButton?: boolean;
  isSuperAdmin?: boolean;
}

const UserRow = ({
  user,
  isPending,
  invitationSent,
  onRoleChange,
  onInvite,
  onDelete,
  canEditRole = false,
  showDeleteButton = false,
}: UserRowProps) => {

  const getRoleBackgroundColor = (role: string) => {
    switch (role) {
      case "EXPERT": return "#3F9C3563";
      case "ADMIN": return "#FABAB6";
      case "SUPER_ADMIN": return "#F8F3F1";
      default: return "#F8F3F1";
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="grid grid-cols-4 gap-4 items-center p-4 mb-3">
      <div className="grid grid-cols-4 items-center">
        <img src={user.imageUrl} alt="" className="col-span-1 w-[32px] h-[32px] rounded-full" />
        <div className="col-span-3">
          <p className="font-medium">{user.name} {user.surname}</p>
          {isPending && (
            <span className="text-xs text-orange-500">
              {invitationSent ? "Dəvət göndərildi - Gözləyir" : "Dəvət göndərilməyib"}
            </span>
          )}
        </div>
      </div>

      <div className="text-center">
        {isPending ? "—" : formatDate(user.createdDate)}
      </div>

      <div className="flex justify-center">
        {isPending ? (
          <Select
            value={user.role}
            onChange={(e) => onRoleChange(e.target.value as "ADMIN" | "EXPERT" | "")}
            displayEmpty
            className="w-[126px] h-[42px]"
            disabled={invitationSent}
            sx={{
              borderRadius: "8px",
              backgroundColor: "#F8F3F1",
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              '& .MuiSelect-select': {
                padding: '8px 12px',
                fontSize: '12px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              },
            }}
          >
            <MenuItem value="">Rol seçin</MenuItem>
            <MenuItem value="EXPERT">Expert</MenuItem>
            <MenuItem value="ADMIN">Admin</MenuItem>
          </Select>
        ) : user.role === "EXPERT" ? (
          <span className="w-[126px] h-[42px] flex items-center justify-center bg-[#3F9C3563] rounded-lg text-[12px] font-bold">
            Expert
          </span>
        ) : canEditRole ? (
          <Select
            value={user.role}
            onChange={(e) => onRoleChange(e.target.value as "ADMIN" | "SUPER_ADMIN")}
            className="w-[126px] h-[42px]"
            sx={{
              borderRadius: "8px",
              backgroundColor: getRoleBackgroundColor(user.role),
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              '& .MuiSelect-select': {
                fontSize: '12px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
            }}
          >
            <MenuItem value="ADMIN">Admin</MenuItem>
            <MenuItem value="SUPER_ADMIN">Super Admin</MenuItem>
          </Select>
        ) : (
          <span
            className="w-[126px] h-[42px] flex items-center justify-center rounded-lg text-[12px] font-bold"
            style={{ backgroundColor: getRoleBackgroundColor(user.role) }}
          >
            {user.role === "SUPER_ADMIN" ? "SUPER ADMIN" :
              user.role === "ADMIN" ? "Admin" : "Rol yoxdur"}
          </span>
        )}
      </div>

      <div className="flex justify-center gap-2">
        {isPending ? (
          invitationSent ? (
            showDeleteButton && (
              <button
                type="button"
                className="bg-red-600 text-white w-[126px] h-[42px] rounded-lg text-sm cursor-pointer hover:bg-red-700"
                onClick={onDelete}
              >
                Sil
              </button>
            )
          ) : (
            <button
              type="button"
              className="bg-[#1A4381] text-white w-[126px] h-[42px] rounded-lg text-sm cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={onInvite}
              disabled={!user.role}
            >
              Dəvət et
            </button>
          )
        ) : showDeleteButton && (
          <button
            type="button"
            className="bg-red-600 text-white w-[126px] h-[42px] rounded-lg text-sm cursor-pointer hover:bg-red-700"
            onClick={onDelete}
          >
            Sil
          </button>
        )}
      </div>
    </div>
  );
};

export default Administration;