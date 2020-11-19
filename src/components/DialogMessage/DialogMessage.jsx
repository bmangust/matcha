import React, { useState, forwardRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { useDispatch } from "react-redux";
import { deleteAccount } from "../../store/generalSlice";
import { useNotifications } from "../../hooks/useNotifications";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogMessage({
  buttonText,
  yesText,
  noText,
  header,
  text,
}) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const showNotif = useNotifications();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteAccount(showNotif));
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {buttonText}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{header}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {noText}
          </Button>
          <Button onClick={handleDelete} color="primary">
            {yesText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
