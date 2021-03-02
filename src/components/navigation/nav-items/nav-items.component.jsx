import { Fragment } from 'react';

import NavItem from './nav-items/nav-item.component';

import './nav-items.styles.scss';

const NavItems = props => {
    
    const alpha = <li className="tab version">גרסת אלפא</li>
    let navbar;

    if (props.isAuth){
        navbar = <Fragment>
                    {alpha}
                    <NavItem link='/' exact>Homepage</NavItem>
                    <NavItem link='/message-board'>לוח מודעות</NavItem>
                    <NavItem link='/mainAdmin/addPayment'>ניהול הכנסות/הוצאות</NavItem>
                    <NavItem link='/mainAdmin/addApartment'>ניהול דירות</NavItem>
                    <NavItem link='/mainAdmin/addBuilding'>הוספת בניין</NavItem>
                    <NavItem link='/signout' extraClass="end"> התנתק </NavItem>
                </Fragment>
    } else {
        navbar =<Fragment>
                    {alpha}
                    <NavItem link='/signin'> התחבר </NavItem>
                </Fragment>
    }
    
    return (
        <ul className="nav">
            {navbar}
        </ul>
    )
}

export default NavItems