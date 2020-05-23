import React, {useContext} from "react";
import {
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Table,
  Paper,
} from "@material-ui/core";
import { IonText, IonToolbar } from "@ionic/react";
import { AppContext } from "../context/AppContext";
import InvestmentRow from "./InvestmentRow";

const InvestmentTable: React.FC = () => {

  const { state } = useContext(AppContext);

  return (
    <>
      <IonToolbar className="ion-text-center" id="toolbar">
        <IonText>Investments</IonText>
      </IonToolbar>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "center" }}>Date</TableCell>
              <TableCell style={{ textAlign: "center" }}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {state.investments.length > 0 && 
                state.investments.map((investment : any) => {
                    return (
                        <InvestmentRow key={investment.id} investment={investment}/>
                    )
                })
              }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default InvestmentTable;
