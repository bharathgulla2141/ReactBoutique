const transactionReducer = (state = [],action) => {
    switch (action.type) {
        case 'SETTRANSACTIONS' :
            return action.transactions;
        default:
            return state;
    }
}

export default transactionReducer;