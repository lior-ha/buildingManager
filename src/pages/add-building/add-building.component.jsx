import { useState, useEffect } from 'react';

import { addBuildings, updateBuildings } from '../../firebase/firebase.utils';
import { useSession } from '../../context/auth.context';

import AddBuildingForm from '../../components/add-building-form/add-building-form.component';
import FormBox from '../../components/form-box/form-box.component';

import './add-building.styles.scss';

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
        setBuildingData(prevState => ({
            ...prevState,
            ...data,
            ...newDates
        }));
    }

    useEffect(() => {
        let unsub;
        if (buildingData.managers.length > 0) {

            const newBuildingData = {
                managers: buildingData.managers,
                address: {
                    city: buildingData.city,
                    street: buildingData.street,
                    number: buildingData.number,
                    entrance: buildingData.entrance
                }
            }

            if (!buildingId) {
                unsub = addBuildings(`buildings`, newBuildingData)
                    .then((result) => {
                        //console.log('result', result);
                        setBuildingId(result);
                    });
            
            } else {
                unsub = updateBuildings(`buildings`, buildingId, newBuildingData);
            }
            return unsub;
    }
        
    }, [buildingId, buildingData, building])

    return (
        <main className="mainWrapper">        
            <section className="formWrapper half">
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