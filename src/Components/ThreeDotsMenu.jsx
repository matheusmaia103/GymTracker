import {useState} from 'react'
import { MoreVertRounded } from '@mui/icons-material'
import { Button, Fade, IconButton, Menu, MenuItem } from '@mui/material'
import React, { Children } from 'react'

const ThreeDotsMenu = ({ children, anchorEl, setAnchorEl }) => {
  const open = anchorEl;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        id="fade-button"
        aria-label="more"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ width: '48px', height: '48px', alignSelf: 'center' }}
      >
        <MoreVertRounded />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {children}
      </Menu>
    </>
  );
};

export default ThreeDotsMenu
