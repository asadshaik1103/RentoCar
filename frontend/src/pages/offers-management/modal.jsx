// Author: Aditya Mahale(ad619659@dal.ca)

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

// Custome style
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "0px solid #000",
  borderRadius: "10px",
  boxShadow: 15,
  p: 4,
  width: "60%",
};

export default function DealModal({ open, onClose, children }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
}
