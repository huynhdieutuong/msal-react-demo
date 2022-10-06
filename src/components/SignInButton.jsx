import { useMsal } from '@azure/msal-react';
import Button from '@mui/material/Button';

export const SignInButton = () => {
    const { instance } = useMsal()
    const handleSignIn = () => {
        instance.loginRedirect({
            scopes: ['user.read']
        });
    }

    return (
        <Button color="inherit" onClick={handleSignIn}>Sign in</Button>
    )
};