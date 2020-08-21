import React from 'react';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {formatNumber,formatDate} from "../helpers/util";

interface HistoryProps {
    transaction : any,
    classes : any
}
const HistoryRow : React.FC<HistoryProps> = (props) => {
    return (
        <TableRow>
            <TableCell className={props.classes().transactionfont}>{formatDate(props.transaction.date.seconds,'DD MMMM YYYY')}</TableCell>
            <TableCell className={props.classes().transactionfont}>{props.transaction.type}</TableCell>
            <TableCell className={props.classes().transactionfont}>{formatNumber(props.transaction.amount)}</TableCell>
            <TableCell className={props.classes().transactionfont}>{formatNumber(props.transaction.balance)}</TableCell>
        </TableRow>
    );
}

export default HistoryRow;