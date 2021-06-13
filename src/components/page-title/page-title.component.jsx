import React, { useState, useEffect } from 'react';

import { useBuilding } from '../../hooks/building.hook';
import { useAddresses } from '../../hooks/addresses.hook';
import { useApartments } from '../../hooks/apartments.hook';
import { useSession } from '../../context/auth.context';

import Loader from '../UI/loader/loader.component'

import AddressTemplate from './addressTemplate/addressTemplate';
import Dropdown from './dropdown/dropdown.component';
import './page-title.styles.scss';


const PageTitle = ({userHoldings, setHolding}) => {

    const { user, building } = useSession();

    const { buildingData, isLoading } = useBuilding(building);
    const [ userApartmentNum, setUserApartmentNum ] = useState([]);

    const [ dropDown, setDropDown ] = useState(false);
    
    const [ curHolding, setCurHolding ] = useState({
        building: user.building,
        apt: user.apt,
    });

    // Replace working holding
    useEffect(() => {
        if (user && curHolding && user.apt && (user.apt !== curHolding.apt)) {
            setHolding(curHolding)
        }
    }, [curHolding, setHolding, user]);

    

    const { apartmentData } = useApartments(curHolding.building, curHolding.apt);
    useEffect(() => {
        if (building && apartmentData) {
            setUserApartmentNum(apartmentData.apartment);
        }
    }, [apartmentData, setUserApartmentNum, building]);

    const holdingsAddresses = useAddresses(userHoldings);

    let multipleHoldings = false;

    if(Object.keys(userHoldings).length > 1) {
        multipleHoldings = true;
    }

    const holdingTitle = () => {
        if (multipleHoldings && dropDown) {
            return <Dropdown holdingsAddresses={holdingsAddresses} setCurHolding={setCurHolding} />
        } else {
            return <AddressTemplate address={buildingData.address} apt={userApartmentNum} />
        }
    }

    return (
        <div onClick={() => setDropDown(!dropDown)} className={`pageTitle ${multipleHoldings ? 'dropDownTitle' : ''}`}>
            {isLoading ? <Loader /> : holdingTitle()}
        </div>
    )
};

export default PageTitle;