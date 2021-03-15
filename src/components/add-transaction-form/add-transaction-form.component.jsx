import { Fragment, useState, useEffect } from 'react';

import { addItems, updateProperty } from '../../firebase/firebase.utils';

import { getDates } from '../../shared/js-utils';

import { FormInputSingle, FormSelect } from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './add-transaction-form.styles.scss';

const AddTransactionForm = ({ changeParams, setResetForm, params, building, apartmentsData }) => {
    const [ transactionDetails, setTransactionDetails ] = useState({});

    const [ formType, setFormType ] = useState('');

    
    const sortByApt = (a, b) => {
        return a.apartment - b.apartment;
    }

    const paymentMethods = [
        {id: 1, value: 'מזומן'},
        {id: 2, value: 'אשראי'},
        {id: 3, value: 'העברה בנקאית'},
        {id: 4, value: 'אינטרנט'}
    ];

    const aptsData = apartmentsData
                    .sort(sortByApt)
                    .map(apartment => ({
                            id: apartment.id,
                            value: `דירה ${apartment.apartment}`,
                            paymentsStatus: apartment.paymentsStatus
                    }));
                    
    useEffect(() => {
        setTransactionDetails(({
            description: '',
            sum: '',
            incomeSource: '',
            other: '',
            type: formType,
            createdAt: '',
            lastUpdated: ''
        }))
    }, [formType])

    const handleSubmit = async e => {
        e.preventDefault();
        
        if (transactionDetails.description !== '' && transactionDetails.sum !== '' && transactionDetails.type !== '') {
            const newDates = getDates(transactionDetails);

            if(transactionDetails.incomeSource !== 'other') {
                const year = new Date().getFullYear();
                const month = new Date().getMonth();

                // Get this apartment's data
                const aptData = aptsData.find(apt => apt.id === transactionDetails.aptId);
                let paymentsStatus = aptData.paymentsStatus;

                // Check if this year exists in paymentsStatus Object
                // If not, add empty year (should only happen on first payment in the current year)
                if (!paymentsStatus[year]) {
                    paymentsStatus = {
                        ...paymentsStatus,
                        [year]: [...Array(12).fill('')]
                    };
                } 

                // Checks if value is already paid. If so return error.
                if (paymentsStatus[year][month] === 'paid' ){
                    console.log('error: already paid for this month')
                    return 
                }

                // Mutate to paid
                paymentsStatus[year][month] = 'paid';

                updateProperty(`buildings/${building}/apartments`, transactionDetails.aptId, {paymentsStatus: {...paymentsStatus}})
                    .then(() => {
                        return
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                addItems(`buildings/${building}/transactions`, {...transactionDetails, ...newDates})
                    .then(() => {
                        setFormType('');
                        setResetForm('');
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }         
        }

    }

    const onRadioChange = e => {
        const value = e.target.value;
        setFormType(value);

        setTransactionDetails(prevState => ({
            ...prevState,
            type: value
        }));
        
        changeParams(value)
    }

    const handleSingleInputEvent = e => {
        const {name, value} = e.target;
        setTransactionDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSelectSourceEvent = e => {
        const value = e.target.value;
        const aptId = e.target.children[e.target.selectedIndex].id;
        setTransactionDetails(prevState => ({
            ...prevState,
            incomeSource: value,
            aptId: aptId
        }));
    }

    const handleSelectMethodEvent = e => {
        const value = e.target.value;
        setTransactionDetails(prevState => ({
            ...prevState,
            paymentMethod: value
        }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="group">
                <label htmlFor="expense" className="custom-button red">הוצאה</label>
                <input type="radio" name="type" checked={transactionDetails.type==='expense'} id="expense" value="expense" onChange={onRadioChange} />
                <label htmlFor="income" className="custom-button green">הכנסה</label>
                <input type="radio" name="type" checked={transactionDetails.type==='income'} id="income" value="income" onChange={onRadioChange} />
            </div>
        
            {(formType==='expense' || formType==='income') && 
                <div className="transactionFieldsBox">
                        <FormInputSingle 
                            name="description" 
                            label="תיאור" 
                            type="text" 
                            value={transactionDetails.description}
                            handleChange={handleSingleInputEvent}
                            rtl
                            required
                        />
                        <FormInputSingle 
                            name="sum" 
                            label="סכום" 
                            type="number" 
                            value={transactionDetails.sum}
                            handleChange={handleSingleInputEvent}
                            required
                        />
                        
                    {formType==='income' && 
                        <Fragment>
                            <FormSelect
                                    name="incomeSource"
                                    label="בחר מקור הכנסה"
                                    value={transactionDetails.incomeSource}
                                    handleChange={handleSelectSourceEvent}
                                    data={aptsData}
                                    rtl
                                    required
                            />                            
                            {transactionDetails.incomeSource==='other' ? 
                                <FormInputSingle
                                    name="other"
                                    label="הכנס מקור הכנסה"
                                    type="text"
                                    value={transactionDetails.other}
                                    handleChange={handleSingleInputEvent}
                                    rtl
                                />
                            :   <FormSelect
                                    name="paymentMethod"
                                    label="בחר צורת תשלום"
                                    value={transactionDetails.paymentMethod}
                                    handleChange={handleSelectMethodEvent}
                                    data={paymentMethods}
                                    rtl
                                    required
                                />
                            }
                        </Fragment>
                    }
                    <CustomButton classes={params.class} type="submit"> {params.text} </CustomButton>
                </div>
            }
            
        </form>
    )
}

export default AddTransactionForm;