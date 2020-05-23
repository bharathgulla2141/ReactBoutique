import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { trash } from "ionicons/icons";
import moment from "moment";
import { IonIcon, IonButton } from "@ionic/react";
import { deleteInvestment } from "../actions/investment";

interface InvestmentProps {
  investment: any;
}
const InvestmentRow: React.FC<InvestmentProps> = (props) => {
  const formattedAmount = Number(
    props.investment.amount
  ).toLocaleString("en-IN", { style: "currency", currency: "INR" });
  const formattedDate = moment
    .unix(props.investment.date.seconds)
    .format("DD MMMM YYYY");

  return (
    <TableRow>
      <TableCell style={{ textAlign: "center" }}>{formattedDate}</TableCell>
      <TableCell style={{ textAlign: "center" }}>{formattedAmount}</TableCell>
      <TableCell style={{ textAlign: "center" }}>
        <IonButton
          fill="clear"
          onClick={() => deleteInvestment(props.investment.id)}
        >
          <IonIcon icon={trash} size="small"></IonIcon>
        </IonButton>
      </TableCell>
    </TableRow>
  );
};

export default InvestmentRow;
