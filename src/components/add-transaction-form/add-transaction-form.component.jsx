import { Fragment, useState, useEffect } from 'react';

import { addItems } from '../../firebase/firebase.utils';
import { getDates } from '../../shared/js-utils';

import { FormInputSingle, FormSelect } from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './add-transaction-form.styles.scss';

const AddTransactionForm = ({ changeParams, setResetForm, params, building, apartmentsData }) => {
    const [ transactionDetails, setTransactionDetails ] = useState({});

    const [ formType, setFormType ] = useState('');

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

    const handleSubmit = e => {
        e.preventDefault();
        
        if (transactionDetails.description !== '' && transactionDetails.sum !== '' && transactionDetails.type !== '') {
            const newDates = getDates(transactionDetails);
            
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

    const handleSelectEvent = e => {
        const value = e.target.value;
        setTransactionDetails(prevState => ({
            ...prevState,
            incomeSource: value
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
                                    handleChange={handleSelectEvent}
                                    apartmentsData={apartmentsData}
                                    rtl
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
                            :   <div></div>
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