import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { IonText } from "@ionic/react";
import HistoryRow from "./HistoryRow";
import { Box } from "@material-ui/core";

interface HistoryTableProps {
  transactions: any;
  classes: any;
}

const HistoryTable: React.FC<HistoryTableProps> = ({ transactions, classes }) => {
  return (
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
          {transactions.length > 0 &&
            transactions.map((transaction: any, index: any) => {
              return (
                <HistoryRow
                  key={Math.random() * (index + 1)}
                  transaction={transaction}
                  classes={classes}
                />
              );
            })}
        </TableBody>
      </Table>
    </Box>
  );
};

export default HistoryTable;
