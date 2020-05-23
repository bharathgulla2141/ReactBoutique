import { fireStoreDb } from "../firebase/firebase";

export const setCustomers = (dispatch) => {

    let customersRef = fireStoreDb.collection('customers');
    
    customersRef.orderBy('fullName').get().then(snapshot => {
        let customers = [];
        snapshot.forEach(doc => {
            let {fullName,outStandingAmount,active,contact} = doc.data();
            let customer = {
                id : doc.id,
                fullName : fullName,
                outStandingAmount : outStandingAmount ? outStandingAmount : 0,
                contact : contact,
                active : active
            }
            customers.push(customer);
        });
        dispatch({type:'SETCUSTOMERS',customers : customers})
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
}

export const addCustomersData = (parsedData) => {

  let customerObjects = convertParsedData(parsedData);

  let batch = fireStoreDb.batch();

  customerObjects.map((customerObj) => {
      let customerRef = fireStoreDb.collection('customers').doc();
      batch.set(customerRef,customerObj);
      return true;
  })

  batch.commit().then(function() {
      console.log('Batch is done');
  })

}

export const addCustomer = (customer) => {
  let customerRef = fireStoreDb.collection('customers').doc();
  customerRef.set(customer);
}

function convertParsedData (parsedData) {

  let bulkData = [];

  parsedData.map((cust) => {
      let customerObject = {...cust,active:true};
      bulkData.push(customerObject);
      return true;
  })

  return bulkData;
}