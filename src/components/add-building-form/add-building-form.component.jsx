import { useState, useEffect } from 'react';

import { FormInputSingle, FormInputIntoList } from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

// var searchData = {
//     resource_id: 'a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3', // the resource id
//     limit: 5, // get 5 results
//     city: 'אור' // query for 'jones'
// };

//   fetch({
//       url: `https://data.gov.il/api/3/action/datastore_search?q=${searchData.city}&resource_id=${searchData.resource_id}`,
//       headers: {'Content-Type': 'application/json'},
//       success: function(data) {
//         alert('Total results found: ' + data.result.total)
//       }})
//     .then(response => {
//         return response.json()
//     })
//     .then(data => {
//         console.log(data);
//         const cityArray = new Set();
//         data.result.records.filter(city => {
//             return city.שם_ישוב.includes(searchData.city);
//         }).map(i => {
//             cityArray.add(i.שם_ישוב.trim())
//             return i.שם_ישוב;
//         })
//         //streetsInCity.map(city => )
        

//         // const streetsArray = streetsInCity.filter(street => {
//         //     return street.שם_רחוב.includes('ארי');
//         // })
//         console.log(cityArray)
//     });


const AddBuildingForm = props => {
    const [ buildingData, setBuildingData ] = useState(props.buildingData);
    const [ buttonClass, setButtonClass] = useState('disabled');

    const [ formInputs, setFormInputs] = useState({ 
        manager: ''
    });

    useEffect(() => {
        //console.log(buildingData)
        if (buildingData.managers.length !== 0 && buildingData.city !== '' && buildingData.street !== '' && buildingData.number !== '') {
            setButtonClass('green');
        } else if (buildingData.managers >= 0 || buildingData.city === '' || buildingData.street === '' || buildingData.number === '') {
            setButtonClass('disabled');
        }
    }, [formInputs, buildingData]);

    const handleSubmit = e => {
        e.preventDefault();

        if (buildingData.description !== '' && buildingData.sum !== '' && buildingData.type !== '') {
            props.getBuildingData(buildingData);
        }
    }

    const handleEvent = e => {
        const { value, name } = e.target;
        setBuildingData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const updateList = (name, list) => {
        setBuildingData(prevState => ({
            ...prevState,
            'managers': list
        }));
    }


    const handleMultiInputEvent = (name, val) => {
        setFormInputs(prevState => ({
            ...prevState,
            [name]: val
        }))        
    }

    return (
        <form onSubmit={handleSubmit}>
            
            <div className="group">
                <div className="fullWidth">
                    <FormInputIntoList
                        name="manager" 
                        label="אימייל וועד" 
                        type="email" 
                        value={formInputs.manager}
                        handleChange={handleMultiInputEvent}
                        handleSubmitForm={handleSubmit}
                        updateList={updateList}
                        listDir="ltr"
                        listToShow={buildingData.managers}
                        required
                    />
                </div>
            </div>
            <div className="group">
                <FormInputSingle 
                    name="city" 
                    label="עיר" 
                    type="text" 
                    value={buildingData.city}
                    handleChange={handleEvent}
                    required
                    rtl
                />
                <FormInputSingle 
                    name="street" 
                    label="רחוב" 
                    type="text" 
                    value={buildingData.street}
                    handleChange={handleEvent}
                    required
                    rtl
                />
            </div>
            <div className="group">
                <FormInputSingle 
                    name="number" 
                    label="מספר" 
                    type="text" 
                    value={buildingData.number}
                    handleChange={handleEvent}
                    required
                />
                <FormInputSingle 
                    name="entrance" 
                    label="כניסה" 
                    type="text" 
                    value={buildingData.entrance}
                    handleChange={handleEvent}
                    required
                    rtl
                />
                
            </div>
            <CustomButton type="submit" classes={buttonClass}> הוסף בניין </CustomButton>
        </form>
    )
}

export default AddBuildingForm;