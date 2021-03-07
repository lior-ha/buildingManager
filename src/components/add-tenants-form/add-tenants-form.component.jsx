import { useState, useEffect, useCallback, Fragment } from 'react';

import {FormInputSingle, FormInputIntoList} from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './add-tenants-form.styles.scss';
//import { validCheck } from '../../shared/js-utils';

const AddTenantForm = props => {
    
    //console.log(props, props.tenantShortDetails)
    /// ERROR HANDLING NEEDED
    //const [ error, setError ] = useState('');
    /// 
    
    const [ formInputs, setFormInputs] = useState({ 
        phone: '', 
        email: ''
    });

    const initialPersonInfoState = {
        tenantFirstName: '', 
        tenantLastName: '',
        tenantType: '',
        tenantPhones: [], 
        tenantEmails:[]
    };
    const [ personInfo, setPersonInfo] = useState(initialPersonInfoState);


    const handleSubmit = tenantType => {
        // Get Some Validation

        // const phoneRules = {minLength: 9, isNumeric: true}
        // personInfo.tenantPhones.map(phone => {
        //     if (!validCheck(phone, phoneRules)) {
        //         return setError('מספר טלפון לא תקין')
        //     }
        //     return true;
            
        // });

        // const emailRules = {isEmail: true}
        // personInfo.tenantEmails.map(email => {
        //     if (!validCheck(email, emailRules)) {
        //         return setError('כתובת מייל לא תקינה')
        //     }
        //     return true;
        // });     
        

        //if (!error) {
            setPersonInfo(prevState => ({
                ...prevState,
                tenantType
            }));
        //}
    }

    const sendAndNext = useCallback(
        () => {
            props.getTenantData(personInfo);
            props.setFormVisible({form1: false, form2: false, sumAndApprove: true});
        },
        [props, personInfo],
    );
    
    useEffect(() => {
        const clearData = () => {
            setFormInputs({ phone: '', email: ''});
            setPersonInfo({tenantFirstName: '', tenantLastName: '', tenantType: '', tenantPhones: [], tenantEmails:[]})
        }

        if (personInfo.tenantType !== ''){
            sendAndNext();
            clearData();
        }
    }, [personInfo.tenantType, sendAndNext])


    const updateList = (name, list) => {
        let listName;
        if (name === 'phone') {
            listName = 'tenantPhones'
        } else if (name === 'email') {
            listName = 'tenantEmails'
        };

        setPersonInfo(prevState => ({
            ...prevState,
            [listName] : list
        }));
    }

    const handleSingleInputEvent = e => {
        const {name, value} = e.target;
        setPersonInfo(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleMultiInputEvent = (name, val) => {
        setFormInputs(prevState => ({
            ...prevState,
            [name]: val
        }))        
    }
    
    return (
        <Fragment>
        <form id="tenantDetails">
            <div className="group">
                <div>
                    <FormInputSingle 
                        name="tenantFirstName" 
                        label="שם פרטי" 
                        type="text" 
                        value={personInfo.tenantFirstName}
                        handleChange={handleSingleInputEvent}
                        required
                        rtl
                    />
                </div>
                <div>
                    <FormInputSingle 
                        name="tenantLastName" 
                        label="שם משפחה" 
                        type="text" 
                        value={personInfo.tenantLastName}
                        handleChange={handleSingleInputEvent}
                        required
                        rtl
                    />
                </div>
            </div>
            <div className="group">
                <div>
                    <FormInputIntoList
                        name="phone" 
                        label="מספר טלפון" 
                        type="number"
                        handleSubmitForm={handleSubmit}
                        value={formInputs.phone}
                        handleChange={handleMultiInputEvent}
                        updateList={updateList}
                        listToShow={personInfo.tenantPhones}
                        listDir="ltr"
                    />
                </div>
                <div>
                    <FormInputIntoList 
                        name="email" 
                        label="מייל" 
                        type="text"
                        handleSubmitForm={handleSubmit}
                        value={formInputs.email}
                        handleChange={handleMultiInputEvent}
                        updateList={updateList}
                        listToShow={personInfo.tenantEmails}
                        listDir="ltr"
                    />
                </div>
            </div>
        </form>
        <div className="group buttons">
            <CustomButton onClick={() => handleSubmit('tenant')}> הוסף כדייר </CustomButton>
            <CustomButton onClick={() => handleSubmit('owner')}> הוסף כבעלים </CustomButton>
        </div>
        </Fragment>
    )
}

export default AddTenantForm;