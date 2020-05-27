import React, {useContext,useEffect, useState} from "react";
import {
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Table,
  Paper,
  Typography
} from "@material-ui/core";
import { IonText, IonToolbar } from "@ionic/react";
import { AppContext } from "../context/AppContext";
import InvestmentRow from "./InvestmentRow";
import {getOutstandingBalances,formatNumber} from "../helpers/util";

const InvestmentTable: React.FC = () => {

  const { state } = useContext(AppContext);
  let [balance , setBalance] = useState(0);
  let [addedbalance , setAddBalance] = useState(0);
  let [clearedbalance , setClearBalance] = useState(0);

  useEffect(() => {
    let balances = getOutstandingBalances(state);
    setBalance(balances.balance);
    setAddBalance(balances.addBalance);
    setClearBalance(balances.clearBalance);
  },[state]);

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
              <TableCell style={{ textAlign: "center" }}></TableCell>
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
      <Typography variant="body1" color="primary" style={{marginTop:"10px", color:"rgba(0, 123, 255, 0.6)"}}>
        Outstanding Balance: {formatNumber(balance)}
      </Typography>
      <Typography variant="body1" style={{marginTop:"10px", color:"rgba(40, 167, 69, 0.6)"}}>
        Overall Added Balance: {formatNumber(addedbalance)}
      </Typography>
      <Typography variant="body1" color="primary" style={{marginTop:"10px",color : "rgba(255, 7, 58, 0.6)"}}>
        Overall Cleared Balance: {formatNumber(clearedbalance)}
      </Typography>
    </>
  );
};

export default InvestmentTable;
