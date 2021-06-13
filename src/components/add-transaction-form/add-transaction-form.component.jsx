import { Fragment, useState, useEffect } from 'react';

import { addItems, updateItems, updateProperty } from '../../firebase/firebase.utils';

import { getDates, monthName } from '../../shared/js-utils';

import { FormInputSingle, FormSelect } from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './add-transaction-form.styles.scss';

const AddTransactionForm = ({ changeParams, setResetForm, params, building, apartmentsData }) => {
    const [ transactionDetails, setTransactionDetails ] = useState({});

    const [ formType, setFormType ] = useState('');
    const [ validity, setValidity ] = useState(true);
    const [ transactionId, setTransactionId ] = useState('');

    
    const sortByApt = (a, b) => {
        return a.apartment - b.apartment;
    }

    const paymentMethods = [
        {id: 1, value: 'מזומן', text: 'מזומן'},
        {id: 2, value: 'אשראי', text: 'אשראי'},
        {id: 3, value: 'העברה בנקאית', text: 'העברה בנקאית'},
        {id: 4, value: 'אינטרנט', text: 'אינטרנט'},
        {id: 5, value: 'צ\'ק', text: 'צ\'ק'}
    ];

    const aptsData = apartmentsData
                    .sort(sortByApt)
                    .map(apartment => ({
                            id: apartment.id,
                            text: `דירה ${apartment.apartment}`,
                            var: apartment.monthlyDue,
                            paymentsStatus: apartment.paymentsStatus
                    }));
                    
    const monthsList = [];
    for (let i=0; i<=11; i++) {
        monthsList.push({id: i, value: i+1, text: monthName(parseInt(i)+1)});
    }

    useEffect(() => {
        setTransactionDetails(({
            apt: '',
            aptId: '',
            description: '',
            sum: '',
            month: '',
            paymentMethod: '',
            incomeSource: '',
            other: '',
            type: formType,
            createdAt: '',
            lastUpdated: ''
        }))
    }, [formType]);

    useEffect(() => {
        const {type, sum, apt, month, paymentMethod, description, other, incomeSource } = transactionDetails;
        if (
            (type==='income' && incomeSource === '') 
            || ((type==='income' && incomeSource === 'buildingPayment') && (apt === '' || month === '' || sum === '' || paymentMethod === ''))
            || ((type==='income' && incomeSource === 'other') && (other === '' || description === '' || sum === '' || paymentMethod === ''))
            || (type==='expense' && (sum === '' || description === ''))
            ) {
                setValidity(true);
            } else {
                setValidity(false)
            }
    }, [formType, transactionDetails]);

    const handleSubmit = async e => {
        e.preventDefault();
        
        const newDates = getDates(transactionDetails);

        if (transactionDetails.incomeSource === 'buildingPayment') {
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

                // Create transaction ID
                addTransaction(`buildings/${building}/transactions`, {});
                
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
            updateTransaction(`buildings/${building}/transactions`, transactionId, {...transactionDetails, ...newDates})

            // Update apartments's document with changes
            updateProperty(`buildings/${building}/apartments`, transactionDetails.aptId, {paymentsStatus: {...paymentsStatus}})
                .then(() => {
                    return
                })
                .catch((err) => {
                    console.log(err);
                });
        }        

        if (!transactionId) {
            addTransaction(`buildings/${building}/transactions`, {...transactionDetails, ...newDates})
        } else {
            updateTransaction(`buildings/${building}/transactions`, transactionId, {...transactionDetails, ...newDates})
        }
    }

    const addTransaction = (path, content) => {
        addItems(path, content)
            .then((result) => {
                setTransactionId(result)
                setFormType('');
                setResetForm('');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const updateTransaction = (path, id, content) => {
        updateItems(path, id, content)
            .then(() => {
                setFormType('');
                setResetForm('');
            })
            .catch((err) => {
                console.log(err);
            });
    }


    const handleSingleInputEvent = e => {
        const {name, value} = e.target;
        setTransactionDetails(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name==='type') {
            setFormType(value);
            changeParams(value);
        }
    }

    const handleSelectSourceEvent = e => {
        const target = e.target.children[e.target.selectedIndex];
        const aptId = target.id;
        const apt = target.text;
        const month = transactionDetails.month;
        const description = `וועד`;

        let due = '';
        if (target.attributes['var']) {
            due = target.attributes['var'].value
        }
        
        setTransactionDetails(prevState => ({
            ...prevState,
            month,
            sum: due,
            apt,
            aptId,
            description
        }));
    }

    const handleSelectMethodEvent = e => {
        const value = e.target.value;
        setTransactionDetails(prevState => ({
            ...prevState,
            paymentMethod: value
        }))
    }
    
    const handleSelectMonthEvent = e => {
        const month = e.target.children[e.target.selectedIndex].id;
        setTransactionDetails(prevState => ({
            ...prevState,
            month
        }))
    }    
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="group">
                <input type="radio" name="type" checked={transactionDetails.type==='expense'} id="expense" value="expense" onChange={handleSingleInputEvent} />
                <label htmlFor="expense" className="custom-button red">הוצאה</label>
                <input type="radio" name="type" checked={transactionDetails.type==='income'} id="income" value="income" onChange={handleSingleInputEvent} />
                <label htmlFor="income" className="custom-button green">הכנסה</label>
            </div>
            {formType!=='' && 
                <div className="transactionFieldsBox">                     
                        
                    {formType==='income' && 
                        <Fragment>
                            <div className="group">
                                <input type="radio" name="incomeSource" checked={transactionDetails.incomeSource==='buildingPayment'} id="buildingPayment" value="buildingPayment" onChange={handleSingleInputEvent} />
                                <label htmlFor="buildingPayment" className="custom-button green">וועד</label>
                                <input type="radio" name="incomeSource" checked={transactionDetails.incomeSource==='other'} id="other" value="other" onChange={handleSingleInputEvent} />
                                <label htmlFor="other" className="custom-button green">אחר</label>
                            </div><div></div>
                        </Fragment>
                    }
                    {transactionDetails.incomeSource==='buildingPayment' && 
                        <Fragment>
                            <FormSelect
                                name="apt"
                                label="בחר דירה"
                                value={transactionDetails.apt}
                                handleChange={handleSelectSourceEvent}
                                data={aptsData}
                                rtl
                                required
                            />  
                            <FormSelect
                                name="month"
                                label="תשלום לחודש"
                                value={monthsList.month}
                                handleChange={handleSelectMonthEvent}
                                data={monthsList}
                                rtl
                                required
                            />  
                        </Fragment>
                    }

                    {(transactionDetails.incomeSource==='other' || formType==='expense') &&
                        <FormInputSingle 
                            name="description" 
                            label="תיאור" 
                            type="text" 
                            value={transactionDetails.description}
                            handleChange={handleSingleInputEvent}
                            rtl
                            required
                        />
                    }
                    {transactionDetails.incomeSource==='other' &&
                        <FormInputSingle
                            name="other"
                            label="מקור הכנסה"
                            type="text"
                            value={transactionDetails.other}
                            handleChange={handleSingleInputEvent}
                            rtl
                        />
                    }
                    {(formType==='expense' || transactionDetails.incomeSource!=='') &&
                        <FormInputSingle 
                            name="sum" 
                            label="סכום" 
                            type="number" 
                            value={transactionDetails.sum}
                            handleChange={handleSingleInputEvent}
                            required
                        />
                    }
                    {formType==='income' && transactionDetails.incomeSource!=='' &&
                        <FormSelect
                            name="paymentMethod"
                            label="בחר צורת תשלום"
                            value={transactionDetails.paymentMethod}
                            handleChange={handleSelectMethodEvent}
                            data={paymentMethods}
                            rtl
                            required
                        />
                    }
                    <CustomButton disabled={validity} classes={params.class} type="submit"> {params.text} </CustomButton>
                </div>
            }
            
        </form>
    )
}

export default AddTransactionForm;