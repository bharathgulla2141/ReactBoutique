import moment from "moment";

export const formatNumber = (number) => {
    return Number(number).toLocaleString('en-IN',{ style: "currency", currency: "INR" });
}

export const formatDate = (date,format) => {
    return moment.unix(date).format(format);
}

export const getOutstandingBalances = (state) => {
    let balance = 0,addBalance=0,clearBalance=0;
    state.customers.map((customer) => {
        balance = balance + customer.balance;
        return true;
    });
    state.transactions.map((transaction) => {
        if(transaction.type === "add") {
            addBalance = addBalance + transaction.amount;
        }
        else if(transaction.type === "clear") {
            clearBalance = clearBalance + transaction.amount;
        }
        return true;
    })
    return {balance,addBalance,clearBalance};
}

export const getMonthsUnixNumberArray = (date) => {
    let monthsarray = []
    let year = moment(date).year();
    for (let index = 0; index < 12; index++) { 
        let monthUnixNumber = moment().year(year).month(index).date(1).hour(0).minute(0).second(0).milliseconds(0).unix();
         /* console.log(moment.unix(monthUnixNumber).year(),moment.unix(monthUnixNumber).month(),moment.unix(monthUnixNumber).date(),
        moment.unix(monthUnixNumber).hour(),moment.unix(monthUnixNumber).minute(),moment.unix(monthUnixNumber).milliseconds());   */
        monthsarray.push(monthUnixNumber);
    }
    let nextYearUnixstamp = moment().year(year+1).month(1).date(1).hour(0).minute(0).second(0).milliseconds(0).unix();
    monthsarray.push(nextYearUnixstamp);
    return monthsarray;
}

export const getMonthlyTransactionData = (unixstampArray,transactions) => {
    let monthlyData = [];
    for (let index = 0; index < unixstampArray.length-1; index++) {
        let monthlySum = 0;
        transactions.map((transaction) => {
            if(transaction.type === "clear" && transaction.date.seconds > unixstampArray[index] && transaction.date.seconds < unixstampArray[index+1]) {
                monthlySum = monthlySum + transaction.amount;
            }
            return true;
        })
        monthlyData.push(monthlySum);
    }
    return monthlyData;
}

