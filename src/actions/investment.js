import { fireStoreDb } from "../firebase/firebase";

export const setInvestments = (dispatch) => {
    
    fireStoreDb.collection('investments').get().then(snapshot => {
        let investments = [];
        snapshot.forEach(doc => {
            let {date,amount} = doc.data();
            console.log(date);
            let investment = {
                id : doc.id,
                date : date.seconds,
                amount : amount,
            }
            investments.push(investment);
        });
        dispatch({type:'SETINVESTMENTS',investments : investments})
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
}