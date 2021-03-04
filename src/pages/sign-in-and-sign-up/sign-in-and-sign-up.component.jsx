import FormBox from '../../components/form-box/form-box.component';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import './sign-in-and-sign-up.styles.scss';

const SignInAndSignUpPage = () => (
    <main className="mainWrapper">        
        <section className="signUpInPage">
            <FormBox form={<SignIn />} title="אני ברשימה!" />
            <FormBox form={<SignUp />} title="אני חייב להרשם!!!" />
        </section>
    </main>   
);

export default SignInAndSignUpPage;