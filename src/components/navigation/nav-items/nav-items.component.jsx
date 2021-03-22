import { Fragment } from 'react';

import NavItem from './nav-items/nav-item.component';

import './nav-items.styles.scss';

const NavItems = props => {
    
    const version = <div className="navItem version">גרסת אלפא</div>
    let navbar;

    if (props.isAuth){
        navbar = <Fragment>
                    {version}
                    <NavItem link='/' exact>עמוד ראשי</NavItem>
                    <NavItem link='/message-board'>לוח מודעות</NavItem>
                    <NavItem link='/transactions'>הכנסות/הוצאות</NavItem>
                    <NavItem link='/mainAdmin/addApartment'>ניהול דירות</NavItem>
                    <NavItem link='/mainAdmin/addBuilding'>הוספת בניין</NavItem>
                    <NavItem link='/signout' extraClass="end"> התנתק </NavItem>
                </Fragment>
    } else {
        navbar =<Fragment>
                    {version}
                    <NavItem link='/signin'> התחבר </NavItem>
                </Fragment>
    }
    
    return (
        <div className="nav">
            {navbar}
        </div>
    )
}

export default NavItems