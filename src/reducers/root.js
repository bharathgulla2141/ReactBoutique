import { combineReducers } from "redux";
import investment from "./investment";
import customer from "./customer";
import transaction from "./transaction";

const rootReducer = combineReducers({
  customers: customer,
  investments: investment,
  transactions: transaction,
});

export default rootReducer;
