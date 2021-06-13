import { useState, useEffect } from 'react';
import { useSession } from '../context/auth.context';
import { firestore, convertCollectionsSnapshotToMap } from '../firebase/firebase.utils';

export const useTenants = (apartmentId, tenantId) => {
    const { building }  = useSession();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [tenantsData, setTenantsData] = useState([]);


    useEffect(() => {
        if (apartmentId || tenantId) {
            const tenantsRef = firestore.collection(`buildings/${building}/apartments/${apartmentId || tenantId}/tenants`);
            
            const unSubApts = tenantsRef
                    .onSnapshot(async snapshot => {
                            const tenantsResponse = await convertCollectionsSnapshotToMap(snapshot, building);
                            if (apartmentId) {
                                console.log('apartmentId')
                                setTenantsData([...tenantsResponse]);
                            } else {
                                console.log('tenantsId')
                                setTenantsData(...tenantsResponse);
                            }
                            setLoading(false);
                        }, err => { setError(err) }
                    );
                return unSubApts;
        }
    }, [building, apartmentId, tenantId]);

    return {
        error,
        loading,
        tenantsData
    }
}


// export const useTenant = () => {
//     const { building }  = useSession();
//     const [error, setError] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [tenantData, setTenantData] = useState({});

//     useEffect(() => {
//         setTenantData({});
//     },[])
    
//     useEffect(() => {
//         const tenantsRef = firestore.collection(`buildings/${building}/apartments/${tenantId}/tenants`);

//         const unSubApts = tenantsRef
//                 .onSnapshot(async snapshot => {
//                         const tenantObj = await convertCollectionsSnapshotToMap(snapshot, building);
                        
//                         setLoading(false);
//                     }, err => { setError(err) }
//                 );
//             return unSubApts;
//     }, [building, tenantId]);

//     return {
//         error,
//         loading,
//         tenantData
//     }
// }