import Button from 'react-bootstrap/Button'
import {signInWithGoogle, signOut } from '../utilities/firebase';
import {getSigninButtonStyling} from '../utilities/time';

export const SignInButton = () => (
    <Button
        onClick={() => signInWithGoogle()} className='signin-button-styling' >
        Sign In
    </Button>
);

export const SignOutButton = () => (
    <Button
        onClick={() => signOut()} className='signin-button-styling'>
        Sign Out
    </Button>
);