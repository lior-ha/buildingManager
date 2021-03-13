import { useState, useEffect } from 'react';

import { addItems, updateItems } from '../../../firebase/firebase.utils';
import { useSession } from '../../../context/auth.context';
import { getDates } from '../../../shared/js-utils';

import AddBuildingForm from '../../../components/add-building-form/add-building-form.component';
import FormBox from '../../../components/form-box/form-box.component';

const AddBuilding = () => { 
    const { building } = useSession();

    const buildingDataInitialState = {
        street: '',
        number: '',
        entrance: '',
        city: '',
        managers: [],
        done: false
    }
    const [ buildingData, setBuildingData] = useState(buildingDataInitialState);

    const [ buildingId, setBuildingId ] = useState('');

    const getBuildingData = data => {
        const newDates = getDates(data)
        console.log(newDates)
        setBuildingData(prevState => ({
            ...prevState,
            ...data,
            ...newDates
        }));
        console.log(buildingData)
    
        let unsub;

        if (buildingData.managers.length > 0) {
            const newBuildingData = {
                managers: buildingData.managers,
                address: {
                    city: buildingData.city,
                    street: buildingData.street,
                    number: buildingData.number,
                    entrance: buildingData.entrance
                },
                createdAt: buildingData.createdAt
            }

            if (!buildingId) {
                unsub = addItems(`buildings`, newBuildingData)
                    .then((result) => {
                        //console.log('result', result);
                        setBuildingId(result);
                    });
            
            } else {
                unsub = updateItems(`buildings`, buildingId, newBuildingData);
            }
            return unsub;
        }
    }

    return (
        <main className="mainWrapper">        
            <section className="formWrapper">
                <FormBox form={
                    <AddBuildingForm 
                        buildingData={buildingData}
                        getBuildingData={getBuildingData}
                    />} 
                    
                title="הוסף וועד" />
            </section>
        </main>
    )
}

export default AddBuilding;