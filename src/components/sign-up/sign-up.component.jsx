import { useState } from 'react'

import { auth } from '../../firebase/firebase.utils';

import { FormInputSingle } from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';


const SignUp = () => {
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const { email, password, confirmPassword } = userCredentials;

    const handleSubmit = async e => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert(`Password Don't Match`);
            return;
        }
        
        signUpStart({ email, password });
        
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setUserCredentials({...userCredentials, [name]: value});
    }

    const signUpStart = async ({email, password}) => {
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            return signInAfterSignUp(user);
        } catch (error) {
            console.log(error);
        }
    }
    
    const signInAfterSignUp = async (user) => {
        const {email, password} = user;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            setUserCredentials({ email: '', password: '', confirmPassword: '' })
            
        } catch (error) {
            console.error(error)
        }
        setUserCredentials({ email:'', password:'', confirmPassword: '' });
    }

    return (
        <form onSubmit={handleSubmit}>
            <p className="title">התחבר עם המייל והסיסמא שלך</p>
            <FormInputSingle 
                name="email"
                label="אימייל"
                type="email" 
                value={userCredentials.email} 
                handleChange={handleChange}
                required 
            />
            <FormInputSingle 
                name="password" 
                label="סיסמא" 
                type="password" 
                value={userCredentials.password}
                handleChange={handleChange}
                required
            />
            <FormInputSingle 
                name="confirmPassword" 
                label="מה אמרת הסיסמא שוב?" 
                type="password" 
                value={userCredentials.confirmPassword}
                handleChange={handleChange}
                required
            />
            <div className="buttons">
                <CustomButton type="submit"> התחבר </CustomButton>
            </div>
        </form>
    )
}

export default SignUp;