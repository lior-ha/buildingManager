import { useState } from 'react';

import { useApartments } from '../../hooks/apartments.hook';

import AsideTenantsList from '../../components/aside/aside-tenants-list/aside-tenants-list.component';
import AddApartmentForm from '../../components/add-apartment-form/add-apartment-form.component';
import AddTenantForm from '../../components/add-tenants-form/add-tenants-form.component';
import FormBox from '../../components/form-box/form-box.component';

import './add-apartment.styles.scss';

const AddApartment = () => {
    const [ next, setNext ] = useState(false);
    const [ tenantDetails, setTenantDetails] = useState({
        apartment: '',
        apartmentName: '',
        tenantFirstName: '',
        tenantLastName: '',
        tenantPhones: [],
        tenantEmails: []
    })
    const {apartmentsLoading, apartments} = useApartments();

    const handleNext = () => {
        setNext(true)
    }

    const getApartmentData = data => {
        setTenantDetails(prevState => ({
            ...prevState,
            ...data
        }))
    }

    return (
        <main className="mainWrapper">
                <section className="formWrapper">
                    {!next && <FormBox form={<AddApartmentForm next={handleNext} getData={getApartmentData} />} title="הוסף דירה" />}
                    {next && <FormBox form={<AddTenantForm tenantShortDetails={tenantDetails} />} title={`דירה מספר ${tenantDetails.apartment} - ${tenantDetails.apartmentName}`} />}
                </section>
                <AsideTenantsList loading={apartmentsLoading} payments={apartments} />
        </main>
    );
};

export default AddApartment;