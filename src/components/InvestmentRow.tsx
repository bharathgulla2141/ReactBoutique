import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { trash } from "ionicons/icons";
import { IonIcon, IonButton } from "@ionic/react";
import { deleteInvestment } from "../actions/investment";
import {formatNumber,formatDate} from "../helpers/util";

interface InvestmentProps {
  investment: any;
}
const InvestmentRow: React.FC<InvestmentProps> = (props) => {
  return (
    <TableRow>
      <TableCell style={{ textAlign: "center" }}>{formatDate(props.investment.date.seconds,'DD MMMM YYYY')}</TableCell>
      <TableCell style={{ textAlign: "center" }}>{formatNumber(props.investment.amount)}</TableCell>
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
