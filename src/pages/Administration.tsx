import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import pic from "../../public/img/profile-pic.jpg";
import { Select, MenuItem } from "@mui/material";

interface User {
  name: string;
  surname: string;
  email: string;
  image: string;
  role: "Admin" | "Expert" | "";
}

const initialValues = {
  name: "",
  surname: "",
  email: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Ad mütləqdir"),
  surname: Yup.string().required("Soyad mütləqdir"),
  email: Yup.string().email("Düzgün email yazın").required("Email mütləqdir"),
});

const Administration = () => {
  const [open, setOpen] = useState(false);
  const [confirmData, setConfirmData] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([
    { name: "Aysu", surname: "Ismayilzade", email: "aysu@example.com", image: pic, role: "Expert" },
    { name: "Elvin", surname: "Huseynov", email: "elvin@example.com", image: pic, role: "Expert" },
    { name: "Leyla", surname: "Aliyeva", email: "leyla@example.com", image: pic, role: "Admin" },
    { name: "Rashad", surname: "Mammadov", email: "rashad@example.com", image: pic, role: "Expert" },
    { name: "Sevinc", surname: "Hasanova", email: "sevinc@example.com", image: pic, role: "Expert" },
  ]);

  const handleSubmit = (values: typeof initialValues) => {
    setConfirmData({
      ...values,
      image: pic,
      role: "",
    });
  };

  const handleConfirm = () => {
    if (confirmData) {
      setUsers([...users, confirmData]);
      setConfirmData(null);
      setOpen(false);
    }
  };

  return (
    <div className="w-full bg-[#F8F8F8] rounded-[24px] overflow-hidden">
      <h1 className="bg-white p-5">Nümayəndələr</h1>

      {/* Users */}
      <div className="p-3 md:p-5">
        <div className="bg-white p-3 lg:p-5 rounded-[8px]">
          <div className="w-full flex flex-col lg:flex-row gap-5 mt-3">
            <div className="flex-1 min-w-0 flex gap-2 overflow-x-auto flex-wrap border border-[#CED4DA] p-3 rounded-lg">
              {users.map((item, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 bg-[#F8F8F8] px-3 py-1 rounded-xl flex gap-1 items-center max-w-[150px]"
                >
                  <div className="flex flex-col truncate">
                    <span className="text-xs truncate">
                      {item.name} {item.surname}
                    </span>
                    <p className="text-xs text-[#969696] truncate">{item.email}</p>
                  </div>
                  <button
                    onClick={() => setUsers(users.filter((_, index) => index !== i))}
                    className="flex-shrink-0 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setOpen(true)}
              className="flex-shrink-0 bg-[#1A4381] text-white p-2 rounded-lg text-sm w-full sm:w-[150px] h-[40px] cursor-pointer"
            >
              Siyahıya əlavə et +
            </button>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="w-[90%] p-[20px] space-y-6 max-w-sm mx-auto bg-[#F8F8F8] rounded-[8px] relative">
                <div className="text-end">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="text-[#000] hover:text-gray-700 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div>
                  <label className="block mb-1">Ad</label>
                  <Field name="name" type="text" className="w-full border border-[#CED4DA] p-2 rounded" />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block mb-1">Soyad</label>
                  <Field name="surname" type="text" className="w-full border border-[#CED4DA] p-2 rounded" />
                  <ErrorMessage name="surname" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block mb-1">Email</label>
                  <Field name="email" type="email" className="w-full border border-[#CED4DA] p-2 rounded" />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>

                <button type="submit" className="w-full px-4 py-2 bg-[#1A4381] text-white rounded cursor-pointer mt-4">
                  Əlavə et +
                </button>

                {/* Confirm popup */}
                {confirmData && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
                      <div className="text-end">
                        <button
                          type="button"
                          onClick={() => setConfirmData(null)}
                          className="text-[#000] hover:text-gray-700 cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="mb-4">
                        <strong>{confirmData.email}</strong> siyahıya əlavə edilsin?
                      </p>
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => setConfirmData(null)}
                          className="w-[130px] py-2 border border-[#CED4DA] rounded cursor-pointer"
                        >
                          Xeyr
                        </button>
                        <button
                          onClick={handleConfirm}
                          className="w-[130px] bg-[#1A4381] text-white rounded cursor-pointer"
                        >
                          Bəli
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      )}

      {/* Users Table */}
      <div className="overflow-x-auto p-5">
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left font-[500]">Ad</th>
              <th className="py-2 px-4 text-left font-[500]">Qeydiyyat Tarixi</th>
              <th className="py-2 px-4 text-left font-[500]">Rollar</th>
            </tr>
          </thead>
          <tbody className="bg-white rounded-[16px] overflow-hidden">
            {users.map((item, i) => (
              <tr key={i}>
                <td className="py-2 px-4 flex items-center gap-2">
                  <img src={item.image} alt="" className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-medium">{item.name} {item.surname}</p>
                  </div>
                </td>
                <td className="py-2 px-4">12.05.25</td>
                <td className="py-2 px-4 flex justify-end">
                  <Select
                    value={item.role || ""}
                    onChange={(e) => {
                      const value = e.target.value as "Admin" | "Expert";
                      setUsers(prev =>
                        prev.map((u, idx) => (idx === i ? { ...u, role: value } : u))
                      );
                    }}
                    displayEmpty
                    size="small"
                    renderValue={(selected) => {
                      if (!selected) return "Rol Təyin et";
                      return selected;
                    }}
                    sx={{
                      width: 126,
                      height: 42,
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 600,
                      textAlign: item.role ? "center" : "start",
                      transition: "all .3s ease",
                      backgroundColor: item.role === "Admin"
                        ? "#F044385E"
                        : item.role === "Expert"
                          ? "#3F9C3563"
                          : "#F8F3F1",
                      "&:hover": {
                        backgroundColor: item.role === "Admin"
                          ? "#F04438"
                          : item.role === "Expert"
                            ? "#2e7027ff"
                            : "#d0cdccff"
                      },
                      "& .MuiSelect-icon": {
                        display: item.role ? "none" : "block"
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          "& ul": {
                            padding: 0,
                            boxShadow:"none"
                          },
                        },
                      },
                    }}
                  >
                    <MenuItem value="Expert" sx={{
                      backgroundColor: "#F8F3F1",
                      "&:hover": {
                        backgroundColor: "#BBC9E4",
                      },
                    }}>Expert</MenuItem>
                    <MenuItem value="Admin" sx={{
                      backgroundColor: "#F8F3F1",
                      "&:hover": {
                        backgroundColor: "#BBC9E4",
                      },
                    }}>Admin</MenuItem>
                  </Select>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Administration;