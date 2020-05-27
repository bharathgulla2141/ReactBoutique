import { firebase,fireStoreDb } from "../firebase/firebase";

export const setInvestments = async (dispatch) => {
  let investmentsRef = fireStoreDb.collection('investments');
  let result = investmentsRef.where('active','==',true).get().then(snapshot => {
        let investments = [];
        snapshot.forEach(doc => {
            let {date,amount} = doc.data();
            let investment = {
                id : doc.id,
                date : date,
                amount : amount,
            }
            investments.push(investment);
        });
        dispatch({type:'SETINVESTMENTS',investments : investments});
        return true;
      })
      .catch(err => {
        console.log('Error getting documents', err);
        return false;
      });
      return result;
}

export const addInvestment = (date,amount) => {
  
  let timestamp = new firebase.firestore.Timestamp(date,0);
  let investmentRef=fireStoreDb.collection('investments').doc();
  investmentRef.set({amount:Number(amount),date:timestamp,active:true});

}

export const deleteInvestment = (refId) => {
  console.log(refId);
  let investmentRef=fireStoreDb.collection('investments').doc(refId);
  investmentRef.update({active:false}).then().catch(err => {
    console.log('Error updating document',err);
  });
}