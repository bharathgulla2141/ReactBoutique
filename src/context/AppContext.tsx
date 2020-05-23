import React, {createContext, Dispatch, useReducer} from 'react';
import { AnyAction } from 'redux';
import App from '../App';
import root from '../reducers/root';

const initialState = {
    customers:[],
    transactions:[],
    investments:[]
}

interface ContextState {
    state : {
        customers : any,
        transactions : any,
        investments : any
    }
    dispatch : Dispatch<AnyAction>
}

const AppContext = createContext({} as ContextState);

function Application() {

    const [state, dispatch] = useReducer(root,initialState);

    return (
        <AppContext.Provider value={{state, dispatch}}>
            <App></App>
        </AppContext.Provider>
    );

}


export {AppContext, Application};