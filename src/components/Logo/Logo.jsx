import s from './Logo.module.scss'
import { NavLink } from 'react-router-dom'

export const Logo = () =>{
    return(
        <>
        <NavLink className={s.logoStyle} to={'/'}>
            <h1>Den Grønne <span>Avis</span></h1>
        </NavLink>
        </>
    )
}