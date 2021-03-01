
import './form-box.styles.scss';

const FormBox = ({form, title, formScheme=''}) => (
    <div className="formBox">
        <div className={`contentBox ${formScheme}`}>
            <h2>{title}</h2>
            {form}
        </div>
    </div>
);

export default FormBox;