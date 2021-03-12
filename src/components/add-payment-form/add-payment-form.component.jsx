import { Fragment, useState, useEffect } from 'react';

import { addItems } from '../../firebase/firebase.utils';

import { FormInputSingle } from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './add-payment-form.styles.scss';

const AddPaymentForm = ({ changeParams, setResetForm, params, building }) => {
    const [ paymentDetails, setPaymentDetails ] = useState({});

    const [ formType, setFormType ] = useState('');
    
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
            
            addItems(`buildings/${building}/${paymentDetails.type}s`, {...paymentDetails, ...newDates})
                .then(() => {
                    setFormType('');
                    setResetForm('')
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

    useEffect(() => {
        setPaymentDetails(({
            description: '',
            sum: '',
            incomeSource: '',
            type: formType,
            createdAt: '',
            lastUpdated: ''
        }))
    }, [formType])


    return (
        <form onSubmit={handleSubmit}>
            <div className="group">
                <label htmlFor="expense" className="custom-button red">הוצאה</label>
                <input type="radio" name="type" id="expense" value="expense" onChange={onRadioChange} />
                <label htmlFor="income" className="custom-button green">הכנסה</label>
                <input type="radio" name="type" id="income" value="income" onChange={onRadioChange} />
            </div>
            {(formType==='expense' || formType==='income') && 
                <Fragment>
                    <div className="group">
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
                        
                    </div>
                    {formType==='income' && 
                        <div className="group">
                            <FormInputSingle
                                name="incomeSource" 
                                label="מקור הכנסה" 
                                type="text" 
                                value={paymentDetails.incomeSource}
                                handleChange={handleSingleInputEvent}
                                rtl
                            />
                        </div>                            
                    }
                    <CustomButton classes={params.class} type="submit"> {params.text} </CustomButton>
                </Fragment>
            }
            
        </form>
    )
}

export default AddPaymentForm;