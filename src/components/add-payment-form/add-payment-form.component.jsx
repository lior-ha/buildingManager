import { Fragment, useState, useEffect } from 'react';

import { addItems } from '../../firebase/firebase.utils';

import { FormInputSingle, FormSelect } from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './add-payment-form.styles.scss';

const AddPaymentForm = ({ changeParams, setResetForm, params, building, apartmentsData }) => {
    const [ paymentDetails, setPaymentDetails ] = useState({});

    const [ formType, setFormType ] = useState('');

    useEffect(() => {
        setPaymentDetails(({
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
        
        if (paymentDetails.description !== '' && paymentDetails.sum !== '' && paymentDetails.type !== '') {
            const date = new Date().toISOString();
            
            let newDates;
            
            if (paymentDetails.createdAt === '' ) {
                newDates =  { createdAt: date, lastUpdated: date }
            } else {
                newDates =  { lastUpdated: date }
            }
            
            addItems(`buildings/${building}/payments`, {...paymentDetails, ...newDates})
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

        setPaymentDetails(prevState => ({
            ...prevState,
            type: value
        }));
        
        changeParams(value)
    }

    const handleSingleInputEvent = e => {
        const {name, value} = e.target;
        setPaymentDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSelectEvent = e => {
        const value = e.target.value;
        setPaymentDetails(prevState => ({
            ...prevState,
            incomeSource: value
        }))
    }


    return (
        <form onSubmit={handleSubmit}>
            <div className="group">
                <label htmlFor="expense" className="custom-button red">הוצאה</label>
                <input type="radio" name="type" checked={paymentDetails.type==='expense'} id="expense" value="expense" onChange={onRadioChange} />
                <label htmlFor="income" className="custom-button green">הכנסה</label>
                <input type="radio" name="type" checked={paymentDetails.type==='income'} id="income" value="income" onChange={onRadioChange} />
            </div>
        
            {(formType==='expense' || formType==='income') && 
                <div className="paymentFieldsBox">
                        <FormInputSingle 
                            name="description" 
                            label="תיאור" 
                            type="text" 
                            value={paymentDetails.description}
                            handleChange={handleSingleInputEvent}
                            rtl
                            required
                        />
                        <FormInputSingle 
                            name="sum" 
                            label="סכום" 
                            type="number" 
                            value={paymentDetails.sum}
                            handleChange={handleSingleInputEvent}
                            required
                        />
                        
                    {formType==='income' && 
                        <Fragment>
                            <FormSelect
                                    name="incomeSource"
                                    label="בחר מקור הכנסה"
                                    value={paymentDetails.incomeSource}
                                    handleChange={handleSelectEvent}
                                    apartmentsData={apartmentsData}
                                    rtl
                            />                            
                            {paymentDetails.incomeSource==='other' ? 
                                <FormInputSingle
                                    name="other"
                                    label="הכנס מקור הכנסה"
                                    type="text"
                                    value={paymentDetails.other}
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

export default AddPaymentForm;