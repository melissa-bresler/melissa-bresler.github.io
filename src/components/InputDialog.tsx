import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface DialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  content: string;
}

export const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const InputDialog: React.FC<DialogProps> = ({
  open,
  setOpen,
  title,
  content,
}) => {
  return (
    <Dialog
      open={open}
      slots={{ transition: Transition }}
      keepMounted
      onClose={() => setOpen(false)}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>{title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => setOpen(false)}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "var(--pink)",
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
        {/* TODO: Add passcode input */}
        {/* TODO: custom image i.e. clue  */}
      </DialogContent>
    </Dialog>
  );
};

export default InputDialog;
