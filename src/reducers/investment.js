const investmentReducer = (state = [],action) => {
    switch (action.type) {
        case 'SETINVESTMENTS' :
            return  action.investments;
        default:
            return state;
    }
}

export default investmentReducer;