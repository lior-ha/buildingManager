import { NavLink } from 'react-router-dom';

const NavItem = props => {
    return (
        <li className={`tab ${props.extraClass ? props.extraClass : ''}`}>
            <NavLink 
                to={props.link}
                exact={props.exact}
            >{props.children}</NavLink>
        </li>
    )
}

export default NavItem
