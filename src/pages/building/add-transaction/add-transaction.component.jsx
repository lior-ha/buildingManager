import { useState, useEffect } from 'react';

import { useApartments } from '../../../hooks/apartments.hook';
import { useSession } from '../../../context/auth.context';

import FormBox from '../../../components/form-box/form-box.component';
import AddTransactionForm from '../../../components/add-transaction-form/add-transaction-form.component';

const formSchemes = {
    income: {
        text: 'הוסף הכנסה',
        class: 'green'
    },
    expense: {
        text: 'הוסף הוצאה',
        class: 'red'
    },
}

const AddTransaction = () => {
    const { building } = useSession();
    const { apartmentsData } = useApartments();

    const [ resetForm, setResetForm ] = useState({});
    
    const [ params, setParams ] = useState({});

    const changeParams = (newParams) => {
        setParams(formSchemes[newParams]);
    }    

    useEffect(() => {
        setParams({
            text: 'הוסף הוצאה/הכנסה',
            class: undefined,
            working: undefined
        });
        
    }, [resetForm]);

    return (
        <FormBox form={
            <AddTransactionForm 
                changeParams={changeParams} 
                setResetForm={setResetForm}
                setParams={setParams}
                params={params}
                building={building}
                apartmentsData={apartmentsData}
            />} 
            
        title={params.text} 
        formScheme={params.class}
        />
    );
}

export default AddTransaction;