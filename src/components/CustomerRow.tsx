import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TableCell, TableRow, Collapse, IconButton } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { IonIcon } from "@ionic/react";
import { chevronUp, chevronDown } from "ionicons/icons";
import { getTransactionsById } from "../actions/transaction";
import HistoryTable from "./HistoryTable";

import { formatNumber } from "../helpers/util";

interface CustomerProps {
  customer: any;
}
const CustomerRow: React.FC<CustomerProps> = ({ customer }) => {
  let [open, setOpen] = useState(false);
  let [transactions, setTransactions] = useState<any>([]);

  const getTransactionHistory = async () => {
    let result: any;
    if (transactions.length === 0) {
      result = await getTransactionsById(customer.id);
      if (result.status) {
        setTransactions(result.transactions);
        setTimeout(() => {
          setOpen(!open);
        }, 500);
      }
    } else {
      setOpen(!open);
    }
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
            onClick={() => getTransactionHistory()}
          >
            {open ? (
              <IonIcon icon={chevronUp} size="small"></IonIcon>
            ) : (
              <IonIcon icon={chevronDown} size="small"></IonIcon>
            )}
          </IconButton>
        </TableCell>
        <TableCell className={classes().rowfont}>
          <Link
            to={`/update?id=${customer.id}&name=${customer.fullName}&contact=${customer.contact}`}
            className="link" color="primary"
          >
            {customer.fullName}
          </Link>
        </TableCell>
        <TableCell className={classes().rowfont}>{customer.contact}</TableCell>
        <TableCell className={classes().rowfont}>
          {formatNumber(customer.balance)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open}>
            <HistoryTable
              transactions={transactions}
              classes={classes}
            ></HistoryTable>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default CustomerRow;
