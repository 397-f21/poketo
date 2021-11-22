import {signInWithGoogle, signOut } from '../utilities/firebase';
import { useUserState } from '../utilities/firebase.js';

export const SignInButton = () => (
    <button 
        data-cy="sign-in"
        onClick={() => signInWithGoogle()} >
        Sign In
    </button>
);

export const SignOutButton = () => (
    <button
        data-cy="sign-out"
        onClick={() => signOut()} >
        Sign Out
    </button>
);