import { CancelRounded, ClearRounded, DeleteRounded } from '@mui/icons-material'
import { Box, Button, IconButton, Modal, TextField } from '@mui/material'
import React from 'react'

const ModalWindow = ({isOpen, closeModal, children}) =>{
const style = {
  maxWidth: 'fit-content',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid #4b4b4b',
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: 24,
  p: 3,
  paddingTop: '8px',
};
    return (
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div style={{ width: '100%', textAlign: 'right' }}>
          <IconButton onClick={closeModal}>
            <ClearRounded />
          </IconButton>
        </div>          
          {children}
        </Box>
      </Modal>
    );
}

export default ModalWindow