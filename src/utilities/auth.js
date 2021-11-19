import {signInWithGoogle, signOut } from '../utilities/firebase';
import { useUserState } from '../utilities/firebase.js';

export const SignInButton = () => (
    <button
        onClick={() => signInWithGoogle()} >
        Sign In
    </button>
);

export const SignOutButton = () => (
    <button
        onClick={() => signOut()} >
        Sign Out
    </button>
);

const AuthButton = () => {
    const [user] = useUserState();

    return (
        user ? <SignOutButton /> : <SignInButton />
    )
}

export default AuthButton