import {fireStoreDb} from './firebase';
import {setCustomers} from '../actions/customer';
import {setInvestments} from '../actions/investment';
import {setTransactions} from '../actions/transaction';

export const Observer = (dispatch) =>{
    let customer = fireStoreDb.collection('customers');
    let investment = fireStoreDb.collection('investments');
    let transaction = fireStoreDb.collection('transactions');
    let customerobserver = customer.onSnapshot(collectionSnapshot => {
        setCustomers(dispatch);
    })
    let investmentobserver = investment.onSnapshot(collectionSnapshot => {
        setInvestments(dispatch);
    })
    let transactionobserver = transaction.onSnapshot(collectionSnapshot => {
        setTransactions(dispatch)
    })
    return {customerobserver,investmentobserver,transactionobserver};
}