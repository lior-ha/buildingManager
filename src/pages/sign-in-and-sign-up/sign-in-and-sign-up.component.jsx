import FormBox from '../../components/form-box/form-box.component';

import SignIn from '../../components/sign-in/sign-in.component';

const SignInAndSignUpPage = () => (
    <main className="mainWrapper">        
        <section>
            <FormBox form={<SignIn />} title="יש לי כבר חשבון קיים" />
        </section>
    </main>   
);

export default SignInAndSignUpPage;