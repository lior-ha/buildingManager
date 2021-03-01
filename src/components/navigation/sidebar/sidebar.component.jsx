import { Fragment } from 'react';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavItems from '../nav-items/nav-items.component';

import './sidebar.styles.scss';

const SideBar = props => {
    
    return (
        <Fragment>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={`sideBar ${ props.open ? 'open' : 'close'}`} onClick={props.closed}>
                <div className="title">
                    Title
                </div>
                <nav>
                    <NavItems isAuth={props.isAuth} />
                </nav>
            </div>
        </Fragment>
        
    )
};

export default SideBar;