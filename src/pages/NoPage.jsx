import React from 'react'
import { usePageTitle } from '../hooks/usePageTitle'

export const NoPage = () => {
    usePageTitle(`Error - Den Grønne Avis`);
    return (
        <div><h1>
            Error 404 Page Not Found
        </h1></div>
    )
}
