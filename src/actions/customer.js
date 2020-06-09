import { fireStoreDb } from "../firebase/firebase";

export const setCustomers = async (dispatch) => {

    let customersRef = fireStoreDb.collection('customers');
    
    let result = customersRef.orderBy('fullName').get().then(snapshot => {
        let customers = [];
        snapshot.forEach(doc => {
            let {fullName,balance,active,contact} = doc.data();
            let customer = {
                id : doc.id,
                fullName : fullName,
                balance : balance ? balance : 0,
                contact : contact,
                active : active
            }
            customers.push(customer);
        });
        dispatch({type:'SETCUSTOMERS',customers : customers});
        return true;
      })
      .catch(err => {
        console.log('Error getting documents', err);
        return false;
      });
      return result;
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

export const addCustomer = async (customer) => {
  let customerRef = fireStoreDb.collection('customers').where('fullName','==',customer.fullName);
   let addFlag = customerRef.get().then(snapshot => {
      if(snapshot.empty) {
            fireStoreDb.collection('customers').doc().set(customer);
            return true;
      }
      else {
        return false;
      }   
  })
  return addFlag;
}

export const updateCustomer = async (customer) => {
  let customerRef = fireStoreDb.collection('customers').doc(customer.customerId);
  let updateStatus = customerRef.update({fullName:customer.name,contact:customer.contact}).then(snapshot => {
      return true;
  })
  return updateStatus;
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