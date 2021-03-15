import React, { Fragment, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useAuth } from './hooks/auth.hook';
import { useBuilding } from './hooks/building.hook';

import { authContext } from './context/auth.context';

import Layout from './hoc/layout/layout.hoc';

import Homepage from './pages/homepage/homepage.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import Loader from './components/UI/loader/loader.component'
import PageTitle from './components/page-title/page-title.component';

import './index.scss';


const ProfilePage = lazy(() => import('./pages/building/profile-page/profile-page.component'));
const AddBuilding = lazy(() => import('./pages/building/add-building/add-building.component'));
const AddApartment = lazy(() => import('./pages/building/add-apartment/add-apartment.component'));
const TransactionsPage = lazy(() => import('./pages/transactions/transactions.component'));
const MessageBoard = lazy(() => import('./pages/message-board/message-board.components'));
const SignOut = lazy(() => import('./pages/sign-in-and-sign-up/sign-out/sign-out.component'));

const App = () => {
    const { user, building, loading } = useAuth();
    const { buildingData, isLoading } = useBuilding(building);
    if (loading || isLoading) {
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
            <Fragment>
                <authContext.Provider value={{ user, building }}>
                    {buildingData.address && <PageTitle address={buildingData.address} />}
                    <Switch>
                        <Route exact path='/' component={Homepage} />
                        
                        <Route path='/message-board' exact component={MessageBoard} />
                        <Route path='/transactions' component={TransactionsPage} />
                        <Route path='/message-board/:messageId' component={MessageBoard} />
                        <Route path='/mainAdmin/addApartment' component={AddApartment} />
                        <Route path='/building/:profileId' component={ProfilePage} /> 
                        <Route path='/signout' component={SignOut} /> 
                        <Route exact path='/signin' render={() => 
                            user ? 
                                (<Redirect to="/" />) 
                                : 
                                (<SignInAndSignUpPage />)}
                        />
                    </Switch>
                </authContext.Provider>
                <Route path='/mainAdmin/addBuilding' component={AddBuilding} />
            </Fragment>
        );
    }
    return (
        <Layout isAuthenticated={user}>
            <Suspense fallback={<Loader />}>
                {routes}
            </Suspense>
        </Layout>
    );

}

export default App;
