
import classes from './Backdrop.module.css';

const Backdrop = ( props ) => (
    props.show ? 
        <div onClick={props.clicked} className={classes.backdrop}></div>
    :
        null
);

export default Backdrop;