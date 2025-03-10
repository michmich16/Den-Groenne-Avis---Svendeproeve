import React from 'react'
import s from './Header.module.scss'
import { NavBar } from '../NavBar/NavBar'
import { Logo } from '../Logo/Logo'

export const Header = () => {
  return (
    <header className={s.headerStyle}>
      <hgroup className={s.hgroupStyle}> 
        <Logo />
        <NavBar />
      </hgroup>

    </header>
  )
}
