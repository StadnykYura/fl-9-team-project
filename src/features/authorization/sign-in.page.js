import React from 'react';
import SignInForm from './sign-in.form';

const SignInPage = props => {
  return (
    <div>
      <SignInForm auth={props.auth} />
    </div>
  );
};

export default SignInPage;
