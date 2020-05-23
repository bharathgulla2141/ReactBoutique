import React, { useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { IonIcon, IonText } from "@ionic/react";
import { chevronUp, chevronDown } from "ionicons/icons";

interface CustomerProps {
  customer: any;
}
const CustomerRow: React.FC<CustomerProps> = (props) => {

  let [open, setOpen] = useState(false);
  

  const classes = makeStyles((theme) => {
    return {
      root: {
        "& > *": {
          borderBottom: "unset",
        },
      },
      buttonpadding: {
        padding: theme.spacing(0.5),
      },
      rowfont: {
        fontSize: theme.spacing(1.5),
        padding: theme.spacing(1),
      },
    };
  });
  return (
    <React.Fragment>
      <TableRow className={classes().root}>
        <TableCell className={classes().rowfont}>
          <IconButton
            aria-label="expand row"
            className={classes().buttonpadding}
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <IonIcon icon={chevronUp} size="small"></IonIcon>
            ) : (
              <IonIcon icon={chevronDown} size="small"></IonIcon>
            )}
          </IconButton>
        </TableCell>
        <TableCell className={classes().rowfont}>
          {props.customer.fullName}
        </TableCell>
        <TableCell className={classes().rowfont}>
          {props.customer.contact}
        </TableCell>
        <TableCell className={classes().rowfont}>
          {props.customer.outStandingAmount}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open}>
            <Box margin={1}>
              <IonText>Transaction History</IonText>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default CustomerRow;
