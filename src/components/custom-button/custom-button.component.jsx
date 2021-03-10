import './custom-button.styles.scss';

const CustomButton = ({ children, classes, ...otherProps}) => (
    <button 
        className={`${classes} custom-button`} {...otherProps}>
        {children}
    </button>
)

export default CustomButton;