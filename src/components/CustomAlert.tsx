import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";

interface alertProps {
  open: boolean;
  title?: string;
  message?: string;
  buttons: Array<any>;
  handlefunction: any;
  isError? : boolean
}

const CustomAlert: React.FC<alertProps> = ({
  open,
  title,
  message,
  buttons,
  handlefunction,
  isError
}) => {

  return (
    <Dialog open={open} onClose={handlefunction} disableBackdropClick={true}>
      {title && <DialogTitle>{title}</DialogTitle>}

      {message && (
        <DialogContent>
          <DialogContentText color= {isError ? "error" : "primary"}>{message}</DialogContentText>
        </DialogContent>
      )}

      <DialogActions>
        {buttons.length > 0 &&
          buttons.map((button, index) => {
            return (
              <Button key={index} onClick={button.handler} color={isError ? "secondary" : "primary"}>
                {button.title}
              </Button>
            );
          })}
      </DialogActions>
    </Dialog>
  );
};

export default CustomAlert;
