import { InteractionType } from '@azure/msal-browser';
import { useMsalAuthentication } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import { ProfileData } from "../components/ProfileData";
import { fetchData } from '../fetch';

export const Profile = () => {
    const [graghData, setGraghData] = useState(null);
    const { result, error } = useMsalAuthentication(InteractionType.Popup, {
        scopes: ["user.read"]
    });

    useEffect(() => {
         if (!!graghData) return;
         if (!!error) return console.log(error);
         if (result) {
            const { accessToken } = result;
            fetchData("https://graph.microsoft.com/v1.0/me", accessToken)
                .then(res => setGraghData(res))
                .catch(err => console.log(err))
         }
    }, [error, graghData, result])

    return (
        <>
            {graghData && <ProfileData graphData={graghData} /> }
        </>
    )
}