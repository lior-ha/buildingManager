import React from 'react';

import { signInWithGoogle } from '../../firebase/firebase.utils';

import { FormInputSingle } from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = e => {
        e.preventDefault();

        this.setState({ email:'', password:'' });
    }

    handleEvent = e => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <p className="title">התחבר עם המייל והסיסמא שלך</p>
                <FormInputSingle 
                    name="email"
                    label="אימייל"
                    type="email" 
                    value={this.state.email} 
                    handleChange={this.handleEvent}
                    required 
                />
                <FormInputSingle 
                    name="password" 
                    label="סיסמא" 
                    type="password" 
                    value={this.state.password}
                    handleChange={this.handleEvent}
                    required
                />
                <div className="buttons">
                    <CustomButton type="submit"> התחבר </CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                        התחבר עם גוגל
                    </CustomButton>
                </div>
            </form>
        )
    }

}

export default SignIn;