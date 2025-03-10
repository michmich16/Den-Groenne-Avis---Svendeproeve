import React from 'react'
import s from './NavBar.module.scss'
import { Dropdown } from '../DropDown/DropDown'

export const NavBar = () => {


  return (
    <nav>
      <Dropdown />
      <button>opret annonce</button>
      <span>
        <img src="./icons/mailIcon.png" alt="" />
        <img src="./icons/infoIcon.png" alt="" />
        <img src="./icons/accountIcon.png" alt="" />
      </span>
    </nav>
  )
}
