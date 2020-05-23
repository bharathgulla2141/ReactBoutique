import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

interface InvestmentProps {
  investment: any;
}
const InvestmentRow: React.FC<InvestmentProps> = (props) => {
  return (
    <TableRow>
      <TableCell style={{ textAlign: "center" }}>{props.investment.date}</TableCell>
      <TableCell style={{ textAlign: "center" }}>{props.investment.amount}</TableCell>
    </TableRow>
  );
};

export default InvestmentRow;
