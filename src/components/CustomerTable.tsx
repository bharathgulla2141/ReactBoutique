import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CustomerRow from "./CustomerRow";
import CustomLoader from "./CustomLoader";

interface CustomerTableProps {
  customers: any;
  sortByAmount: any;
  sortedByAmount: boolean;
  sortedDesc: any;
  showLoader : boolean
}
const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  sortByAmount,
  sortedByAmount,
  sortedDesc,
  showLoader
}) => {
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

  return (
    <React.Fragment>
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
            {" "}
            Amount
            <TableSortLabel
              active={sortedByAmount}
              direction={sortedDesc.value}
            ></TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {customers.length > 0 &&
          customers.map((customer: any, index: any) => {
            return (
              <CustomerRow
                key={Math.random() * (index + 1)}
                customer={customer}
              />
            );
          })}
      </TableBody>
    </Table>
    <CustomLoader open={showLoader}></CustomLoader>
    </React.Fragment>
  );
};

export default CustomerTable;
