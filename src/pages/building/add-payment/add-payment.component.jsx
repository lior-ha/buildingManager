import { useState, useEffect } from 'react';

import { usePayments } from '../../../hooks/payments.hook';
import { useApartments } from '../../../hooks/apartments.hook';
import { useSession } from '../../../context/auth.context';

import FormBox from '../../../components/form-box/form-box.component';
import AddPaymentForm from '../../../components/add-payment-form/add-payment-form.component';
import AsideLastActions from '../../../components/aside/aside-last-actions/aside-last-actions.component'

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

const AddPaymentPage = () => {
    const { building } = useSession();
    const { apartmentsData } = useApartments();

    const [ resetForm, setResetForm ] = useState({});
    
    const [ params, setParams ] = useState({});

    const { paymentLoading, payments } = usePayments();

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
        <main className="mainWrapper">        
            <section>
                <FormBox form={
                    <AddPaymentForm 
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
            </section>
            <AsideLastActions loading={paymentLoading} payments={payments} />
        </main>
    );
}

export default AddPaymentPage;