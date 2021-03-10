import { useState, useEffect } from 'react';

import { useApartments } from '../../../hooks/apartments.hook';
import { addItems, updateItems } from '../../../firebase/firebase.utils';
import { useSession } from '../../../context/auth.context';

import AsideTenantsList from '../../../components/aside/aside-tenants-list/aside-tenants-list.component';
import AddApartmentForm from '../../../components/add-apartment-form/add-apartment-form.component';
import AddTenantForm from '../../../components/add-tenants-form/add-tenants-form.component';
import ApartmentContactsList from '../../../components/apartment-contacts-list/apartment-contacts-list.component';
import FormBox from '../../../components/form-box/form-box.component';

import CustomButton from '../../../components/custom-button/custom-button.component';

const AddApartment = () => {
    const { building } = useSession();
    const { apartmentsLoading, apartmentsData} = useApartments();

    const [ apartmentId, setApartmentId ] = useState(false);

    const apartmentDataInitialState = {apartment: '', apartmentName: ''}
    const [ apartmentData, setApartmentData ] = useState(apartmentDataInitialState);

    const apartmentTenantsInitialState = {}
    const [ apartmentTenants, setApartmentTenants ] = useState(apartmentTenantsInitialState);

    const formVisibleInitialState = {form1: true, form2: false, sumAndApprove: false}
    const [ formVisible, setFormVisible ] = useState(formVisibleInitialState)
    
    const getApartmentData = (data) => {
        setApartmentData(prevState => ({
            ...prevState,
            ...data
        }))
    }

    const getTenantData = (data) => {
        setApartmentTenants(prevState => ({
           ...prevState, 
           ...data
        }))
    }
    
    useEffect(() => {
        if (formVisible.sumAndApprove) {
            if (!apartmentId) {
                addItems(`buildings/${building}/apartments`, apartmentData)
                    .then((result) => {
                        setApartmentId(result);
                    })
                
            } else {
                updateItems(`buildings/${building}/apartments`, apartmentId, apartmentData);
            }

            if (apartmentId) {
                addItems(`buildings/${building}/apartments/${apartmentId}/tenants`, apartmentTenants);
            }
        }
    }, [formVisible, apartmentId, building, apartmentTenants, apartmentData]);

    const addNewApartment = () => {
        setApartmentData(apartmentDataInitialState);
        setApartmentId(false);
        setFormVisible(formVisibleInitialState);
    }

    // Aside Data
    return (
        <main className="mainWrapper biggerAside">
            <section className="formWrapper">
                {/* APARTMENT FORM */}
                {formVisible.form1 && 
                    <FormBox 
                        form={<AddApartmentForm
                            setFormVisible={setFormVisible}
                            getApartmentData={getApartmentData}
                        />} 
                        title="הוסף דירה"
                    />}

                {/* TENANT FORM */}
                {formVisible.form2 && 
                    <FormBox 
                        form={<AddTenantForm 
                            setApartmentData={setApartmentData}
                            setFormVisible={setFormVisible}
                            getTenantData={getTenantData}
                        />} 
                        title={`דירה מספר ${apartmentData.apartment} - ${apartmentData.apartmentName}`} 
                    />}

                {/* Sum and Approve */}
                {formVisible.sumAndApprove && 
                    <div>
                        <div className="contacts">
                            <ApartmentContactsList apartmentId={apartmentId} />
                        </div>
                        <CustomButton onClick={() => setFormVisible({form1: false, form2: true, sumAndApprove: false})}>הזן דייר/בעלים נוסף בדירה</CustomButton>
                        <CustomButton onClick={addNewApartment}>סיים והוסף דירה חדשה</CustomButton>
                    </div>}
            </section>
            <AsideTenantsList loading={apartmentsLoading} apartments={apartmentsData} />
        </main>
    );
};

export default AddApartment;