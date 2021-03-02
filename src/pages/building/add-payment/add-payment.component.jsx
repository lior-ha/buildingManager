import { useState, useEffect } from 'react';

import { usePayments } from '../../../hooks/payments.hook';
import { addItems, updateItems } from '../../../firebase/firebase.utils';
import { useSession } from '../../../context/auth.context';

import FormBox from '../../../components/form-box/form-box.component';
import AddPaymentForm from '../../../components/add-payment-form/add-payment-form.component';
import AsideLastActions from '../../../components/aside/aside-last-actions/aside-last-actions.component'

const formSchemes = {
    income: {
        title: 'הוסף הכנסה',
        formScheme: 'green'
    },
    expense: {
        title: 'הוסף הוצאה',
        formScheme: 'red'
    },
}



const AddPaymentPage = () => {
    const { building } = useSession()
    const paymentDataInitialState = {
        description: '',
        sum: '',
        incomeSource: '',
        type: '',
        createdAt: '',
        lastUpdated: ''
    }
    const [ paymentData, setPaymentData ] = useState(paymentDataInitialState);
    
    const paramsInitialState = {
        title: 'הוסף הוצאה/הכנסה',
        formScheme: undefined,
        working: undefined
    }
    const [params, setParams] = useState(paramsInitialState);

    const [ paymentId, setPaymentId ] = useState('');

    const {paymentLoading, payments} = usePayments();

    const getPaymentData = data => {
        const now = new Date()
        const date = now.toISOString();
        let newDates;
        if (data.createdAt === '' ) {
            newDates =  {
                createdAt: date,
                lastUpdated: date
            }
        } else {
            newDates =  {
                lastUpdated: date
            }
        }
        setPaymentData(prevState => ({
            ...prevState,
            ...data,
            ...newDates
        }));
    }
    
    const changeParams = (newParams) => {
        setParams(formSchemes[newParams]);
    }

    // const addNewPayment = () => {
    //     if (!params) {
    //         setPaymentData(paymentDataInitialState);
    //         setPaymentId('');
    //         setParams(paramsInitialState);
    //     }
    // }

    useEffect(() => {
        let unsub;
        if (paymentData.sum !== '') {
            if (!paymentId) {
                unsub = addItems(`buildings/${building}/${paymentData.type}s`, paymentData)
                    .then((result) => {
                        setPaymentId(result);
                    });
            
            } else {
                unsub = updateItems(`buildings/${building}/${paymentData.type}s`, paymentId, paymentData);
            }
        }

        return unsub;
    }, [paymentId, building, paymentData]) 

    return (
        <main className="mainWrapper">        
            <section>
                <FormBox form={
                    <AddPaymentForm 
                        paymentData={paymentData}
                        changeParams={changeParams} 
                        getPaymentData={getPaymentData}
                        setParams={setParams}
                    />} 
                    
                title={params.title} 
                formScheme={params.formScheme}
                />
            </section>
            <AsideLastActions loading={paymentLoading} payments={payments} />
        </main>
    );
}

export default AddPaymentPage;