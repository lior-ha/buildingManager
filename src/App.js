import { useState, useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useAuth } from './hooks/auth.hook';
import { useApartments } from './hooks/apartments.hook';
import { useWindowSize } from './hooks/windowSize.hook';

import { authContext } from './context/auth.context';

import Layout from './hoc/layout/layout.hoc';

import Homepage from './pages/homepage/homepage.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import Loader from './components/UI/loader/loader.component'

import PageTitle from './components/page-title/page-title.component';
import AsideWrapper from './components/aside/aside-wrapper/aside-wrapper.component';

import './index.scss';


const ProfilePage = lazy(() => import('./pages/building/profile-page/profile-page.component'));
const AddBuilding = lazy(() => import('./pages/building/add-building/add-building.component'));
const AddApartment = lazy(() => import('./pages/building/add-apartment/add-apartment.component'));
const TransactionsPage = lazy(() => import('./pages/transactions/transactions.component'));
const MessageBoard = lazy(() => import('./pages/message-board/message-board.components'));
const SignOut = lazy(() => import('./pages/sign-in-and-sign-up/sign-out/sign-out.component'));

const App = () => {
    const { user, building, loading, setHolding } = useAuth();
    const { apartmentsData } = useApartments(building);

    const [ activeSidebarTab, setSidebarActiveTab ] = useState('lastActions');

    const [ wideScreen, setWideScreen ] = useState(true);

    const [width] = useWindowSize();
    useEffect(() => {
        if (width >= 1200) {
            setWideScreen(true)
        } else {
            setWideScreen(false)
        }
    }, [setWideScreen, width]);

//console.log(activeSidebarTab)
    if (loading) {
        return (
            <div className="appWrapper loading">
                <Loader />
            </div>
        )
    }

    let routes = (
        <Switch>
            <Route path='/' component={SignInAndSignUpPage} />
        </Switch>
    )
    
    if (user) {
        routes =  (
            <>
                
                    <Switch>
                        <Route path='/' exact render={() => (<Homepage /> )}/>
                        <Route path='/message-board' exact component={MessageBoard} />
                        <Route path='/transactions' component={TransactionsPage} />
                        <Route path='/message-board/:messageId' component={MessageBoard} />
                        <Route path='/mainAdmin/addApartment' component={AddApartment} />
                        <Route path='/building/:profileId' component={ProfilePage} /> 
                        <Route path='/signout' component={SignOut} /> 
                        <Route path='/signin' exact render={() => 
                            user ? 
                                (<Redirect to="/" />) 
                                : 
                                (<SignInAndSignUpPage />)}
                        />
                        {user.type === 'admin' ? <Route path='/mainAdmin/addBuilding' component={AddBuilding} /> : ''}
                    </Switch>
            </>
        );
    }
    return (
        <authContext.Provider value={{ user, building, apartmentsData }}>
            <Layout isAuthenticated={user}>
            
                { user && user.building && building && 
                    <PageTitle 
                        user={user} 
                        userHoldings={user.holdings} 
                        building={building} 
                        setHolding={setHolding}
                    />
                }
                <main className="mainWrapper">
                    <Suspense fallback={<Loader />}>
                        {routes}
                    </Suspense>
                    { user && user.building && building && 
                        <AsideWrapper wideScreen={wideScreen} setActiveTab={setSidebarActiveTab} activeTab={activeSidebarTab} />
                    }
                </main>
            </Layout>
        </authContext.Provider>
    );

}

export default App;
