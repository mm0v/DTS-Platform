import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",

  boxShadow: 24,
  borderRadius: "16px",
  p: 3,
};

type NoteModalProps = {
  openModal: boolean;
  handleCloseModal: () => void;
  onSend: (feedback: string) => void;
};

export default function WriteFeedback({
  openModal,
  handleCloseModal,
  onSend,
}: NoteModalProps) {
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  const resetState = () => {
    setNote("");
    setError("");
    setTouched(false);
  };

  useEffect(() => {
    return () => {
      resetState();
    };
  }, []);

  return (
    <React.Fragment>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "100%", maxWidth: 600 }}>
          <h2
            className="text-[#4B4B4B] !text-[20px] text-center !mb-8 font-semibold leading-7 font-plus-jakarta"
            id="child-modal-title"
          >
            Göndər
          </h2>
          <div className="flex flex-col gap-1 items-center mb-6 px-10">
            <textarea
              onFocus={() => setTouched(true)}
              onBlur={() => {
                if (note.length === 0) {
                  setError("Qeyd daxil edin!");
                }
              }}
              onChange={(e) => {
                setNote(e.target.value);
                if (e.target.value.length > 0) {
                  setError("");
                } else {
                  setError("Qeyd daxil edin!");
                }
              }}
              className={` w-full h-40 p-3  border border-[#D8D6DE] rounded-[5px] placeholder:text-[#D8D6DE] resize-none focus:outline-none  focus:border-transparent transition font-plus-jakarta ${
                error && touched ? "border-red-500" : ""
              }`}
              placeholder="Qeydinizi daxil edin..."
            ></textarea>
            {error && touched && (
              <p className="w-full text-red-500 text-sm ">{error}</p>
            )}
          </div>
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => {
                onSend(note);
                resetState();
              }}
              disabled={note.trim().length === 0}
              className="px-8 py-2 border border-[#185ABD] bg-[#185ABD] text-white rounded-[5px] cursor-pointer disabled:cursor-not-allowed disabled:text-gray-40 disabled:bg-[#5d96ec] transition hover:bg-[#174891]"
            >
              Tamamla
            </button>
            <button
              onClick={() => {
                handleCloseModal();
                resetState();
              }}
              className="px-8 py-2 border border-[#D8D6DE] text-[#4B4B4B] rounded-[5px] cursor-pointer transition hover:bg-gray-100"
            >
              Geri
            </button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
