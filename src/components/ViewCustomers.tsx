/* eslint-disable no-unreachable */
import React, { useContext, useState, useEffect } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import { search } from "ionicons/icons";
import { IonIcon, IonItem, IonInput, IonLoading } from "@ionic/react";
import { AppContext } from "../context/AppContext";
import { Toolbar } from "@material-ui/core";
import CustomerTable from "./CustomerTable";

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
  let [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {mapContextToState(state.customers)},1000);
  }, [state.customers]);

  const mapContextToState = (customers: any) => {
    let customerArray: Array<any> = [...customers];
    setFilteredCustomers(customerArray);
    setShowLoader(false);
  };

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
      let ascArray = filteredCustomers.sort(
        (customer1: any, customer2: any) => {
          return customer1.balance - customer2.balance;
        }
      );
      mapContextToState(ascArray);
    } else if (sortedDesc.value === "desc") {
      let descArray = filteredCustomers.sort(
        (customer1: any, customer2: any) => {
          return customer2.balance - customer1.balance;
        }
      );
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
      <TableContainer
        id="table"
        component={Paper}
        style={{ background: "rgba(40,167,69,.12549)" }}
      >
        <Toolbar>
          <IonItem id="table-item" lines="none">
            <IonIcon className="icon" icon={search}></IonIcon>
            <IonInput
              onIonChange={(e) => searchCustomer(e)}
            ></IonInput>
          </IonItem>
        </Toolbar>
        <CustomerTable
          customers={filteredCustomers}
          sortedByAmount={sortedByAmount}
          sortedDesc={sortedDesc}
          sortByAmount ={sortByAmount}
          showLoader ={showLoader}
        ></CustomerTable>
      </TableContainer>
      <IonLoading
        isOpen={false}
        message="Loading ..."
        duration={1000}
        spinner="crescent"
      ></IonLoading>
    </React.Fragment>
  );
};

export default ViewCustomers;
