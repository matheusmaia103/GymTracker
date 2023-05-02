import { CancelRounded, DeleteRounded } from '@mui/icons-material'
import { Box, Button, Modal, TextField } from '@mui/material'
import React from 'react'

const ModalWindow = ({isOpen, closeModal, children}) =>{
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
    return(
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            {children}
        </Box>
      </Modal>
  )
}

export default ModalWindow