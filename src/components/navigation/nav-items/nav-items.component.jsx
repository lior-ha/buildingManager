import { Link } from 'react-router-dom';

import NavItem from './nav-items/nav-item.component';

import './nav-items.styles.scss';

const NavItems = ({isAuth}) => {
    
    const version = <div className="navItem version">גרסת אלפא</div>
    let navbar;

    if (isAuth){
        navbar = <>
                    {version}
                    <Link className="navItem logo" to='/'>הוועדון</Link> {/* ??? */}
                    <NavItem link='/' exact>עמוד ראשי</NavItem>
                    <NavItem link='/message-board'>לוח מודעות</NavItem>
                    <NavItem link='/transactions'>הכנסות/הוצאות</NavItem>
                    <NavItem link='/mainAdmin/addApartment'>ניהול דירות</NavItem>
                    {isAuth.type === 'admin' && <NavItem link='/mainAdmin/addBuilding'>הוספת בניין</NavItem>}
                    <NavItem link='/signout' extraClass="end"> התנתק </NavItem>
                </>
    } else {
        navbar =<>
                    {version}
                    <NavItem link='/signin'> התחבר </NavItem>
                </>
    }
    
    return (
        <div className="nav">
            {navbar}
        </div>
    )
}

export default NavItems