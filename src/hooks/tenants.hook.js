import { useState, useEffect } from 'react';
import { useSession } from '../context/auth.context';
import { firestore, convertCollectionsSnapshotToMap } from '../firebase/firebase.utils';

export const useTenants = (apartmentId) => {
    const { building }  = useSession();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [tenantsData, setTenantsData] = useState([]);

    useEffect(() => {
        setTenantsData([]);
    },[])

    useEffect(() => {
        const tenantsRef = firestore.collection(`buildings/${building}/apartments/${apartmentId}/tenants`);
        
        const unSubApts = tenantsRef
                .onSnapshot(async snapshot => {
                        const tenantsArr = await convertCollectionsSnapshotToMap(snapshot, building);
                        setTenantsData([...tenantsArr]);
                        setLoading(false);
                    }, err => { setError(err) }
                );
            return unSubApts;
    }, [building, apartmentId]);

    return {
        error,
        loading,
        tenantsData
    }
}


export const useTenant = (apartmentId, tenantId) => {
    const { building }  = useSession();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [tenantData, setTenantData] = useState({});

    useEffect(() => {
        setTenantData({});
    },[])

    useEffect(() => {
        const tenantsRef = firestore.collection(`buildings/${building}/apartments/${apartmentId}/tenants`);

        const unSubApts = tenantsRef
                .onSnapshot(async snapshot => {
                        const tenantOb = await convertCollectionsSnapshotToMap(snapshot, building);
                        setTenantData(...tenantOb);
                        setLoading(false);
                    }, err => { setError(err) }
                );
            return unSubApts;
    }, [building, apartmentId]);

    return {
        error,
        loading,
        tenantData
    }
}