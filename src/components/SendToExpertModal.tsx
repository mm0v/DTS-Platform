import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { UserRound } from "lucide-react";
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
  openChild: boolean;
  handleCloseChild: () => void;
  handleCloseModal: () => void;
};

function NoteModal({
  openChild,
  handleCloseChild,
  handleCloseModal,
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
        open={openChild}
        onClose={handleCloseChild}
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
                handleCloseChild();
                handleCloseModal();
              }}
              disabled={note.trim().length === 0}
              className="px-8 py-2 border border-[#185ABD] bg-[#185ABD] text-white rounded-[5px] cursor-pointer disabled:cursor-not-allowed disabled:text-gray-40 disabled:bg-[#5d96ec] transition hover:bg-[#174891]"
            >
              Tamamla
            </button>
            <button
              onClick={() => {
                handleCloseChild();
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

type ExpertModalProps = {
  openModal: boolean;
  handleCloseModal: () => void;
  expertList: any[];
  onSend: (expertId: number | null) => void;
};

export default function ExpertModal({
  openModal,
  handleCloseModal,
  expertList,
  onSend,
}: ExpertModalProps) {
  const [selectedExpert, setSelectedExpert] = React.useState<number | null>(
    null
  );

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, maxWidth: 400 }}>
          <h2
            className="text-[#4B4B4B] !text-[20px] mb-6 text-xl font-plus-jakarta text-left"
            id="parent-modal-title"
          >
            Eksperti seçin
          </h2>
          <div className=" w-full flex flex-col mb-6 max-w-lg overflow-auto">
            {expertList?.length > 0 ? (
              expertList.map((expert) => (
                <button
                  key={expert.id}
                  onClick={() => {
                    setSelectedExpert(expert.id);
                  }}
                  className={`w-full rounded-xl py-2 px-2 cursor-pointer hover:bg-gray-100 transition flex justify-between items-center ${
                    selectedExpert === expert.id ? "bg-gray-200" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {expert.imageUrl ? (
                      <img src="/default-avatar.png"></img>
                    ) : (
                      <span className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                        <UserRound className="w-5 h-5 text-white" />
                      </span>
                    )}
                    <span className="text-gray-700 font-medium">
                      {expert.name} {expert.surname}
                    </span>
                  </div>
                  <div className="text-[#323232] px-4 py-1.5 bg-[#F8ACAE] text-xs rounded-lg font-semibold ">
                    Ekspert
                  </div>
                </button>
              ))
            ) : (
              <p className="text-gray-500">Ekspert tapılmadı.</p>
            )}
          </div>
          <div className="w-full flex justify-end items-center gap-2">
            <button
              onClick={() => {
                handleCloseModal();
                setSelectedExpert(null);
              }}
              className="px-8 py-1.5 border border-[#D8D6DE] text-[#4B4B4B] rounded-[5px] cursor-pointer transition hover:bg-gray-100 "
            >
              İmtina et
            </button>
            <button
              disabled={selectedExpert === null}
              onClick={() => {
                onSend(selectedExpert);
                setSelectedExpert(null);
              }}
              className="px-8 py-1.5 border border-[#185ABD] bg-[#185ABD] text-white rounded-[5px] cursor-pointer transition hover:bg-[#174891] disabled:cursor-not-allowed disabled:text-gray-40 disabled:bg-[#5d96ec]"
            >
              Göndər
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
