import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { trash } from "ionicons/icons";
import { IonIcon, IonButton } from "@ionic/react";
import { deleteInvestment } from "../actions/investment";
import { formatNumber, formatDate } from "../helpers/util";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

interface InvestmentProps {
  investment: any;
}

const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        padding: "12px",
        fontSize: "0.8rem",
        borderBottom: "1px solid rgba(0,0,0,0.3)",
      },
    },
  },
});

const InvestmentRow: React.FC<InvestmentProps> = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <TableRow>
        <TableCell>
          {formatDate(props.investment.date.seconds, "DD MMM YYYY")}
        </TableCell>
        <TableCell>{formatNumber(props.investment.amount)}</TableCell>
        <TableCell>No data</TableCell>
        <TableCell>No data</TableCell>
      </TableRow>
    </ThemeProvider>
  );
};

export default InvestmentRow;
