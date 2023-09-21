import {useState} from 'react'
// import React,{useContext} from "react";
// import { StareStvariContext } from '../../context';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Warning
} from "@mui/material";
import WarningAmberIcon  from "@mui/icons-material/WarningAmber";
import "../../scss/mojProfil/_alertObrisiOglas.scss";
import { Login } from "@mui/icons-material";

export default function MojOglasObrisiAlert({ open, handleClose }) {
  // const value=useContext(StareStvariContext)
  // console.log(value);


  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = (e) => {
  //   e.preventDefault()
  //   setAnchorEl(null);
  //   console.log('deleted');
  // };




  return (
    <>
        <Dialog
        className='alertObrisi'
          open={open} //{open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      
        >
          <DialogTitle id="alert-dialog-title">
            <p>
              <WarningAmberIcon />
            </p>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Da li ste sigurni da želite da obrišete oglas?
            </DialogContentText>
          </DialogContent>
          <DialogActions className="buttonsDialog">
            <button className="obrisiDa"data-index="da" onClick={handleClose}>Da</button>
            <button className="obrisiNe" data-index="ne" onClick={handleClose}>Ne</button>
          </DialogActions>
        </Dialog>
    </>
  );
}
