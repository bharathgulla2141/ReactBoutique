import React, { useState, useEffect } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { IonIcon, IonText } from "@ionic/react";
import { chevronUp, chevronDown } from "ionicons/icons";
import { Table, TableHead, TableBody } from "@material-ui/core";
import { getTransactionsById } from "../actions/transaction";
import HistoryRow from "./HistoryRow";
import {formatNumber} from "../helpers/util";

interface CustomerProps {
  customer: any;
}
const CustomerRow: React.FC<CustomerProps> = (props) => {
  let [open, setOpen] = useState(false);
  let [transactionHistory, setTransactionHistory] = useState<any>([]);

  useEffect(() => {
    getTransactionHistory();
  },[])

  const getTransactionHistory = () => {
      let transactions = getTransactionsById(props.customer.id);
      setTransactionHistory(transactions);
  };

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
        wordBreak: "break-all",
        maxWidth: theme.spacing(12),
      },
      transactionfont: {
        fontSize: theme.spacing(1.5),
        padding: theme.spacing(0.5),
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
          {formatNumber(props.customer.balance)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open}>
            <Box margin={1}>
              <IonText>Transaction History</IonText>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes().transactionfont}>Date</TableCell>
                    <TableCell className={classes().transactionfont}>Type</TableCell>
                    <TableCell className={classes().transactionfont}>Amount</TableCell>
                    <TableCell className={classes().transactionfont}>Balance</TableCell>
                  </TableRow>
                  </TableHead>
                  <TableBody>
                  {transactionHistory.length > 0 &&
                    transactionHistory.map((transaction: any,index : any) => {
                      return (
                          <HistoryRow key={Math.random() * (index + 1)} transaction={transaction} classes={classes}/>
                      );
                    })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default CustomerRow;
