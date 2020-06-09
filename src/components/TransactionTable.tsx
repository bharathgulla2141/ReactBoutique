import React from "react";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import TransactionRow from "./TransactionRow";

interface TableProps {
  transactions: any;
}

const TransactionTable: React.FC<TableProps> = ({ transactions }) => {
  return (
    <React.Fragment>
      <Box className="transaction-card" overflow="auto" component="div">
        <TableContainer>
          <Table>
            <TableHead style={{background : "rgba(0, 123, 255, 0.6)"}}>
              <TableRow>
                <TableCell>TransactionId</TableCell>
                <TableCell>CustomerName</TableCell>
                <TableCell>TransactionDate</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.length > 0 &&
                transactions.map((transaction: any) => {
                  return (
                    <TransactionRow
                      key={transaction.id}
                      transaction={transaction}
                    ></TransactionRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </React.Fragment>
  );
};

export default TransactionTable;
