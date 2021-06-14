import { useState, useEffect } from 'react';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import { FormInputSingle } from '../form-input/form-input.component';
import CustomButton from '../UI/custom-button/custom-button.component';

const SignIn = () => {
    const [ signInState, setSignInState ] = useState({ email: '', password: '' })
    const { email, password } = signInState;

    const [ buttonClass, setButtonClass] = useState('disabled');
    useEffect(() => {
        if (email !== '' && password !== '' ) {
            setButtonClass('green');
        } else if (email === '' || password === '') {
            setButtonClass('disabled');
        }
    }, [email, password]);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await auth.signInWithEmailAndPassword(email, password);
            setSignInState({ email: '', password: '' })
            
        } catch (error) {
            console.error(error)
        }
        setSignInState({ email:'', password:'' });
    }

    const handleEvent = e => {
        const { value, name } = e.target;
        setSignInState({...signInState, [name]: value });
    }

    return (
        <form onSubmit={handleSubmit}>
            <p className="title">התחבר עם המייל והסיסמא שלך</p>
            <FormInputSingle 
                name="email"
                label="אימייל"
                type="email" 
                value={signInState.email} 
                handleChange={handleEvent}
                required 
            />
            <FormInputSingle 
                name="password" 
                label="סיסמא" 
                type="password" 
                value={signInState.password}
                handleChange={handleEvent}
                required
            />
            <div className="buttonsGroup">
                <CustomButton classes={buttonClass} type="submit"> התחבר </CustomButton>
                <CustomButton classes="red" onClick={signInWithGoogle} isGoogleSignIn>
                    התחבר עם גוגל
                </CustomButton>
            </div>
        </form>
    )
}

export default SignIn;