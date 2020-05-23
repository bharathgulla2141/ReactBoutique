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
import { TableCell, Toolbar, TableSortLabel,Tooltip} from "@material-ui/core";
import CustomerRow from "./CustomerRow";

interface sortedDesc {
  value: "desc" | "asc" | undefined;
}

const ViewCustomers: React.FC = () => {
  const { state } = useContext(AppContext);

  let {customers} = state;

  let [filteredCustomers, setFilteredCustomers] = useState<Array<any>>([]);
  let [filteredByName, setFilteredByName] = useState(false);
  let [sortedByAmount, setSortedByAmount] = useState(false);
  let [sortedDesc, setSortedDesc] = useState<sortedDesc>({ value: "asc" });

  useEffect(() => {
    mapContextToState();
  },[state.customers]);

  const mapContextToState = () => {
    let customerArray: Array<any> = [];
    customers.map((customer : any) => {
      customerArray.push(customer);
      return true;
    });
    setFilteredCustomers(customerArray);
  }

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
      let filtered = filteredCustomers.filter((customer: any) => {
        return customer.fullName.includes(e.detail.value);
      });
      setFilteredCustomers(filtered);
      setFilteredByName(true);
    } else {
      setFilteredCustomers(state.customers);
      setFilteredByName(false);
    }
  };

  const sortFunction = () => {
    if (sortedDesc.value === "asc") {
       filteredCustomers.sort(
        (customer1: any, customer2: any) => {
          return customer1.outStandingAmount - customer2.outStandingAmount;
        }
      );
    } else if(sortedDesc.value === "desc"){
       filteredCustomers.sort(
        (customer1: any, customer2: any) => {
          return customer2.outStandingAmount - customer1.outStandingAmount; 
        }
      );
    }
    else {
      if(filteredByName) {
        console.log('FilteredByName');
      }
      else {
        mapContextToState();
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
      <TableContainer id="table" component={Paper}>
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
              filteredCustomers.map((customer: any) => {
                return <CustomerRow key={customer.id} customer={customer} />;
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default ViewCustomers;
