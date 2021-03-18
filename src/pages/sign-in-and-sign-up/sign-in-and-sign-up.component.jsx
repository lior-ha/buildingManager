import FormBox from '../../components/form-box/form-box.component';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import './sign-in-and-sign-up.styles.scss';

const SignInAndSignUpPage = () => (
    <main className="mainWrapper">        
        <section>
            <div className="contentBox topText">
                <div>
                    <p>Username: test@test.xyz</p> 
                    <p>Password: qwer1234</p> 
                </div>
                <h2>This app is a work in progress and not close to being done</h2>
            </div>
            <div className="signUpInPage">
                <FormBox form={<SignIn />} title="התחבר" />
                <FormBox form={<SignUp />} title="הרשם" />
            </div>
        </section>
    </main>   
);

export default SignInAndSignUpPage;