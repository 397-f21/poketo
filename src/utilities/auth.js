import styled from 'styled-components';
import {signInWithGoogle, signOut } from '../utilities/firebase';

const AuthButton = styled.button`
    width: 201px;
    height: 49px;
    left: 113px;
    top: 528px;
    background: linear-gradient(180deg, #2AC4E6 0%, #728EE4 100%);
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    /* Sign In */

    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 30px;
    /* identical to box height */
    text-align: center;
    color: #FFFFFF;
`

export const SignInButton = () => (
    <AuthButton 
        data-cy="sign-in"
        onClick={() => signInWithGoogle()} >
        Sign In
    </AuthButton>
);

export const SignOutButton = () => (
    <AuthButton
        data-cy="sign-out"
        onClick={() => signOut()} >
        Sign Out
    </AuthButton>
);