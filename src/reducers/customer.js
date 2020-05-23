const customerReducer = (state = [],action) => {
    switch (action.type) {
        case 'SETCUSTOMERS' :
            return  action.customers;
        case 'ADDCUSTOMERSBULK' :
            return [...state,action.customers];
        default:
            return state;
    }
}

export default customerReducer;