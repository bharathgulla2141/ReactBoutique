import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { formatDate, formatNumber } from "../helpers/util";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

interface RowProps {
  transaction: any;
}
const TransactionRow: React.FC<RowProps> = ({ transaction }) => {
  const theme = createMuiTheme({
    overrides: {
        MuiTableCell: {
          root: {
            padding: "10px",
            fontSize: "0.8rem"
          },
        },
      },
  });
  return (
    <ThemeProvider theme={theme}>
      <TableRow>
        <TableCell>{transaction.id}</TableCell>
        <TableCell>{transaction.name}</TableCell>
        <TableCell>
          {formatDate(transaction.date.seconds, "DD MMM YYYY")}
        </TableCell>
        <TableCell>{transaction.type}</TableCell>
        <TableCell>{formatNumber(transaction.amount)}</TableCell>
        <TableCell>{formatNumber(transaction.balance)}</TableCell>
      </TableRow>
    </ThemeProvider>
  );
};

export default TransactionRow;
