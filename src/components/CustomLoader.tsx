import React from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

interface LoaderProps {
    open : boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

const CustomLoader: React.FC<LoaderProps> = ({open}) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Backdrop open={open} className={classes.backdrop}>
        <CircularProgress color="primary" variant="indeterminate"></CircularProgress>
      </Backdrop>
    </React.Fragment>
  );
};

export default CustomLoader;
