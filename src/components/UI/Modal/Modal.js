import React, { Fragment } from 'react';

import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.module.css';

const Modal = props => {
    return(
        <Fragment>
            <Backdrop clicked={props.modalClosed} show={props.show} />
            <div className={`${classes.modal} ${props.show ? classes.showModal : ''}`}>
                {props.children}
            </div>
        </Fragment>
    )
};

export default React.memo(
    Modal, 
    (prevProps, nextProps) => 
        nextProps.show === prevProps.show &&
        nextProps.children === prevProps.children
);