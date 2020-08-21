import React, { useContext, useEffect, useState } from "react";
import {
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Table,
  Paper,
  Typography,
  Box,
} from "@material-ui/core";
import { IonText, IonToolbar } from "@ionic/react";
import { AppContext } from "../context/AppContext";
import InvestmentRow from "./InvestmentRow";
import { getOutstandingBalances, formatNumber } from "../helpers/util";

const InvestmentTable: React.FC = () => {
  const { state } = useContext(AppContext);
  let [balance, setBalance] = useState(0);
  let [addedbalance, setAddBalance] = useState(0);
  let [clearedbalance, setClearBalance] = useState(0);

  useEffect(() => {
    let balances = getOutstandingBalances(state);
    setBalance(balances.balance);
    setAddBalance(balances.addBalance);
    setClearBalance(balances.clearBalance);
  }, [state]);

  return (
    <>
      <IonToolbar className="ion-text-center" id="toolbar">
        <IonText>Investments</IonText>
      </IonToolbar>
      <Box className="investment-card" overflow="auto" component="div">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>PurchaseDate</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Purchased(Qty)</TableCell>
                <TableCell>Sold(Qty)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.investments.length > 0 &&
                state.investments.map((investment: any) => {
                  return (
                    <InvestmentRow
                      key={investment.id}
                      investment={investment}
                    />
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Typography
        variant="body1"
        style={{ marginTop: "10px", color: "rgb(40, 167, 69)" }}
      >
        Overall Added Balance: {formatNumber(addedbalance)}
      </Typography>
      <Typography
        variant="body1"
        style={{ marginTop: "10px", color: "rgb(255, 7, 58)" }}
      >
        Overall Cleared Balance: {formatNumber(clearedbalance)}
      </Typography>
      <Typography
        variant="body1"
        style={{ marginTop: "10px", color: "rgb(0, 123, 255)" }}
      >
        Outstanding Balance: {formatNumber(balance)}
      </Typography>
    </>
  );
};

export default InvestmentTable;
