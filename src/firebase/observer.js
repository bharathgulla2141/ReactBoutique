import {fireStoreDb} from './firebase';
import {setCustomers} from '../actions/customer';
import {setInvestments} from '../actions/investment';

export const Observer = (dispatch) =>{
    let customer = fireStoreDb.collection('customers');
    let investment = fireStoreDb.collection('investments');
    let customerobserver = customer.onSnapshot(collectionSnapshot => {
        setCustomers(dispatch);
    })
    let investmentobserver = investment.onSnapshot(collectionSnapshot => {
        setInvestments(dispatch);
    })
    return {customerobserver,investmentobserver};
}