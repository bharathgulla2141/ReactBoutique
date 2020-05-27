/* eslint-disable no-unreachable */
import React, { useContext, useState, useEffect } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { search } from "ionicons/icons";
import { IonIcon, IonItem, IonInput } from "@ionic/react";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "../context/AppContext";
import { TableCell, Toolbar, TableSortLabel, Tooltip } from "@material-ui/core";
import CustomerRow from "./CustomerRow";

interface sortedDesc {
  value: "desc" | "asc" | undefined;
}

const ViewCustomers: React.FC = () => {
  const { state } = useContext(AppContext);

  let [filteredCustomers, setFilteredCustomers] = useState<Array<any>>([]);
  let [filteredByName, setFilteredByName] = useState(false);
  let [sortedByAmount, setSortedByAmount] = useState(false);
  let [searchText, setSearchText] = useState("");
  let [sortedDesc, setSortedDesc] = useState<sortedDesc>({ value: "asc" });

  useEffect(() => {
    mapContextToState(state.customers);
  }, [state.customers]);

  const mapContextToState = (customers: any) => {
    let customerArray: Array<any> = [];
    customers.map((customer: any) => {
      customerArray.push(customer);
      return true;
    });
    setFilteredCustomers(customerArray);
  };

  const classes = makeStyles((theme) => {
    return {
      buttonpadding: {
        padding: theme.spacing(0.5),
      },
      rowfont: {
        fontSize: theme.spacing(1.5),
        padding: theme.spacing(1),
      },
    };
  });

  const searchCustomer = (e: CustomEvent) => {
    if (!(e.detail.value === "")) {
      let filtered = state.customers.filter((customer: any) => {
        return customer.fullName.includes(e.detail.value);
      });
      mapContextToState(filtered);
      setFilteredByName(true);
    } else {
      mapContextToState(state.customers);
      setFilteredByName(false);
    }
    setSearchText(e.detail.value);
  };

  const sortFunction = () => {
    if (sortedDesc.value === "asc") {
      let ascArray = filteredCustomers.sort((customer1: any, customer2: any) => {
        return customer1.balance - customer2.balance;
      });
      mapContextToState(ascArray);
    } else if (sortedDesc.value === "desc") {
      let descArray = filteredCustomers.sort((customer1: any, customer2: any) => {
        return customer2.balance - customer1.balance;
      });
      mapContextToState(descArray);
    } else {
      if (!filteredByName) {
        mapContextToState(state.customers);
      } else {
        if (searchText.length > 0) {
          let searchfiltered = state.customers.filter((customer: any) => {
            return customer.fullName.includes(searchText);
          });
          mapContextToState(searchfiltered);
        }
      }
    }
  };

  const sortByAmount = () => {
    if (sortedByAmount) {
      if (sortedDesc.value === "desc") {
        sortFunction();
        setSortedDesc({ value: undefined });
      } else {
        sortFunction();
        setSortedDesc({ value: "asc" });
        setSortedByAmount(false);
      }
    } else {
      sortFunction();
      setSortedByAmount(true);
      setSortedDesc({ value: "desc" });
    }
  };

  return (
    <React.Fragment>
      <TableContainer id="table" component={Paper} style ={{background : "rgba(40,167,69,.12549)"}}>
        <Toolbar>
          <IonItem id="table-item" lines="none">
            <IonIcon className="icon" icon={search}></IonIcon>
            <IonInput
              className="input"
              onIonChange={(e) => searchCustomer(e)}
            ></IonInput>
          </IonItem>
        </Toolbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes().rowfont} />
              <TableCell className={classes().rowfont}>Full Name</TableCell>
              <TableCell className={classes().rowfont}>Contact</TableCell>
              <TableCell
                className={classes().rowfont}
                style={{ cursor: "pointer" }}
                onClick={() => sortByAmount()}
              >
                <Tooltip title="Togglesort" placement="top" role="popover">
                  <span>Amount</span>
                </Tooltip>

                <TableSortLabel
                  active={sortedByAmount}
                  direction={sortedDesc.value}
                ></TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.length > 0 &&
              filteredCustomers.map((customer: any, index) => {
                return (
                  <CustomerRow
                    key={Math.random() * (index + 1)}
                    customer={customer}
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default ViewCustomers;
