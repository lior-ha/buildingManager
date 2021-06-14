export const residentsPayments = (transactionDetails, aptsData, building, transactionId, addTransaction, updateProperty) => {
    const year = new Date().getFullYear();

    // Get this apartment's data
    const aptData = aptsData.find(apt => apt.id === transactionDetails.aptId);
    let paymentsStatus = aptData.paymentsStatus;
    
    // Check if there's any paymentsStatus for this apt
    if (Object.keys(paymentsStatus).length === 0 || !paymentsStatus[year]) {
        paymentsStatus[year] = [];
    }


    // Checks if value is already paid. If so return error.
    if (paymentsStatus[year][transactionDetails.month] && paymentsStatus[year][transactionDetails.month].status === 'paid' ) {

        console.log('error: already paid for this month');
        return;

    } else {            
        // Mutate to paid/partial
        let sum = transactionDetails.sum;
        const monthlyDue = parseInt(aptData.var);
        let curMonth = parseInt(transactionDetails.month);

        for (let key in paymentsStatus[year]) {
            let partialSum = 0;

            if (paymentsStatus[year][key].status === 'partial') {
                const initialSum = sum;
                partialSum = parseInt(paymentsStatus[year][key].sum);
                sum -= (monthlyDue - partialSum);

                if (sum >= 0) {
                    paymentsStatus[year][key].status = 'paid';
                    paymentsStatus[year][key].sum = monthlyDue;
                } else {
                    paymentsStatus[year][key].sum = partialSum + initialSum;
                }
            }

            curMonth++;
        }

        if (sum > 0) {
            const paidMonths = Math.ceil(sum/monthlyDue);

            for (let i=curMonth; i < (curMonth + paidMonths); i++) {
                if (sum >= monthlyDue) {
                    paymentsStatus[year].push({
                        status: 'paid',
                        sum: monthlyDue,
                        transactionId: transactionId
                    })
                } else if (sum < monthlyDue) {
                    paymentsStatus[year].push({
                        status: 'partial',
                        sum: sum,
                        transactionId: transactionId
                    })
                }
                sum -= monthlyDue;
            } 
        }
    }

    // Populate transaction's document with data
    //updateTransaction(`buildings/${building}/transactions`, transactionId, {...transactionDetails, ...newDates})

    // Update apartments's document with changes
    updateProperty(`buildings/${building}/apartments`, transactionDetails.aptId, {paymentsStatus: {...paymentsStatus}})
        .then(() => {
            return
        })
        .catch((err) => {
            console.log(err);
        });
}