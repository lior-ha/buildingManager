import { useState } from 'react';

import { FormInputSingle } from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

const AddTenantForm = props => {
    
    const [apartmentData, setApartmentData] = useState({
        apartment: '',
        monthlyDue: '',
        apartmentName: '',
        paymentsStatus: {
            [new Date().getFullYear()]: [...Array(12).fill('')]
        }
    });

    const nextForm = e => {
        e.preventDefault();
        
        if (apartmentData.apartment !== '' && apartmentData.apartmentName !== '') {
            handleEvent(e);
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
                        type="text" 
                        value={apartmentData.apartment}
                        handleChange={handleEvent}
                        required
                        rtl
                    />
                    <FormInputSingle 
                        name="apartmentName" 
                        label="שם דירה" 
                        type="text" 
                        value={apartmentData.apartmentName}
                        handleChange={handleEvent}
                        required
                        rtl
                    />
                    <FormInputSingle 
                        name="monthlyDue" 
                        label="תשלום חודשי" 
                        type="text" 
                        value={apartmentData.monthlyDue}
                        handleChange={handleEvent}
                        rtl
                    />
                </div>
                {!apartmentData.done && <CustomButton onClick={nextForm} name="done" value={true}> הוסף </CustomButton>}
            </div>
        </form>
    )
}

export default AddTenantForm;