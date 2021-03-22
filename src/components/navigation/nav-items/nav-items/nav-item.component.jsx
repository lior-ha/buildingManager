import { NavLink } from 'react-router-dom';

const NavItem = props => {
    return (
        <NavLink 
            className={`navItem ${props.extraClass ? props.extraClass : ''}`}
            to={props.link}
            exact={props.exact}
        >{props.children}</NavLink>
    )
}

export default NavItem
