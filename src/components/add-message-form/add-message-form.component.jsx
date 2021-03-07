import { Fragment, useState } from 'react';
import { FormInputSingle, FormTextArea } from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';


const manager = true;

const AddMessageForm = props => {
    const [ messageDetails, setMessageDetails ] = useState(props.messageData);

    const handleSubmit = e => {
        e.preventDefault();
        if (messageDetails.title !== '' && messageDetails.content !== '') {
            props.getMessageData(messageDetails);
        }
    }

    // Keep for AsVaad/AsTenant messages
    // const onRadioChange = e => {
    //     const value = e.target.value;
    //     setMessageDetails(prevState => ({
    //         ...prevState,
    //         type: value
    //     }))
    // }

    const onCheck = e => {
        const checked = e.target.checked;
        setMessageDetails(prevState => ({
            ...prevState,
            sticky: checked
        }))
    }

    const handleSingleInputEvent = e => {
        const {name, value} = e.target;
        setMessageDetails(prevState => ({
            ...prevState,
            [name]: value
        }))
    }


    return (
        <form onSubmit={handleSubmit}>
            <FormInputSingle 
                name="title" 
                label="כותרת" 
                type="text" 
                value={messageDetails.title}
                handleChange={handleSingleInputEvent}
                rtl
                required
            />
            <FormTextArea 
                name="content" 
                label="תוכן ההודעה" 
                type="number" 
                value={messageDetails.content}
                handleChange={handleSingleInputEvent}
                rtl
                required
            />

            {/* SHOULD SHOW ONLY IF USER IS MANAGER */}
            {manager && 
                <Fragment>
                    <label className="checkbox bounce">
                        <input type="checkbox" name="type" id="sticky" value="sticky" onChange={onCheck} />
                        <svg viewBox="0 0 21 21">
                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                        </svg>
                        <span className="labelText">להדביק לתחילת הלוח</span>
                    </label>
                    <CustomButton type="submit"> שלח </CustomButton>
                </Fragment>
            }
        </form>
    )
}

export default AddMessageForm;