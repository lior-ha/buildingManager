import { Fragment, useState } from 'react';
import { FormInputSingle } from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './add-payment-form.styles.scss';

const AddPaymentForm = props => {
    const [ paymentDetails, setPaymentDetails ] = useState(props.paymentData);

    const [ formType, setFormType ] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (paymentDetails.description !== '' && paymentDetails.sum !== '' && paymentDetails.type !== '') {
            props.getPaymentData(paymentDetails);
        }
    }

    const onRadioChange = e => {
        const value = e.target.value;
        setFormType(value);
        setPaymentDetails(prevState => ({
            ...prevState,
            type: value
        }))
        props.changeParams(value)
    }

    const handleSingleInputEvent = e => {
        const {name, value} = e.target;
        setPaymentDetails(prevState => ({
            ...prevState,
            [name]: value
        }))
    }


    return (
        <form onSubmit={handleSubmit}>
            <div className="group">
                <label htmlFor="expense" className="custom-button red">הוצאה</label>
                <input type="radio" name="type" id="expense" value="expense" onChange={onRadioChange} />
                <label htmlFor="income" className="custom-button green">הכנסה</label>
                <input type="radio" name="type" id="income" value="income" onChange={onRadioChange} />
            </div>
            {formType==='expense' && 
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
                    <CustomButton type="submit"> הוסף הוצאה </CustomButton>
                </Fragment>
            }
            {formType==='income' && 
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
                    <CustomButton type="submit"> הוסף הכנסה </CustomButton>
                </Fragment>
            }
        </form>
    )
}

export default AddPaymentForm;