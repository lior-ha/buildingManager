import { useState } from 'react';

import Header from '../../components/navigation/header/header.component';
import SideBar from '../../components/navigation/sidebar/sidebar.component';

import './layout.styles.scss';

const Layout = props => {
    const [showSideBar, setShowSideBar] = useState(false);

    const sideBarCloseHandler = () => {
        setShowSideBar(false);
    }
 
    const sideBarToggleClicked = () => {
        setShowSideBar(!showSideBar);
    }
    
    return (
        <div className="appWrapper">
            <Header 
                sideBarToggleClicked={sideBarToggleClicked} 
                isAuth={props.isAuthenticated} />
            <SideBar 
                open={showSideBar} 
                closed={sideBarCloseHandler}
                isAuth={props.isAuthenticated} />
                
            {props.children}
        </div>
    )
};

export default Layout; 