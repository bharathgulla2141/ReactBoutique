import { firebase, fireStoreDb } from "../firebase/firebase";

export const setTransactions = async (dispatch) => {
  let transactionsRef = fireStoreDb.collection("transactions");
  let result = transactionsRef
    .orderBy("date")
    .get()
    .then((snapShot) => {
      let transactions = [];
      snapShot.forEach((doc) => {
        let { name, amount, balance, customerId, date, type } = doc.data();
        let transaction = {
          id: doc.id,
          name,
          amount,
          customerId: customerId.id,
          balance,
          date,
          type,
        };
        transactions.push(transaction);
      });
      dispatch({ type: "SETTRANSACTIONS", transactions });
      return true;
    });
    return result;
};

export const saveTransaction = async (customer, amount, type, date) => {
  let documentRef = fireStoreDb.collection("customers").doc(customer.id);
  let newTransactionRef = fireStoreDb.collection("transactions").doc();
  let oldBalance = customer.balance;
  let newBalance = 0;
  if (oldBalance === 0) {
    if (type === "add") {
      newBalance = Number(amount);
    }
  } else {
    if (type === "add") {
      newBalance = Number(oldBalance) + Number(amount);
    } else if (type === "clear" && oldBalance >= Number(amount)) {
      newBalance = Number(oldBalance) - Number(amount);
    } else {
      return false;
    }
  }
  let newTransaction = {
    name: customer.fullName,
    amount: Number(amount),
    type: type,
    date: new firebase.firestore.Timestamp(date,0),
    balance: newBalance,
    customerId: documentRef,
  };
  let customerstatus = documentRef.update({ balance: newBalance }).then(() => {return true}).catch((err) => {return false});
  let transactionstatus = newTransactionRef.set(newTransaction).then(() => {return true}).catch((err) => {return false});

  return customerstatus && transactionstatus;
};

export const getTransactionsById = async (customerId) => {
  let customerRef = fireStoreDb.collection("customers").doc(customerId);
  let transactionsRef = fireStoreDb.collection("transactions");
  let transactions = [];
  let status = transactionsRef
    .where("customerId", "==", customerRef)
    .orderBy("date")
    .get()
    .then((snapShot) => {
      snapShot.forEach((doc) => {
        let { name, amount, balance, customerId, date, type } = doc.data();
        let transaction = {
          id: doc.id,
          name,
          amount,
          customerId: customerId.id,
          balance,
          date,
          type,
        };
        transactions.push(transaction);
      });
      return true;
    } 
    );
  return {transactions,status};
};
