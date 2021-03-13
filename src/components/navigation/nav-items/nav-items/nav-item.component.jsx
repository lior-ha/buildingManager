import { NavLink } from 'react-router-dom';

const NavItem = props => {
    return (
        <li className={`navItem ${props.extraClass ? props.extraClass : ''}`}>
            <NavLink 
                to={props.link}
                exact={props.exact}
            >{props.children}</NavLink>
        </li>
    )
}

export default NavItem
