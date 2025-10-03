import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { UserRound } from "lucide-react";

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

type ReadFeedbackProps = {
  openModal: boolean;
  handleCloseModal: () => void;
  company: Company | undefined;
};

type Expert = {
  id: number;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  imageUrl: string;
  dateOfBirth: string;
};

type Company = {
  id: number;
  name: string;
  status: string;
  sector: string;
  date: string;
  region: string;
  createdDate: string;
  expert: Expert | null;
  feedback: string | null;
};

export default function ReadFeedback({
  openModal,
  handleCloseModal,
  company,
}: ReadFeedbackProps) {
  return (
    <React.Fragment>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="read-expert-title"
        aria-describedby="read-expert-description"
      >
        <Box sx={{ ...style, width: "100%", maxWidth: 600 }}>
          <h2
            className="text-[#4B4B4B] !text-[20px] text-center !mb-4 font-semibold leading-7 font-plus-jakarta"
            id="read-expert-title"
          >
            Ekspert Rəyi
          </h2>
          {company?.expert ? (
            <div
              className={`w-full rounded-xl py-2 px-2  mb-2 hover:bg-gray-100 transition flex justify-between items-center`}
            >
              <div className="flex items-center gap-3">
                {company?.expert?.imageUrl ? (
                  <img src="/default-avatar.png"></img>
                ) : (
                  <span className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                    <UserRound className="w-5 h-5 text-white" />
                  </span>
                )}
                <span className="text-gray-700 font-medium">
                  {company?.expert?.name} {company?.expert?.surname}
                </span>
              </div>
              <div className="text-[#323232] px-4 py-1.5 bg-[#F8ACAE] text-xs rounded-lg font-semibold ">
                Ekspert
              </div>
            </div>
          ) : (
            <p className="text-gray-500 mb-3">Ekspert tapılmadı.</p>
          )}
          <div className="flex flex-col gap-1 items-center mb-6 px-10">
            <textarea
              className={` w-full h-40 p-3  border border-[#D8D6DE] rounded-[5px] placeholder:text-[#D8D6DE] resize-none font-plus-jakarta cursor-text`}
              value={company?.feedback ? company?.feedback : "Rəy yoxdur."}
              disabled
            ></textarea>
          </div>
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => {
                handleCloseModal();
              }}
              className="px-8 py-2 border border-[#185ABD] bg-[#185ABD] text-white rounded-[5px] cursor-pointer disabled:cursor-not-allowed disabled:text-gray-40 disabled:bg-[#5d96ec] transition hover:bg-[#174891]"
            >
              Tamam
            </button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
