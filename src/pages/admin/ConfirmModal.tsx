import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { QuestionMarkIcon } from "../../components/SVG/Admin";

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

type ChildModalProps = {
  openChild: boolean;
  handleCloseChild: () => void;
  handleCloseModal: () => void;
  handleDelete: () => void;
};

function ChildModal({
  openChild,
  handleCloseChild,
  handleCloseModal,
  handleDelete,
}: ChildModalProps) {
  return (
    <React.Fragment>
      <Modal
        open={openChild}
        onClose={handleCloseChild}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "100%", maxWidth: 500 }}>
          <div className="w-full flex justify-center mb-4">
            <div className="w-8 h-8 rounded-full bg-[#F2A356] flex items-center justify-center">
              <QuestionMarkIcon />
            </div>
          </div>
          <h2
            className="text-[#4B4B4B] !text-[18px] text-center mb-6 font-semibold leading-7"
            id="child-modal-title"
          >
            Əminsiniz?
          </h2>
          <h3
            className="text-[#98A0B4] !text-[14px] text-center mb-6 font-medium leading-5"
            id="child-modal-title"
          >
            Müraciəti sildiyiniz zaman geri qaytarmaq mümkün olmayacaq.
          </h3>
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => {
                handleDelete();
                handleCloseChild();
                handleCloseModal();
              }}
              className="px-8 py-2 border border-[#185ABD] bg-[#185ABD] text-white rounded-[5px] cursor-pointer"
            >
              Bəli
            </button>
            <button
              onClick={handleCloseChild}
              className="px-8 py-2 border border-[#D8D6DE] text-[#4B4B4B] rounded-[5px] cursor-pointer"
            >
              Xeyr
            </button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

type NestedModalProps = {
  handleDelete: () => void;
  openModal: boolean;
  handleCloseModal: () => void;
};

export default function NestedModal({
  handleDelete,
  openModal,
  handleCloseModal,
}: NestedModalProps) {
  const [openChild, setOpenChild] = React.useState(false);
  const handleOpenChild = () => {
    setOpenChild(true);
  };
  const handleCloseChild = () => {
    setOpenChild(false);
  };

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <div className="w-full flex justify-center mb-4">
            <div className="w-8 h-8 rounded-full bg-[#F2A356] flex items-center justify-center">
              <QuestionMarkIcon />
            </div>
          </div>
          <h2
            className="text-[#4B4B4B] !text-[18px] text-center mb-6 font-semibold leading-7"
            id="parent-modal-title"
          >
            Müraciəti silmək istəyirsiniz?
          </h2>
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={handleOpenChild}
              className="px-8 py-2 border border-[#185ABD] bg-[#185ABD] text-white rounded-[5px] cursor-pointer"
            >
              Bəli
            </button>
            <button
              onClick={handleCloseModal}
              className="px-8 py-2 border border-[#D8D6DE] text-[#4B4B4B] rounded-[5px] cursor-pointer"
            >
              Xeyr
            </button>
          </div>
          <ChildModal
            openChild={openChild}
            handleCloseChild={handleCloseChild}
            handleCloseModal={handleCloseModal}
            handleDelete={handleDelete}
          />
        </Box>
      </Modal>
    </div>
  );
}
