import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useAuth } from './hooks/auth.hook';
import { useBuilding } from './hooks/building.hook';

import { authContext } from './context/auth.context';

import Layout from './hoc/layout/layout.hoc';

import Homepage from './pages/homepage/homepage.component';

import MessageBoard from './pages/message-board/message-board.components';
import MessagePage from './pages/message-board/message-page/message-page.components';
import AddMessagePage from './pages/message-board/add-message/add-message.component';

import ProfilePage from './pages/building/profile-page/profile-page.component';
import AddBuilding from './pages/building/add-building/add-building.component';
import AddApartment from './pages/building/add-apartment/add-apartment.component';
import AddPaymentPage from './pages/building/add-payment/add-payment.component';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import SignOut from  './pages/sign-in-and-sign-up/sign-out/sign-out.component';

import Loader from './components/UI/loader/loader.component'

import PageTitle from './components/page-title/page-title.component';

import './index.scss';

const App = () => {
    const { user, building, loading, id } = useAuth();
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
                <authContext.Provider value={{ user, building, id }}>
                    <PageTitle address={buildingData} />
                    <Switch>
                        <Route exact path='/' component={Homepage} />
                        
                        <Route path='/message-board' exact component={MessageBoard} />
                        <Route path='/message-board/addMessage' component={AddMessagePage} />
                        <Route path='/message-board/:messageId' component={MessagePage} />
                        <Route path='/mainAdmin/addApartment' component={AddApartment} />
                        <Route path='/mainAdmin/addPayment' component={AddPaymentPage} />
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
            {routes}
        </Layout>
    );

}

export default App;
