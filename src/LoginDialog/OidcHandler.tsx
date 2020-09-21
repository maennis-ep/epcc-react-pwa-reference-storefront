import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { oidcLogin } from '../service';
import { useCustomerData } from '../app-state';
import { generateRedirectUri } from './OidcUtilities'

export const OidcHandler: React.FC<any> = ()=> {

    const history = useHistory()
    const location = useLocation()
    const { setCustomerData } = useCustomerData();

    useEffect(() => {
        async function setCustomerDataFromOidcCallback() {
            // TODO:  Might need to support different ways of redirecting and different ways the url could be sent back...
            const redirectInitialLocation:string = localStorage.getItem('location') || '/';

            let query = new URLSearchParams(location.search);
            const code = query.get('code')
            const state = query.get('state')
            
            if(code !== undefined && state !== undefined) {
                if (state === localStorage.getItem('state')) {
                    
                    const response: any = await oidcLogin(code!, generateRedirectUri())
                    
                    const result = response; // HAX -- should be response.json()

                    // May need to change how the authentication token is set...
                    setCustomerData(result.token, result.customer_id);
                    
                    history.push(redirectInitialLocation);
                } else {
                    alert('Unable to validate identity');
                    history.push(redirectInitialLocation);
                }

                localStorage.removeItem('location')
                localStorage.removeItem('state')
            }
        }

        setCustomerDataFromOidcCallback();
    });

    return( <div className="epminiLoader --center" />   )
}
