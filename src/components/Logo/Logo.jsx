import s from './Logo.module.scss'
import { NavLink } from 'react-router-dom'

export const Logo = () =>{
    return(
        <>
        <NavLink to={'/'}>
            <h1>Den Grønne <span>Avis</span></h1>
        </NavLink>
        </>
    )
}