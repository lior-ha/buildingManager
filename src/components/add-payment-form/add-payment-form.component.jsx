import { Fragment, useState } from 'react';
import { FormInputSingle } from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './add-payment-form.styles.scss';

const AddPaymentForm = ({ changeParams, getPaymentData, paymentData }) => {
    const [ paymentDetails, setPaymentDetails ] = useState(paymentData);

    const [ spec, setSpec ] = useState({class: '', text: ''});
    const [ formType, setFormType ] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (paymentDetails.description !== '' && paymentDetails.sum !== '' && paymentDetails.type !== '') {
            getPaymentData(paymentDetails);
            setPaymentDetails({
                description: '',
                sum: '',
                type: ''
            })
        }
    }

    const onRadioChange = e => {
        const value = e.target.value;
        setFormType(value);
        
        if (value === 'expense') {
            setSpec({ class: 'red', text: 'הוסף הוצאה'})
        } else if (value === 'income') {
            setSpec({ class: 'green', text: 'הוסף הכנסה'})
        }

        setPaymentDetails(prevState => ({
            ...prevState,
            type: value
        }))
        changeParams(value)
    }

    const handleSingleInputEvent = e => {
        const {name, value} = e.target;
        setPaymentDetails(prevState => ({
            ...prevState,
            [name]: value
        }))
    }


    return (
        <form formonSubmit={handleSubmit}>
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
                    <CustomButton classes={spec.class} type="submit"> {spec.text} </CustomButton>
                </Fragment>
            }
            
        </form>
    )
}

export default AddPaymentForm;