import { useState } from 'react';

import { FormInputSingle } from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

const AddTenantForm = props => {
    
    const [apartmentData, setApartmentData] = useState({
        apartment: '',
        apartmentName: ''
    })

    const nextForm = e => {
        e.preventDefault();
        handleEvent(e); //?
        if (apartmentData.apartment !== '' && apartmentData.apartmentName !== '') {
            props.getApartmentData(apartmentData)
            props.setFormVisible({form1: false, form2: true, sumAndApprove: false});
        }
    }


    const handleEvent = e => {
        const {name , value} = e.target
        setApartmentData(prevState => ({
            ...prevState,
            [name] : value
        }))
    }

    return (
        <form>
            <div className="form">
                <div className="group">
                    <FormInputSingle 
                        name="apartment" 
                        label="מספר דירה" 
                        type="apartment" 
                        value={apartmentData.apartment}
                        handleChange={handleEvent}
                        required
                        rtl
                    />
                    <FormInputSingle 
                        name="apartmentName" 
                        label="שם דירה" 
                        type="apartmentName" 
                        value={apartmentData.apartmentName}
                        handleChange={handleEvent}
                        required
                        rtl
                    />
                </div>
                {!apartmentData.done && <CustomButton onClick={nextForm} name="done" value={true}> הוסף </CustomButton>}
            </div>
        </form>
    )
}

export default AddTenantForm;