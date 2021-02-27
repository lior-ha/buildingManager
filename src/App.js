import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useAuth } from './hooks/auth.hook';
import { useBuilding } from './hooks/building.hook';

import { authContext } from './context/auth.context';

import Homepage from './pages/homepage/homepage.component';
import ProfilePage from './pages/profile-page/profile-page.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import AddBuilding from './pages/add-building/add-building.component';
import AddApartment from './pages/add-apartment/add-apartment.component';
import AddPaymentPage from './pages/add-payment/add-payment.component';

import Loader from './components/UI/loader/loader.component'

import Header from './components/header/header.component';
import PageTitle from './components/page-title/page-title.component';

import './index.scss';

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
        <Fragment>
            <Header />
            <Switch>
                <Route path='/' component={SignInAndSignUpPage} />
            </Switch>
        </Fragment>
    )
    if (user) {
        routes =  (
            <Fragment>
                <authContext.Provider value={{ user, building }}>
                    <Header />
                    <PageTitle address={buildingData} />
                    <Switch>
                        <Route exact path='/' component={Homepage} />
                        
                        <Route path='/mainAdmin/addApartment' component={AddApartment} />
                        <Route path='/mainAdmin/addPayment' component={AddPaymentPage} />
                        <Route path='/building/:profileId' component={ProfilePage} /> 
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
        <div className="appWrapper">
            {routes}
        </div>
    );

}

export default App;
