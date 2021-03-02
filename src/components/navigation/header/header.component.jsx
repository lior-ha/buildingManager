import NavItems from '../nav-items/nav-items.component';
import SideBarToggle from '../sidebar/side-bar-toggle/side-bar-toggle.component';

import './header.styles.scss';

const Header = props => {
    
    return (
        <header className="mainHeader">
            <div className="logo"></div>
            <SideBarToggle clicked={props.sideBarToggleClicked} />
            <nav className="desktopOnly">
                <NavItems isAuth={props.isAuth} />
            </nav>
        </header>
    )
};

export default Header;