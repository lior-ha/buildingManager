import React, { Fragment } from 'react';

import Modal from '../../components/UI/Modal/Modal';


const withErrorHandler = (WrappedComponent, error, clearError) => {
    return props => {
        return (
            <Fragment>
                <Modal show={error} modalClosed={clearError}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        );
    };
};

export default withErrorHandler;
